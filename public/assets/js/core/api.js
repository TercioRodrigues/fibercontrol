/**
 * api.js — FiberControl
 * ─────────────────────────────────────────────────────────────────────────────
 * Camada de acesso a dados. Hoje usa SimDB (simulação).
 * Quando o backend PHP estiver pronto, basta descomentar os fetch()
 * e remover os retornos simulados abaixo de cada função.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// URL base do backend PHP (ajustar quando fizer o deploy)
var API_BASE_URL = "https://app.fibercontrol.com.br/api";

// Utilitário interno: simula delay de rede
function api_delay(ms) {
    ms = ms || 300;
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

// Utilitário interno: monta cabeçalhos com token de autenticação
function api_headers() {
    // SUBSTITUIR quando tiver o backend PHP:
    // var sessao = Auth.getSessao();
    // return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessao.token };
    return { "Content-Type": "application/json" };
}

// ─── API: objeto global de acesso a dados ────────────────────────────────────
var API = {

    // ── OLT ────────────────────────────────────────────────────────────────────

    /**
     * Retorna dados da OLT do provedor logado.
     *
     * SUBSTITUIR POR:
     * const resp = await fetch(API_BASE_URL + '/olt?provedor_id=' + provedorId, { headers: api_headers() });
     * return await resp.json();
     */
    getOLT: async function (provedorId) {
        await api_delay();
        return SimDB.OLTS[provedorId] || null;
    },

    // ── CLIENTES / ONUs ────────────────────────────────────────────────────────

    /**
     * Lista todos os clientes/ONUs do provedor.
     *
     * SUBSTITUIR POR:
     * const resp = await fetch(API_BASE_URL + '/onus?provedor_id=' + provedorId, { headers: api_headers() });
     * return await resp.json();
     */
    getClientes: async function (provedorId) {
        await api_delay();
        // Retorna cópia para não mutar os dados originais durante a simulação
        return JSON.parse(JSON.stringify(SimDB.CLIENTES[provedorId] || []));
    },

    /**
     * Retorna dados de um cliente específico pelo ID.
     *
     * SUBSTITUIR POR:
     * const resp = await fetch(API_BASE_URL + '/onus/' + clienteId, { headers: api_headers() });
     * return await resp.json();
     */
    getCliente: async function (provedorId, clienteId) {
        await api_delay(200);
        var lista = SimDB.CLIENTES[provedorId] || [];
        return lista.find(function (c) { return c.id === clienteId; }) || null;
    },

    // ── HISTÓRICO DE SINAL ─────────────────────────────────────────────────────

    /**
     * Retorna histórico de sinal das últimas 24h de uma ONU.
     *
     * SUBSTITUIR POR:
     * const resp = await fetch(API_BASE_URL + '/historico?cliente_id=' + clienteId + '&horas=24', { headers: api_headers() });
     * return await resp.json();
     */
    getHistorico: async function (provedorId, clienteId) {
        await api_delay(400);
        var cliente = await API.getCliente(provedorId, clienteId);
        if (!cliente) return [];
        var temProblema = cliente.status !== "online";
        return SimDB.gerarHistorico(cliente.rx_power, temProblema);
    },

    // ── ALERTAS ────────────────────────────────────────────────────────────────

    /**
     * Lista alertas abertos do provedor.
     *
     * SUBSTITUIR POR:
     * const resp = await fetch(API_BASE_URL + '/alertas?provedor_id=' + provedorId + '&status=aberto', { headers: api_headers() });
     * return await resp.json();
     */
    getAlertas: async function (provedorId) {
        await api_delay(250);
        return JSON.parse(JSON.stringify(SimDB.ALERTAS_BASE[provedorId] || []));
    },

    /**
     * Marca um alerta como resolvido.
     *
     * SUBSTITUIR POR:
     * const resp = await fetch(API_BASE_URL + '/alertas/' + alertaId + '/resolver', {
     *   method: 'PATCH', headers: api_headers()
     * });
     * return await resp.json();
     */
    resolverAlerta: async function (alertaId) {
        await api_delay(300);
        // Simulação: remove da lista em memória
        for (var pid in SimDB.ALERTAS_BASE) {
            var idx = SimDB.ALERTAS_BASE[pid].findIndex(function (a) { return a.id === alertaId; });
            if (idx !== -1) {
                SimDB.ALERTAS_BASE[pid].splice(idx, 1);
                return { sucesso: true };
            }
        }
        return { sucesso: false };
    },

    // ── ESTATÍSTICAS ───────────────────────────────────────────────────────────

    /**
     * Retorna resumo de métricas do provedor para o dashboard.
     *
     * SUBSTITUIR POR:
     * const resp = await fetch(API_BASE_URL + '/stats?provedor_id=' + provedorId, { headers: api_headers() });
     * return await resp.json();
     */
    getStats: async function (provedorId) {
        await api_delay(200);
        return SimDB.calcularStats(provedorId);
    }

};