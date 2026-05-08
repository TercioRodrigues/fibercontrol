/**
 * ui.js — FiberControl
 * ─────────────────────────────────────────────────────────────────────────────
 * Componentes de interface reutilizáveis.
 * Funções puras que recebem dados e retornam HTML strings ou manipulam DOM.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── UI: objeto global de componentes de interface ────────────────────────────
var UI = {

  // ── Badges de status ────────────────────────────────────────────────────────

  /**
   * Retorna HTML do badge colorido com o status da ONU.
   * @param {string} status  "online" | "degradado" | "offline"
   */
  badgeStatus: function (status) {
    var mapa = {
      online: { cls: "badge-online", icone: "●", label: "Online" },
      degradado: { cls: "badge-degradado", icone: "◐", label: "Sinal Ruim" },
      offline: { cls: "badge-offline", icone: "○", label: "Offline" }
    };
    var s = mapa[status] || mapa.offline;
    return '<span class="badge ' + s.cls + '"><i>' + s.icone + '</i>' + s.label + '</span>';
  },

  /**
   * Retorna HTML do badge de nível do alerta.
   * @param {string} nivel  "critico" | "aviso" | "info"
   */
  badgeNivel: function (nivel) {
    var mapa = {
      critico: { cls: "badge-offline", label: "Crítico" },
      aviso: { cls: "badge-degradado", label: "Aviso" },
      info: { cls: "badge-online", label: "Info" }
    };
    var n = mapa[nivel] || mapa.info;
    return '<span class="badge ' + n.cls + '">' + n.label + '</span>';
  },

  // ── Barra visual de sinal ────────────────────────────────────────────────────

  /**
   * Retorna HTML com barra de sinal colorida e valor em dBm.
   * Sinal GPON: ideal entre -8 e -27 dBm.
   * @param {number} rxPower  valor em dBm (ex: -15.2)
   */
  barrasSinal: function (rxPower) {
    var rx_minimo = SimDB.THRESHOLDS.rx_minimo;
    var rx_critico = SimDB.THRESHOLDS.rx_critico;

    var qualidade, cls;
    if (rxPower >= -20) {
      qualidade = "Ótimo"; cls = "sinal-otimo";
    } else if (rxPower >= rx_minimo) {
      qualidade = "Bom"; cls = "sinal-bom";
    } else if (rxPower >= rx_critico) {
      qualidade = "Ruim"; cls = "sinal-ruim";
    } else {
      qualidade = "Crítico"; cls = "sinal-critico";
    }

    // Normaliza de -32 a -8 dBm para 0-100%
    var pct = Math.max(0, Math.min(100, ((rxPower - (-32)) / (-8 - (-32))) * 100));

    return '<div class="sinal-wrapper">'
      + '<div class="sinal-barra-bg">'
      + '<div class="sinal-barra-fill ' + cls + '" style="width:' + pct.toFixed(0) + '%"></div>'
      + '</div>'
      + '<span class="sinal-valor ' + cls + '">' + rxPower + ' dBm</span>'
      + '</div>';
  },

  // ── Card de estatística ──────────────────────────────────────────────────────

  /**
   * Retorna HTML de um card de métrica para o topo do dashboard.
   * @param {object} opts  { titulo, valor, icone, cor, descricao }
   */
  cardStat: function (opts) {
    return '<div class="stat-card" style="--acento:' + opts.cor + '">'
      + '<div class="stat-icone">' + opts.icone + '</div>'
      + '<div class="stat-info">'
      + '<span class="stat-titulo">' + opts.titulo + '</span>'
      + '<span class="stat-valor">' + opts.valor + '</span>'
      + (opts.descricao ? '<span class="stat-desc">' + opts.descricao + '</span>' : '')
      + '</div>'
      + '</div>';
  },

  // ── Linha da tabela de clientes ──────────────────────────────────────────────

  /**
   * Retorna HTML de uma linha <tr> para a tabela de ONUs.
   * @param {object} c  objeto cliente de dadosSimulacao.js
   */
  linhaCliente: function (c) {
    return '<tr class="linha-cliente linha-' + c.status + '" data-id="' + c.id + '" data-status="' + c.status + '">'
      + '<td class="td-nome">'
      + '<div class="nome-wrap">'
      + '<span class="dot-status dot-' + c.status + '"></span>'
      + '<div><strong>' + c.nome + '</strong><small>' + c.endereco + '</small></div>'
      + '</div>'
      + '</td>'
      + '<td><code class="serial">' + c.serial + '</code></td>'
      + '<td>' + c.onu_type + '</td>'
      + '<td>' + c.porta_pon + '</td>'
      + '<td>' + UI.barrasSinal(c.rx_power) + '</td>'
      + '<td>' + UI.badgeStatus(c.status) + '</td>'
      + '<td>' + c.ultima_leitura + '</td>'
      + '<td>'
      + '<div class="acoes-td">'
      + '<button class="btn-icone btn-detalhe" onclick="Dashboard.abrirDetalhe(' + c.id + ')" title="Ver detalhes">'
      + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>'
      + '</button>'
      + '<button class="btn-icone btn-hist" onclick="Dashboard.abrirHistorico(' + c.id + ')" title="Histórico de sinal">'
      + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
      + '</button>'
      + '</div>'
      + '</td>'
      + '</tr>';
  },

  // ── Card de alerta ───────────────────────────────────────────────────────────

  /**
   * Retorna HTML de um card de alerta.
   * @param {object} a  objeto alerta de dadosSimulacao.js
   */
  cardAlerta: function (a) {
    return '<div class="alerta-card alerta-' + a.nivel + '" data-alerta-id="' + a.id + '">'
      + '<div class="alerta-header">'
      + UI.badgeNivel(a.nivel)
      + '<span class="alerta-tempo">' + a.criado_em + '</span>'
      + '</div>'
      + '<div class="alerta-corpo">'
      + '<strong>' + a.cliente + '</strong>'
      + '<p>' + a.mensagem + '</p>'
      + '<code>' + a.serial + '</code>'
      + '</div>'
      + '<div class="alerta-acoes">'
      + '<button class="btn-sm btn-resolver" onclick="Dashboard.resolverAlerta(' + a.id + ')">Resolver</button>'
      + '<button class="btn-sm btn-whatsapp" onclick="Dashboard.enviarWhatsApp(\'' + a.serial + '\',\'' + a.cliente.replace(/'/g, "\\'") + '\',\'' + a.mensagem.replace(/'/g, "\\'") + '\')">'
      + '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'
      + ' WhatsApp'
      + '</button>'
      + '</div>'
      + '</div>';
  },

  // ── Modal ────────────────────────────────────────────────────────────────────

  /** Abre o modal global com título e conteúdo HTML. */
  abrirModal: function (titulo, conteudoHtml) {
    var modal = document.getElementById("modal");
    var modalTit = document.getElementById("modal-titulo");
    var modalCorpo = document.getElementById("modal-corpo");
    if (!modal) return;
    modalTit.textContent = titulo;
    modalCorpo.innerHTML = conteudoHtml;
    modal.classList.add("ativo");
  },

  /** Fecha o modal global. */
  fecharModal: function () {
    var modal = document.getElementById("modal");
    if (modal) modal.classList.remove("ativo");
  },

  // ── Toast ────────────────────────────────────────────────────────────────────

  /**
   * Exibe uma notificação temporária no canto da tela.
   * @param {string} mensagem
   * @param {string} tipo     "info" | "sucesso" | "erro"
   * @param {number} duracao  ms (padrão 3500)
   */
  toast: function (mensagem, tipo, duracao) {
    tipo = tipo || "info";
    duracao = duracao || 3500;

    var cont = document.getElementById("toast-container");
    if (!cont) return;

    var el = document.createElement("div");
    el.className = "toast toast-" + tipo;
    el.textContent = mensagem;
    cont.appendChild(el);

    requestAnimationFrame(function () { el.classList.add("toast-visivel"); });

    setTimeout(function () {
      el.classList.remove("toast-visivel");
      setTimeout(function () { el.remove(); }, 400);
    }, duracao);
  },

  // ── Skeleton de carregamento ─────────────────────────────────────────────────

  /** Retorna HTML de linhas skeleton para a tabela enquanto carrega. */
  skeleton: function (linhas) {
    linhas = linhas || 5;
    var html = "";
    for (var i = 0; i < linhas; i++) {
      html += '<tr class="skeleton-row"><td colspan="8"><div class="skeleton-line"></div></td></tr>';
    }
    return html;
  },

  // ── Filtro de tabela ─────────────────────────────────────────────────────────

  /**
   * Filtra as linhas da tabela de clientes por texto e/ou status.
   * Operação puramente DOM — não recarrega dados do servidor.
   * @param {string} textoBusca
   * @param {string} filtroStatus  "todos" | "online" | "degradado" | "offline"
   */
  filtrarTabela: function (textoBusca, filtroStatus) {
    var linhas = document.querySelectorAll(".linha-cliente");
    linhas.forEach(function (tr) {
      var texto = tr.textContent.toLowerCase();
      var matchTexto = !textoBusca || texto.indexOf(textoBusca.toLowerCase()) !== -1;
      var matchStatus = !filtroStatus
        || filtroStatus === "todos"
        || tr.classList.contains("linha-" + filtroStatus);
      tr.style.display = (matchTexto && matchStatus) ? "" : "none";
    });
  }

};