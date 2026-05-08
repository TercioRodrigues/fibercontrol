/**
 * dashboard.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Controlador principal do dashboard.
 * Inicializa a página, carrega dados, controla abas, modais e a simulação.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Dashboard = (() => {
    /* ── estado local ── */
    let _sessao = null;
    let _clientes = [];
    let _alertas = [];
    let _graficoHistorico = null;
    let _graficoPizza = null;

    /* ══════════════════════════════════════════════════════
       INICIALIZAÇÃO
    ══════════════════════════════════════════════════════ */

    async function init() {
        _sessao = Auth.exigirLogin();
        if (!_sessao) return;

        _aplicarTemaProvedor();
        _configurarEventos();
        await _carregarTudo();

        // Inicia simulação e atualiza UI automaticamente
        Simulacao.onAtualizar(_atualizarSimulacao);
        Simulacao.iniciar(_sessao.provedor_id);
    }

    /** Aplica a cor e nome do provedor na interface */
    function _aplicarTemaProvedor() {
        document.documentElement.style.setProperty("--cor-provedor", _sessao.cor);
        const els = {
            "#nome-provedor": _sessao.nome_provedor,
            "#cidade-provedor": _sessao.cidade,
            "#logo-inicial": _sessao.logo_inicial,
            "#usuario-nome": _sessao.nome_provedor,
        };
        for (const [sel, val] of Object.entries(els)) {
            const el = document.querySelector(sel);
            if (el) el.textContent = val;
        }
    }

    /** Configurações de eventos de UI */
    function _configurarEventos() {
        // Logout
        document.getElementById("btn-logout")?.addEventListener("click", Auth.logout);

        // Fechar modal
        document.getElementById("btn-fechar-modal")?.addEventListener("click", UI.fecharModal);
        document.getElementById("modal")?.addEventListener("click", (e) => {
            if (e.target.id === "modal") UI.fecharModal();
        });

        // Busca na tabela
        const inputBusca = document.getElementById("input-busca");
        const selectFiltro = document.getElementById("select-filtro-status");
        if (inputBusca) {
            inputBusca.addEventListener("input", () =>
                UI.filtrarTabela(inputBusca.value, selectFiltro?.value)
            );
        }
        if (selectFiltro) {
            selectFiltro.addEventListener("change", () =>
                UI.filtrarTabela(inputBusca?.value, selectFiltro.value)
            );
        }

        // Navegação por abas
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                _navegarPara(link.dataset.aba);
            });
        });

        // Botão de atualização manual
        document.getElementById("btn-atualizar")?.addEventListener("click", _carregarTudo);
    }

    /* ══════════════════════════════════════════════════════
       CARREGAMENTO DE DADOS
    ══════════════════════════════════════════════════════ */

    async function _carregarTudo() {
        const pid = _sessao.provedor_id;

        // Skeleton loading na tabela
        const tbody = document.getElementById("tabela-clientes-body");
        if (tbody) tbody.innerHTML = UI.skeleton(10);

        try {
            const [stats, olt, clientes, alertas] = await Promise.all([
                API.getStats(pid),
                API.getOLT(pid),
                API.getClientes(pid),
                API.getAlertas(pid),
            ]);

            _clientes = clientes;
            _alertas = alertas;

            _renderizarStats(stats);
            _renderizarOLT(olt);
            _renderizarClientes(clientes);
            _renderizarAlertas(alertas);
            _renderizarGraficoPizza(stats);

        } catch (err) {
            console.error("Erro ao carregar dados:", err);
            UI.toast("Erro ao carregar dados. Tente novamente.", "erro");
        }
    }

    /* ══════════════════════════════════════════════════════
       RENDERIZAÇÃO
    ══════════════════════════════════════════════════════ */

    function _renderizarStats(stats) {
        const el = document.getElementById("cards-stats");
        if (!el) return;
        el.innerHTML = [
            UI.cardStat({ titulo: "Total ONUs", valor: stats.total, icone: "◈", cor: "#00d4ff", descricao: "monitoradas" }),
            UI.cardStat({ titulo: "Online", valor: stats.online, icone: "●", cor: "#22c55e", descricao: "com sinal normal" }),
            UI.cardStat({ titulo: "Sinal Ruim", valor: stats.degradado, icone: "◐", cor: "#f59e0b", descricao: "atenção necessária" }),
            UI.cardStat({ titulo: "Offline", valor: stats.offline, icone: "○", cor: "#ef4444", descricao: "sem sinal" }),
            UI.cardStat({ titulo: "Alertas", valor: stats.alertas_abertos, icone: "⚠", cor: "#f59e0b", descricao: "abertos" }),
        ].join("");
    }

    function _renderizarOLT(olt) {
        if (!olt) return;
        const mapa = {
            "#olt-nome": olt.nome,
            "#olt-modelo": olt.modelo,
            "#olt-ip": olt.ip,
            "#olt-firmware": olt.firmware,
            "#olt-uptime": olt.uptime,
            "#olt-local": olt.localizacao,
            "#olt-portas": `${olt.portas_ativas} / ${olt.portas_pon}`,
        };
        for (const [sel, val] of Object.entries(mapa)) {
            const el = document.querySelector(sel);
            if (el) el.textContent = val;
        }
    }

    function _renderizarClientes(clientes) {
        const tbody = document.getElementById("tabela-clientes-body");
        if (!tbody) return;
        if (clientes.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" class="vazio">Nenhuma ONU encontrada.</td></tr>`;
            return;
        }
        tbody.innerHTML = clientes.map(UI.linhaCliente).join("");
    }

    function _renderizarAlertas(alertas) {
        const cont = document.getElementById("lista-alertas");
        if (!cont) return;

        // Atualiza contador no badge da aba
        const badge = document.getElementById("badge-alertas");
        if (badge) {
            badge.textContent = alertas.length;
            badge.style.display = alertas.length > 0 ? "inline-flex" : "none";
        }

        if (alertas.length === 0) {
            cont.innerHTML = `<div class="sem-alertas">Nenhum alerta ativo.</div>`;
            return;
        }
        cont.innerHTML = alertas.map(UI.cardAlerta).join("");
    }

    function _renderizarGraficoPizza(stats) {
        const canvas = document.getElementById("grafico-pizza");
        if (!canvas || typeof Chart === "undefined") return;

        if (_graficoPizza) _graficoPizza.destroy();

        _graficoPizza = new Chart(canvas, {
            type: "doughnut",
            data: {
                labels: ["Online", "Sinal Ruim", "Offline"],
                datasets: [{
                    data: [stats.online, stats.degradado, stats.offline],
                    backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
                    borderWidth: 0,
                    hoverOffset: 8,
                }],
            },
            options: {
                responsive: true,
                cutout: "72%",
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: { color: "#94a3b8", font: { size: 12 }, padding: 16 },
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => ` ${ctx.label}: ${ctx.raw} ONU(s)`,
                        },
                    },
                },
            },
        });
    }

    /* ══════════════════════════════════════════════════════
       DETALHES DO CLIENTE (MODAL)
    ══════════════════════════════════════════════════════ */

    async function abrirDetalhe(clienteId) {
        const pid = _sessao.provedor_id;
        const c = _clientes.find((x) => x.id === clienteId);
        if (!c) return;

        UI.abrirModal(
            `Detalhes — ${c.nome}`,
            `
      <div class="detalhe-grid">
        <div class="detalhe-info">
          <table class="tabela-detalhe">
            <tr><th>Serial ONU</th><td><code>${c.serial}</code></td></tr>
            <tr><th>Modelo</th><td>${c.onu_type}</td></tr>
            <tr><th>Porta PON</th><td>${c.porta_pon} — ID ${c.onu_id}</td></tr>
            <tr><th>Plano</th><td>${c.plano}</td></tr>
            <tr><th>Endereço</th><td>${c.endereco}</td></tr>
            <tr><th>Sinal Rx</th><td>${UI.barrasSinal(c.rx_power)}</td></tr>
            <tr><th>Sinal Tx</th><td>${c.tx_power} dBm</td></tr>
            <tr><th>Status</th><td>${UI.badgeStatus(c.status)}</td></tr>
            <tr><th>Última leitura</th><td>${c.ultima_leitura}</td></tr>
          </table>
        </div>
      </div>
      `
        );
    }

    /* ══════════════════════════════════════════════════════
       HISTÓRICO DE SINAL (MODAL + GRÁFICO)
    ══════════════════════════════════════════════════════ */

    async function abrirHistorico(clienteId) {
        const pid = _sessao.provedor_id;
        const c = _clientes.find((x) => x.id === clienteId);
        if (!c) return;

        UI.abrirModal(
            `Histórico de Sinal — ${c.nome}`,
            `<div class="historico-wrap"><canvas id="grafico-historico" height="220"></canvas></div>`
        );

        const historico = await API.getHistorico(pid, clienteId);

        if (typeof Chart === "undefined") return;
        const canvas = document.getElementById("grafico-historico");
        if (!canvas) return;

        if (_graficoHistorico) _graficoHistorico.destroy();

        _graficoHistorico = new Chart(canvas, {
            type: "line",
            data: {
                labels: historico.map((p) => p.hora),
                datasets: [{
                    label: "Rx Power (dBm)",
                    data: historico.map((p) => p.rx),
                    borderColor: _sessao.cor,
                    backgroundColor: _sessao.cor + "22",
                    borderWidth: 2,
                    pointRadius: 3,
                    fill: true,
                    tension: 0.4,
                }],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        reverse: false,
                        min: -35,
                        max: -5,
                        grid: { color: "#ffffff10" },
                        ticks: { color: "#94a3b8", callback: (v) => v + " dBm" },
                    },
                    x: {
                        grid: { color: "#ffffff10" },
                        ticks: { color: "#94a3b8", maxRotation: 0 },
                    },
                },
                plugins: {
                    legend: { labels: { color: "#94a3b8" } },
                    annotation: {
                        annotations: {
                            limiarRuim: {
                                type: "line", yMin: SimDB.THRESHOLDS.rx_minimo, yMax: SimDB.THRESHOLDS.rx_minimo,
                                borderColor: "#f59e0b", borderWidth: 1, borderDash: [4, 4],
                                label: { display: true, content: "Limiar ruim", color: "#f59e0b" },
                            },
                            limiarCritico: {
                                type: "line", yMin: SimDB.THRESHOLDS.rx_critico, yMax: SimDB.THRESHOLDS.rx_critico,
                                borderColor: "#ef4444", borderWidth: 1, borderDash: [4, 4],
                                label: { display: true, content: "Limiar crítico", color: "#ef4444" },
                            },
                        },
                    },
                },
            },
        });
    }

    /* ══════════════════════════════════════════════════════
       AÇÕES DE ALERTA
    ══════════════════════════════════════════════════════ */

    async function resolverAlerta(alertaId) {
        const resultado = await API.resolverAlerta(alertaId);
        if (resultado.sucesso) {
            const card = document.querySelector(`[data-alerta-id="${alertaId}"]`);
            if (card) {
                card.classList.add("saindo");
                setTimeout(() => card.remove(), 350);
            }
            _alertas = _alertas.filter((a) => a.id !== alertaId);
            UI.toast("Alerta marcado como resolvido.", "sucesso");
            _atualizarBadgeAlertas();
        }
    }

    function enviarWhatsApp(serial, cliente, mensagem) {
        /**
         * INTEGRAÇÃO FUTURA: chamar a API do WhatsApp Business / Evolution API
         * POST /api/whatsapp/enviar → { numero, mensagem }
         * Por enquanto abre o wa.me com mensagem pré-formatada.
         */
        const texto = encodeURIComponent(
            `🔴 *ALERTA FIBRA — ${_sessao.nome_provedor}*\n\n` +
            `*Cliente:* ${cliente}\n` +
            `*Serial ONU:* \`${serial}\`\n` +
            `*Ocorrência:* ${mensagem}\n\n` +
            `_Verifique a ONU do cliente para manutenção preventiva._`
        );
        window.open(`https://wa.me/?text=${texto}`, "_blank");
    }

    /* ══════════════════════════════════════════════════════
       NAVEGAÇÃO POR ABAS
    ══════════════════════════════════════════════════════ */

    function _navegarPara(aba) {
        document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("ativo"));
        document.querySelectorAll(".aba-conteudo").forEach((c) => c.classList.remove("ativo"));

        const link = document.querySelector(`[data-aba="${aba}"]`);
        const conteudo = document.getElementById(`aba-${aba}`);
        if (link) link.classList.add("ativo");
        if (conteudo) conteudo.classList.add("ativo");
    }

    /* ══════════════════════════════════════════════════════
       ATUALIZAÇÃO VIA SIMULAÇÃO
    ══════════════════════════════════════════════════════ */

    async function _atualizarSimulacao() {
        const pid = _sessao.provedor_id;
        const [stats, clientes, alertas] = await Promise.all([
            API.getStats(pid),
            API.getClientes(pid),
            API.getAlertas(pid),
        ]);
        _clientes = clientes;
        _alertas = alertas;
        _renderizarStats(stats);
        _renderizarClientes(clientes);
        _renderizarAlertas(alertas);
        _renderizarGraficoPizza(stats);
    }

    function _atualizarBadgeAlertas() {
        const badge = document.getElementById("badge-alertas");
        if (badge) {
            badge.textContent = _alertas.length;
            badge.style.display = _alertas.length > 0 ? "inline-flex" : "none";
        }
    }

    return { init, abrirDetalhe, abrirHistorico, resolverAlerta, enviarWhatsApp };
})();