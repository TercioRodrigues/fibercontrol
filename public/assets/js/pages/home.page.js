/**
 * home.page.js
 * Controller da página Home.
 */

window.addEventListener("DOMContentLoaded", async function () {

    if (typeof Chart === "undefined") {
        console.error("Chart.js não carregado.");
        return;
    }

    try {

        await Dashboard.init();

        DashboardHome.init();

    } catch (err) {

        console.error(err);

        UI.toast(
            "Erro ao carregar dashboard.",
            "erro"
        );
    }

});