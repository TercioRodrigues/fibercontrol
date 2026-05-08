/**
 * simulacao.js — FiberControl
 * ─────────────────────────────────────────────────────────────────────────────
 * Motor de simulação em tempo real.
 * Altera os dados de clientes periodicamente para simular:
 *   - Oscilação natural de sinal
 *   - Quedas de ONU (offline)
 *   - Degradação de sinal (sinal ruim)
 *   - Recuperação automática
 *
 * Este módulo NÃO existe no backend — é apenas para apresentação.
 * No sistema real, os dados vêm do polling via SNMP à OLT.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Variáveis de estado da simulação (fora do objeto para evitar referência circular)
var _sim_intervaloSinal = null;   // atualiza sinal a cada 8s
var _sim_intervaloFalha = null;   // provoca falhas a cada 25s
var _sim_callbacks = [];     // funções chamadas após cada atualização

// ─── Funções internas (prefixo _sim_ para não conflitar com outros módulos) ───

function _sim_notificar() {
    _sim_callbacks.forEach(function (fn) {
        try { fn(); } catch (e) { console.error("Simulacao callback erro:", e); }
    });
}

function _sim_oscilarSinal(provedorId) {
    var clientes = SimDB.CLIENTES[provedorId] || [];

    clientes.forEach(function (c) {
        if (c.status === "offline") return;

        // Variação aleatória de ±0.3 dBm (oscilação natural da fibra)
        var delta = (Math.random() - 0.5) * 0.6;
        c.rx_power = +Math.min(-8, Math.max(-32, c.rx_power + delta)).toFixed(1);
        c.tx_power = +Math.min(5.5, Math.max(0, c.tx_power + (Math.random() - 0.5) * 0.2)).toFixed(1);

        // Recalcula status com base nos thresholds configurados
        if (c.rx_power <= SimDB.THRESHOLDS.rx_critico) {
            c.status = "offline";
            c.ultima_leitura = "agora";
            _sim_criarAlerta(provedorId, c, "sem_sinal", "ONU perdeu sinal completamente", "critico");

        } else if (c.rx_power <= SimDB.THRESHOLDS.rx_minimo) {
            c.status = "degradado";
            c.ultima_leitura = "agora";
            _sim_criarAlerta(provedorId, c, "sinal_ruim", "Sinal Rx abaixo do limiar (" + c.rx_power + " dBm)", "aviso");

        } else if (c.status === "degradado") {
            // Sinal voltou ao normal: remove o status degradado
            c.status = "online";
        }
    });
}

function _sim_simularEventos(provedorId) {
    var clientes = SimDB.CLIENTES[provedorId] || [];
    if (clientes.length === 0) return;

    function sorteado() {
        return clientes[Math.floor(Math.random() * clientes.length)];
    }

    var evento = Math.random();

    if (evento < 0.3) {
        // 30% de chance: derruba um cliente online
        var alvo = clientes.find(function (c) { return c.status === "online"; }) || sorteado();
        alvo.rx_power = -31.5;
        alvo.status = "offline";
        alvo.ultima_leitura = "agora";
        _sim_criarAlerta(provedorId, alvo, "sem_sinal", "ONU offline — perda total de sinal óptico", "critico");

    } else if (evento < 0.55) {
        // 25% de chance: degrada um cliente online
        var alvo2 = clientes.find(function (c) { return c.status === "online"; }) || sorteado();
        alvo2.rx_power = +(-25.5 - Math.random() * 2).toFixed(1);
        alvo2.status = "degradado";
        alvo2.ultima_leitura = "agora";
        _sim_criarAlerta(provedorId, alvo2, "sinal_ruim", "Degradação de sinal detectada (" + alvo2.rx_power + " dBm)", "aviso");

    } else if (evento < 0.8) {
        // 25% de chance: recupera um cliente com problema
        var alvo3 = clientes.find(function (c) { return c.status !== "online"; });
        if (alvo3) {
            alvo3.rx_power = +(-14 - Math.random() * 6).toFixed(1);
            alvo3.status = "online";
            alvo3.ultima_leitura = "agora";
            _sim_removerAlertas(provedorId, alvo3.id);
        }
    }
    // 20% de chance: nada acontece
}

function _sim_criarAlerta(provedorId, cliente, tipo, mensagem, nivel) {
    var alertas = SimDB.ALERTAS_BASE[provedorId];
    if (!alertas) return;

    // Evita duplicata do mesmo tipo para o mesmo cliente
    var existente = alertas.find(function (a) {
        return a.cliente_id === cliente.id && a.tipo === tipo;
    });

    if (existente) {
        existente.mensagem = mensagem;
        existente.criado_em = "agora";
        return;
    }

    var ids = alertas.map(function (a) { return a.id; });
    var novoId = ids.length > 0 ? Math.max.apply(null, ids) + 1 : 9100;

    alertas.unshift({
        id: novoId,
        cliente_id: cliente.id,
        serial: cliente.serial,
        cliente: cliente.nome,
        tipo: tipo,
        mensagem: mensagem,
        criado_em: "agora",
        nivel: nivel
    });
}

function _sim_removerAlertas(provedorId, clienteId) {
    if (!SimDB.ALERTAS_BASE[provedorId]) return;
    SimDB.ALERTAS_BASE[provedorId] = SimDB.ALERTAS_BASE[provedorId].filter(function (a) {
        return a.cliente_id !== clienteId;
    });
}

// ─── Simulacao: objeto global ─────────────────────────────────────────────────
var Simulacao = {

    /**
     * Registra um callback chamado sempre que os dados mudam.
     * Usado pelas páginas para re-renderizar a UI automaticamente.
     */
    onAtualizar: function (fn) {
        _sim_callbacks.push(fn);
    },

    /**
     * Inicia a simulação para um provedor específico.
     * @param {number} provedorId
     */
    iniciar: function (provedorId) {
        Simulacao.parar(); // garante que não haja dois intervalos rodando

        // Oscilação natural do sinal a cada 8 segundos
        _sim_intervaloSinal = setInterval(function () {
            _sim_oscilarSinal(provedorId);
            _sim_notificar();
        }, 8000);

        // Eventos drásticos (quedas/recuperações) a cada 25 segundos
        _sim_intervaloFalha = setInterval(function () {
            _sim_simularEventos(provedorId);
            _sim_notificar();
        }, 25000);
    },

    /**
     * Para todos os intervalos e limpa os callbacks.
     */
    parar: function () {
        clearInterval(_sim_intervaloSinal);
        clearInterval(_sim_intervaloFalha);
        _sim_intervaloSinal = null;
        _sim_intervaloFalha = null;
        _sim_callbacks = [];
    }

};