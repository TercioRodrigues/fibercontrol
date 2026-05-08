/**
 * dashboard.home.js
 * Recursos exclusivos da home.
 */

var DashboardHome = (() => {

    async function init() {

        await renderizarTabelaAtencao();

        await renderizarAlertasMini();

        Simulacao.onAtualizar(async () => {

            await renderizarTabelaAtencao();

            await renderizarAlertasMini();

        });

    }

    async function renderizarTabelaAtencao() {

        const sessao = Auth.getSessao();

        if (!sessao) return;

        const clientes = await API.getClientes(
            sessao.provedor_id
        );

        const comAtencao = clientes
            .filter(c => c.status !== "online")
            .slice(0, 5);

        const tbody = document.getElementById(
            "tabela-atencao-body"
        );

        if (!tbody) return;

        if (comAtencao.length === 0) {

            tbody.innerHTML =
                `<tr>
                    <td colspan="8" class="vazio">
                        ✓ Todas as ONUs estão com sinal normal.
                    </td>
                </tr>`;

            return;
        }

        tbody.innerHTML = comAtencao
            .map(UI.linhaCliente)
            .join("");

    }

    async function renderizarAlertasMini() {

        const sessao = Auth.getSessao();

        if (!sessao) return;

        const alertas = await API.getAlertas(
            sessao.provedor_id
        );

        const cont = document.getElementById(
            "lista-alertas-mini"
        );

        if (!cont) return;

        const primeiros = alertas.slice(0, 3);

        if (primeiros.length === 0) {

            cont.innerHTML =
                `<div class="sem-alertas">
                    Nenhum alerta ativo.
                </div>`;

            return;
        }

        cont.innerHTML = primeiros
            .map(UI.cardAlerta)
            .join("");

    }

    return {
        init
    };

})();