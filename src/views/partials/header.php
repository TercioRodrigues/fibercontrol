<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FiberControl — Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/fibercontrol.css">
</head>

<body>

    <!-- ══════════════════════════════════════════════════════
     LAYOUT PRINCIPAL
    ══════════════════════════════════════════════════════ -->
    <div class="app-layout">

        <!-- ── SIDEBAR ── -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-logo">
                    <div class="sidebar-logo-badge" id="logo-inicial">—</div>
                    <div class="sidebar-logo-info">
                        <strong id="nome-provedor">Carregando...</strong>
                        <small id="cidade-provedor"></small>
                    </div>
                </div>
            </div>

            <nav class="nav-grupo">
                <div class="nav-grupo-titulo">Principal</div>

                <a href="#" class="nav-link ativo" data-aba="visao-geral">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <span>Visão Geral</span>
                </a>

                <a href="#" class="nav-link" data-aba="onus">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    <span>ONUs / Clientes</span>
                </a>

                <a href="#" class="nav-link" data-aba="alertas">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span>Alertas</span>
                    <span class="badge-alerta-nav" id="badge-alertas" style="display:none">0</span>
                </a>

                <a href="#" class="nav-link" data-aba="olt">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <span>OLT</span>
                </a>
            </nav>

            <nav class="nav-grupo">
                <div class="nav-grupo-titulo">Configuração</div>
                <a href="#" class="nav-link" data-aba="configuracoes">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14M19.07 4.93A10 10 0 0 0 4.93 4.93" />
                    </svg>
                    <span>Thresholds</span>
                </a>
            </nav>

            <div class="sidebar-footer">
                <button class="btn-logout" id="btn-logout">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span id="usuario-nome">Sair</span>
                </button>
            </div>
        </aside>

        <!-- ── ÁREA PRINCIPAL ── -->
        <div class="main-area">