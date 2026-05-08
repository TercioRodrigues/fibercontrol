<?= $render('header') ?>
<!-- Topbar -->
<header class="topbar">
    <div class="topbar-titulo">
        <h2 id="topbar-titulo">Visão Geral</h2>
        <p id="topbar-subtitulo">Visibilidade total da sua rede óptica</p>
    </div>
    <div class="topbar-acoes">
        <div class="indicador-live">
            <span class="dot-live"></span>
            Simulação ativa
        </div>
        <button class="btn-icone" id="btn-atualizar" title="Atualizar dados">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
        </button>
    </div>
</header>

<!-- Conteúdo com scroll -->
<main class="main-scroll">

    <!-- ══════════════════════════════════════════════
           ABA: VISÃO GERAL
      ══════════════════════════════════════════════ -->
    <section class="aba-conteudo ativo" id="aba-visao-geral">

        <!-- Cards de estatística -->
        <div class="stats-grid" id="cards-stats">
            <!-- renderizado por dashboard.js → _renderizarStats() -->
        </div>

        <!-- Grid: Alertas recentes + Gráfico de pizza -->
        <div class="secao-grid">
            <!-- Alertas recentes (resumo) -->
            <div class="card-secao">
                <div class="card-secao-header">
                    <h3>Alertas Recentes</h3>
                    <a href="#" class="nav-link" data-aba="alertas" style="font-size:12px;color:var(--cor-provedor);padding:0;border:none">Ver todos →</a>
                </div>
                <div id="lista-alertas-mini" class="alertas-lista">
                    <!-- renderizado por dashboard.js → _renderizarAlertasMini() -->
                </div>
            </div>

            <!-- Gráfico de distribuição -->
            <div class="card-secao">
                <div class="card-secao-header">
                    <h3>Distribuição ONUs</h3>
                </div>
                <div class="grafico-pizza-wrap">
                    <canvas id="grafico-pizza" width="200" height="200"></canvas>
                </div>
            </div>
        </div>

        <!-- Tabela rápida (5 primeiros) -->
        <div class="tabela-container">
            <div class="tabela-toolbar">
                <h3>ONUs com Atenção</h3>
                <a href="#" class="nav-link" data-aba="onus" style="font-size:12px;color:var(--cor-provedor);padding:0;border:none;margin-left:auto">Ver todas →</a>
            </div>
            <table class="tabela-onus">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Serial</th>
                        <th>Modelo</th>
                        <th>Porta</th>
                        <th>Sinal Rx</th>
                        <th>Status</th>
                        <th>Leitura</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tabela-atencao-body">
                    <!-- renderizado por dashboard.js → _renderizarTabelaAtencao() -->
                </tbody>
            </table>
        </div>
    </section>

    <!-- ══════════════════════════════════════════════
           ABA: ONUs / CLIENTES
      ══════════════════════════════════════════════ -->
    <section class="aba-conteudo" id="aba-onus">
        <div class="tabela-container">
            <div class="tabela-toolbar">
                <h3>Todas as ONUs</h3>
                <input
                    type="text"
                    class="input-busca"
                    id="input-busca"
                    placeholder="Buscar por nome, serial...">
                <select class="select-filtro" id="select-filtro-status">
                    <option value="todos">Todos os status</option>
                    <option value="online">Online</option>
                    <option value="degradado">Sinal Ruim</option>
                    <option value="offline">Offline</option>
                </select>
            </div>
            <table class="tabela-onus">
                <thead>
                    <tr>
                        <th>Cliente / Endereço</th>
                        <th>Serial ONU</th>
                        <th>Modelo</th>
                        <th>Porta PON</th>
                        <th>Sinal Rx</th>
                        <th>Status</th>
                        <th>Última leitura</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabela-clientes-body">
                    <!-- renderizado por dashboard.js → _renderizarClientes() -->
                </tbody>
            </table>
        </div>
    </section>

    <!-- ══════════════════════════════════════════════
           ABA: ALERTAS
      ══════════════════════════════════════════════ -->
    <section class="aba-conteudo" id="aba-alertas">
        <div class="alertas-header-aba">
            <h3>Alertas Ativos</h3>
        </div>
        <div id="lista-alertas" class="alertas-lista">
            <!-- renderizado por dashboard.js → _renderizarAlertas() -->
        </div>
    </section>

    <!-- ══════════════════════════════════════════════
           ABA: OLT
      ══════════════════════════════════════════════ -->
    <section class="aba-conteudo" id="aba-olt">
        <div class="olt-secao-grid">
            <!-- Info da OLT -->
            <div class="card-secao">
                <div class="card-secao-header">
                    <h3>Informações da OLT</h3>
                </div>
                <div class="card-secao-corpo">
                    <div class="olt-status-indicator">
                        <span class="dot-live" style="background:var(--verde);box-shadow:0 0 6px #22c55e66"></span>
                        Operacional
                    </div>
                    <table class="olt-info-tabela" style="width:100%">
                        <tr>
                            <td>Nome</td>
                            <td id="olt-nome">—</td>
                        </tr>
                        <tr>
                            <td>Modelo</td>
                            <td id="olt-modelo">—</td>
                        </tr>
                        <tr>
                            <td>IP de Gerência</td>
                            <td><code id="olt-ip">—</code></td>
                        </tr>
                        <tr>
                            <td>Firmware</td>
                            <td id="olt-firmware">—</td>
                        </tr>
                        <tr>
                            <td>Uptime</td>
                            <td id="olt-uptime">—</td>
                        </tr>
                        <tr>
                            <td>Localização</td>
                            <td id="olt-local">—</td>
                        </tr>
                        <tr>
                            <td>Portas PON</td>
                            <td id="olt-portas">—</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Thresholds de referência -->
            <div class="card-secao">
                <div class="card-secao-header">
                    <h3>Thresholds de Sinal (GPON)</h3>
                </div>
                <div class="card-secao-corpo">
                    <table class="olt-info-tabela" style="width:100%">
                        <tr>
                            <td>Rx ótimo</td>
                            <td>≥ −20 dBm</td>
                        </tr>
                        <tr>
                            <td>Rx bom</td>
                            <td>−20 a −27 dBm</td>
                        </tr>
                        <tr>
                            <td>Rx ruim (alerta)</td>
                            <td>
                                < −27 dBm</td>
                        </tr>
                        <tr>
                            <td>Rx crítico (offline)</td>
                            <td>
                                < −29 dBm</td>
                        </tr>
                        <tr>
                            <td>Tx mínimo</td>
                            <td>0 dBm</td>
                        </tr>
                        <tr>
                            <td>Tx máximo</td>
                            <td>+5 dBm</td>
                        </tr>
                    </table>
                    <p style="font-size:11px;color:var(--texto-sec);margin-top:14px">
                        Valores configuráveis via backend PHP na tabela <code>configuracoes</code>.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- ══════════════════════════════════════════════
           ABA: CONFIGURAÇÕES / THRESHOLDS
      ══════════════════════════════════════════════ -->
    <section class="aba-conteudo" id="aba-configuracoes">
        <div class="card-secao" style="max-width:500px">
            <div class="card-secao-header">
                <h3>Thresholds de Alerta</h3>
            </div>
            <div class="card-secao-corpo">
                <p style="font-size:13px;color:var(--texto-sec);margin-bottom:16px">
                    Defina os limites de sinal que disparam alertas e mensagens WhatsApp.
                </p>

                <div class="form-grupo">
                    <label>Rx mínimo (sinal ruim) — dBm</label>
                    <input type="number" id="cfg-rx-minimo" value="-27" step="0.5" style="background:var(--bg-700);border:1px solid var(--borda);border-radius:8px;padding:8px 12px;color:var(--texto);font-size:14px;width:100%;outline:none">
                </div>
                <div class="form-grupo">
                    <label>Rx crítico (offline) — dBm</label>
                    <input type="number" id="cfg-rx-critico" value="-29" step="0.5" style="background:var(--bg-700);border:1px solid var(--borda);border-radius:8px;padding:8px 12px;color:var(--texto);font-size:14px;width:100%;outline:none">
                </div>

                <button class="btn-primario" id="btn-salvar-cfg" style="width:auto;padding:10px 24px;margin-top:8px">
                    Salvar Configurações
                </button>
                <p style="font-size:11px;color:var(--texto-sec);margin-top:10px">
                    ⚠ No backend PHP: <code>PATCH /api/configuracoes</code> salvará na tabela <code>configuracoes</code>.
                </p>
            </div>
        </div>
    </section>

</main><!-- /main-scroll -->

<?= $render('scripts') ?>

<!-- módulos -->
<script src="/assets/js/modules/dashboard.js"></script>
<script src="/assets/js/modules/dashboard.home.js"></script>

<!-- controller da página -->
<script src="/assets/js/pages/home.page.js"></script>

<?= $render('modais') ?>
<?= $render('footer') ?>