/**
 * dadosSimulacao.js — FiberControl
 * ─────────────────────────────────────────────────────────────────────────────
 * Dados estáticos para simulação do sistema de monitoramento de fibra óptica.
 * Substitui as chamadas fetch() ao backend PHP durante a apresentação.
 *
 * INTEGRAÇÃO FUTURA (PHP):
 *   Cada objeto/array aqui corresponde a um endpoint REST. Exemplo:
 *   PROVEDORES          → GET /api/provedores
 *   OLTs                → GET /api/olts?provedor_id=X
 *   CLIENTES            → GET /api/clientes?olt_id=X
 *   histórico de sinal  → GET /api/sinal?cliente_id=X&periodo=24h
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ═══════════════════════════════════════════════
   USUÁRIOS / PROVEDORES
   Credenciais de acesso por provedor.
   Backend PHP: tabela `provedores` + `usuarios`
═══════════════════════════════════════════════ */
const USUARIOS = [
    {
        id: 1,
        usuario: "provedor1",
        senha: "provedor123",
        provedor_id: 1,
        nome_provedor: "Tércio Rodrigues",
        cidade: "Santa cruz do Capibaribe - PE",
        logo_inicial: "P1",
        cor: "#00d4ff",
    },
    {
        id: 2,
        usuario: "provedor2",
        senha: "provedor123",
        provedor_id: 2,
        nome_provedor: "Provedor 2",
        cidade: "Garanhuns - PE",
        logo_inicial: "P2",
        cor: "#7c3aed",
    },
    {
        id: 3,
        usuario: "provedor3",
        senha: "provedor123",
        provedor_id: 3,
        nome_provedor: "Provedor 3",
        cidade: "Petrolina - PE",
        logo_inicial: "P3",
        cor: "#059669",
    },
];

/* ═══════════════════════════════════════════════
   OLTs POR PROVEDOR
   Cada provedor tem 1 OLT (expansível para N).
   Backend PHP: tabela `olts`
═══════════════════════════════════════════════ */
const OLTS = {
    1: {
        id: 101,
        provedor_id: 1,
        nome: "OLT-NORTE-01",
        modelo: "Huawei MA5800-X7",
        ip: "192.168.10.1",
        firmware: "V800R021C10",
        portas_pon: 16,
        portas_ativas: 10,
        uptime: "47 dias, 12h",
        localizacao: "Datacenter Centro - Caruaru",
    },
    2: {
        id: 102,
        provedor_id: 2,
        nome: "OLT-LESTE-01",
        modelo: "ZTE ZXA10 C320",
        ip: "192.168.20.1",
        firmware: "V2.1.0",
        portas_pon: 8,
        portas_ativas: 10,
        uptime: "12 dias, 3h",
        localizacao: "Rack Principal - Garanhuns",
    },
    3: {
        id: 103,
        provedor_id: 3,
        nome: "OLT-SUL-01",
        modelo: "Fiberhome AN5516-04",
        ip: "192.168.30.1",
        firmware: "RP0700",
        portas_pon: 8,
        portas_ativas: 10,
        uptime: "5 dias, 20h",
        localizacao: "NOC Petrolina",
    },
};

/* ═══════════════════════════════════════════════
   CLIENTES / ONUs por PROVEDOR
   10 clientes por provedor com dados de sinal.
   Backend PHP: tabela `onus` + `leituras_sinal`

   CAMPOS DE SINAL (GPON):
   rx_power  → Potência recebida pela ONU (dBm). Ideal: -8 a -27 dBm
   tx_power  → Potência transmitida pela ONU (dBm). Ideal: 0 a +5 dBm
   status    → online | degradado | offline
   onu_type  → tipo do equipamento
═══════════════════════════════════════════════ */
const CLIENTES = {
    /* ── PROVEDOR 1 ── NetFibra Norte ── */
    1: [
        { id: 1001, serial: "HWTC1A2B3C4D", nome: "João Silva", endereco: "Rua das Flores, 120 - Caruaru", plano: "300 Mbps", porta_pon: "0/0/1", onu_id: 1, onu_type: "HG8310M", rx_power: -15.2, tx_power: 2.1, status: "online", ultima_leitura: "agora" },
        { id: 1002, serial: "HWTC5E6F7G8H", nome: "Maria Santos", endereco: "Av. Central, 450 - Caruaru", plano: "500 Mbps", porta_pon: "0/0/1", onu_id: 2, onu_type: "HG8310M", rx_power: -24.8, tx_power: 3.5, status: "degradado", ultima_leitura: "1 min" },
        { id: 1003, serial: "ZTEG9I0J1K2L", nome: "Carlos Ferreira", endereco: "Rua da Saudade, 88 - Caruaru", plano: "100 Mbps", porta_pon: "0/0/2", onu_id: 1, onu_type: "ZTE F601", rx_power: -12.0, tx_power: 1.8, status: "online", ultima_leitura: "agora" },
        { id: 1004, serial: "HWTC3M4N5O6P", nome: "Ana Oliveira", endereco: "Travessa Boa Vista, 33 - Caruaru", plano: "200 Mbps", porta_pon: "0/0/2", onu_id: 2, onu_type: "HG8245H", rx_power: -29.5, tx_power: 4.8, status: "offline", ultima_leitura: "8 min" },
        { id: 1005, serial: "FIBH7Q8R9S0T", nome: "Roberto Costa", endereco: "Rua Palmeira, 210 - Caruaru", plano: "1 Gbps", porta_pon: "0/0/3", onu_id: 1, onu_type: "AN5506-04", rx_power: -10.5, tx_power: 2.3, status: "online", ultima_leitura: "agora" },
        { id: 1006, serial: "ZTEG1U2V3W4X", nome: "Fernanda Lima", endereco: "Rua das Mangueiras, 77 - Caruaru", plano: "300 Mbps", porta_pon: "0/0/3", onu_id: 2, onu_type: "ZTE F660", rx_power: -16.3, tx_power: 2.0, status: "online", ultima_leitura: "agora" },
        { id: 1007, serial: "HWTC5Y6Z7A8B", nome: "Pedro Alves", endereco: "Av. Presidente, 900 - Caruaru", plano: "500 Mbps", porta_pon: "0/0/4", onu_id: 1, onu_type: "HG8310M", rx_power: -26.1, tx_power: 4.2, status: "degradado", ultima_leitura: "2 min" },
        { id: 1008, serial: "FIBH9C0D1E2F", nome: "Juliana Souza", endereco: "Rua São João, 15 - Caruaru", plano: "200 Mbps", porta_pon: "0/0/4", onu_id: 2, onu_type: "AN5506-04", rx_power: -18.7, tx_power: 2.6, status: "online", ultima_leitura: "agora" },
        { id: 1009, serial: "ZTEG3G4H5I6J", nome: "Lucas Martins", endereco: "Rua Esperança, 304 - Caruaru", plano: "100 Mbps", porta_pon: "0/0/5", onu_id: 1, onu_type: "ZTE F601", rx_power: -13.4, tx_power: 1.9, status: "online", ultima_leitura: "agora" },
        { id: 1010, serial: "HWTC7K8L9M0N", nome: "Beatriz Rocha", endereco: "Av. Industrial, 550 - Caruaru", plano: "1 Gbps", porta_pon: "0/0/5", onu_id: 2, onu_type: "HG8245H", rx_power: -11.2, tx_power: 1.5, status: "online", ultima_leitura: "agora" },
    ],

    /* ── PROVEDOR 2 ── FibraMax Leste ── */
    2: [
        { id: 2001, serial: "ZTEG2A3B4C5D", nome: "Marcos Nunes", endereco: "Rua do Comércio, 78 - Garanhuns", plano: "200 Mbps", porta_pon: "1/1/1", onu_id: 1, onu_type: "ZTE F660", rx_power: -14.0, tx_power: 2.0, status: "online", ultima_leitura: "agora" },
        { id: 2002, serial: "HWTC6E7F8G9H", nome: "Camila Barros", endereco: "Av. Presidente Vargas, 230 - Garanhuns", plano: "500 Mbps", porta_pon: "1/1/1", onu_id: 2, onu_type: "HG8310M", rx_power: -30.2, tx_power: 5.1, status: "offline", ultima_leitura: "15 min" },
        { id: 2003, serial: "FIBH0I1J2K3L", nome: "Thiago Mendes", endereco: "Rua Nova, 12 - Garanhuns", plano: "300 Mbps", porta_pon: "1/1/2", onu_id: 1, onu_type: "AN5506-04", rx_power: -19.3, tx_power: 3.0, status: "online", ultima_leitura: "agora" },
        { id: 2004, serial: "ZTEG4M5N6O7P", nome: "Larissa Campos", endereco: "Rua das Acácias, 55 - Garanhuns", plano: "100 Mbps", porta_pon: "1/1/2", onu_id: 2, onu_type: "ZTE F601", rx_power: -25.6, tx_power: 4.0, status: "degradado", ultima_leitura: "3 min" },
        { id: 2005, serial: "HWTC8Q9R0S1T", nome: "Diego Pires", endereco: "Av. Beira Rio, 800 - Garanhuns", plano: "1 Gbps", porta_pon: "1/1/3", onu_id: 1, onu_type: "HG8245H", rx_power: -11.8, tx_power: 1.7, status: "online", ultima_leitura: "agora" },
        { id: 2006, serial: "FIBH2U3V4W5X", nome: "Amanda Freitas", endereco: "Rua da Paz, 90 - Garanhuns", plano: "300 Mbps", porta_pon: "1/1/3", onu_id: 2, onu_type: "AN5506-04", rx_power: -22.4, tx_power: 3.8, status: "degradado", ultima_leitura: "1 min" },
        { id: 2007, serial: "ZTEG6Y7Z8A9B", nome: "Rafael Gomes", endereco: "Av. das Palmeiras, 610 - Garanhuns", plano: "200 Mbps", porta_pon: "1/1/4", onu_id: 1, onu_type: "ZTE F660", rx_power: -16.9, tx_power: 2.4, status: "online", ultima_leitura: "agora" },
        { id: 2008, serial: "HWTC0C1D2E3F", nome: "Tatiana Vaz", endereco: "Rua Flamboyant, 22 - Garanhuns", plano: "100 Mbps", porta_pon: "1/1/4", onu_id: 2, onu_type: "HG8310M", rx_power: -13.1, tx_power: 2.1, status: "online", ultima_leitura: "agora" },
        { id: 2009, serial: "FIBH4G5H6I7J", nome: "Vinícius Leal", endereco: "Rua Seringueira, 45 - Garanhuns", plano: "500 Mbps", porta_pon: "1/1/5", onu_id: 1, onu_type: "AN5506-04", rx_power: -17.5, tx_power: 2.9, status: "online", ultima_leitura: "agora" },
        { id: 2010, serial: "ZTEG8K9L0M1N", nome: "Patrícia Cunha", endereco: "Av. do Contorno, 1100 - Garanhuns", plano: "1 Gbps", porta_pon: "1/1/5", onu_id: 2, onu_type: "ZTE F601", rx_power: -10.3, tx_power: 1.4, status: "online", ultima_leitura: "agora" },
    ],

    /* ── PROVEDOR 3 ── ConnectFibra Sul ── */
    3: [
        { id: 3001, serial: "FIBH2O3P4Q5R", nome: "Antônio Melo", endereco: "Rua do Sol, 200 - Petrolina", plano: "200 Mbps", porta_pon: "0/1/1", onu_id: 1, onu_type: "AN5506-04", rx_power: -15.7, tx_power: 2.3, status: "online", ultima_leitura: "agora" },
        { id: 3002, serial: "HWTC6S7T8U9V", nome: "Sônia Ramos", endereco: "Av. Cardoso de Sá, 340 - Petrolina", plano: "300 Mbps", porta_pon: "0/1/1", onu_id: 2, onu_type: "HG8245H", rx_power: -27.9, tx_power: 4.5, status: "degradado", ultima_leitura: "4 min" },
        { id: 3003, serial: "ZTEG0W1X2Y3Z", nome: "Eduardo Teles", endereco: "Rua Vitória, 88 - Petrolina", plano: "500 Mbps", porta_pon: "0/1/2", onu_id: 1, onu_type: "ZTE F660", rx_power: -12.5, tx_power: 1.9, status: "online", ultima_leitura: "agora" },
        { id: 3004, serial: "FIBH4A5B6C7D", nome: "Renata Figueiredo", endereco: "Travessa das Orquídeas, 19 - Petrolina", plano: "100 Mbps", porta_pon: "0/1/2", onu_id: 2, onu_type: "AN5506-04", rx_power: -31.0, tx_power: 5.5, status: "offline", ultima_leitura: "22 min" },
        { id: 3005, serial: "HWTC8E9F0G1H", nome: "Gustavo Araújo", endereco: "Rua Independência, 500 - Petrolina", plano: "1 Gbps", porta_pon: "0/1/3", onu_id: 1, onu_type: "HG8310M", rx_power: -9.8, tx_power: 1.2, status: "online", ultima_leitura: "agora" },
        { id: 3006, serial: "ZTEG2I3J4K5L", nome: "Mônica Cardoso", endereco: "Av. São Francisco, 750 - Petrolina", plano: "300 Mbps", porta_pon: "0/1/3", onu_id: 2, onu_type: "ZTE F601", rx_power: -18.2, tx_power: 2.7, status: "online", ultima_leitura: "agora" },
        { id: 3007, serial: "FIBH6M7N8O9P", nome: "Flávio Santana", endereco: "Rua Catinga do Moura, 31 - Petrolina", plano: "200 Mbps", porta_pon: "0/1/4", onu_id: 1, onu_type: "AN5506-04", rx_power: -23.7, tx_power: 3.9, status: "degradado", ultima_leitura: "2 min" },
        { id: 3008, serial: "HWTC0Q1R2S3T", nome: "Daniela Moura", endereco: "Rua das Cajazeiras, 68 - Petrolina", plano: "500 Mbps", porta_pon: "0/1/4", onu_id: 2, onu_type: "HG8245H", rx_power: -14.4, tx_power: 2.0, status: "online", ultima_leitura: "agora" },
        { id: 3009, serial: "ZTEG4U5V6W7X", nome: "Cláudio Batista", endereco: "Av. Domingos Veloso, 111 - Petrolina", plano: "100 Mbps", porta_pon: "0/1/5", onu_id: 1, onu_type: "ZTE F660", rx_power: -20.6, tx_power: 3.3, status: "online", ultima_leitura: "agora" },
        { id: 3010, serial: "FIBH8Y9Z0A1B", nome: "Simone Nogueira", endereco: "Rua Caju, 780 - Petrolina", plano: "1 Gbps", porta_pon: "0/1/5", onu_id: 2, onu_type: "AN5506-04", rx_power: -11.9, tx_power: 1.6, status: "online", ultima_leitura: "agora" },
    ],
};

/* ═══════════════════════════════════════════════
   HISTÓRICO DE SINAL (últimas 24h)
   Usado nos gráficos de linha do cliente.
   Backend PHP: tabela `leituras_sinal`
   GET /api/historico?cliente_id=X&horas=24
═══════════════════════════════════════════════ */
function gerarHistorico(rxBase, temProblema = false) {
    const pontos = [];
    const agora = new Date();
    for (let i = 23; i >= 0; i--) {
        const hora = new Date(agora - i * 3600000);
        const label = hora.getHours().toString().padStart(2, "0") + ":00";
        let variacao = (Math.random() - 0.5) * 3;
        if (temProblema && i < 4) {
            variacao -= Math.random() * 6; // degrada nas últimas horas
        }
        pontos.push({ hora: label, rx: +(rxBase + variacao).toFixed(1) });
    }
    return pontos;
}

/* ═══════════════════════════════════════════════
   ALERTAS ATIVOS
   Backend PHP: tabela `alertas`
   GET /api/alertas?provedor_id=X&status=aberto
═══════════════════════════════════════════════ */
const ALERTAS_BASE = {
    1: [
        { id: 9001, cliente_id: 1002, serial: "HWTC5E6F7G8H", cliente: "Maria Santos", tipo: "sinal_ruim", mensagem: "Sinal Rx abaixo do limiar (-24.8 dBm)", criado_em: "há 12 min", nivel: "aviso" },
        { id: 9002, cliente_id: 1004, serial: "HWTC3M4N5O6P", cliente: "Ana Oliveira", tipo: "sem_sinal", mensagem: "ONU offline há 8 minutos", criado_em: "há 8 min", nivel: "critico" },
        { id: 9003, cliente_id: 1007, serial: "HWTC5Y6Z7A8B", cliente: "Pedro Alves", tipo: "sinal_ruim", mensagem: "Sinal Rx abaixo do limiar (-26.1 dBm)", criado_em: "há 2 min", nivel: "aviso" },
    ],
    2: [
        { id: 9004, cliente_id: 2002, serial: "HWTC6E7F8G9H", cliente: "Camila Barros", tipo: "sem_sinal", mensagem: "ONU offline há 15 minutos", criado_em: "há 15 min", nivel: "critico" },
        { id: 9005, cliente_id: 2004, serial: "ZTEG4M5N6O7P", cliente: "Larissa Campos", tipo: "sinal_ruim", mensagem: "Sinal Rx abaixo do limiar (-25.6 dBm)", criado_em: "há 3 min", nivel: "aviso" },
        { id: 9006, cliente_id: 2006, serial: "FIBH2U3V4W5X", cliente: "Amanda Freitas", tipo: "sinal_ruim", mensagem: "Oscilação de sinal detectada (-22.4 dBm)", criado_em: "há 1 min", nivel: "aviso" },
    ],
    3: [
        { id: 9007, cliente_id: 3002, serial: "HWTC6S7T8U9V", cliente: "Sônia Ramos", tipo: "sinal_ruim", mensagem: "Sinal Rx abaixo do limiar (-27.9 dBm)", criado_em: "há 4 min", nivel: "aviso" },
        { id: 9008, cliente_id: 3004, serial: "FIBH4A5B6C7D", cliente: "Renata Figueiredo", tipo: "sem_sinal", mensagem: "ONU offline há 22 minutos", criado_em: "há 22 min", nivel: "critico" },
        { id: 9009, cliente_id: 3007, serial: "FIBH6M7N8O9P", cliente: "Flávio Santana", tipo: "sinal_ruim", mensagem: "Sinal Rx abaixo do limiar (-23.7 dBm)", criado_em: "há 2 min", nivel: "aviso" },
    ],
};

/* ═══════════════════════════════════════════════
   THRESHOLDS DE SINAL GPON
   Valores de referência para alertas.
   Backend PHP: tabela `configuracoes`
═══════════════════════════════════════════════ */
const THRESHOLDS = {
    rx_minimo: -27,    // dBm — abaixo disso: sinal ruim
    rx_critico: -29,   // dBm — abaixo disso: offline iminente
    rx_maximo: -8,     // dBm — acima disso: sinal forte
    tx_minimo: 0,
    tx_maximo: 5,
};

/* ═══════════════════════════════════════════════
   ESTATÍSTICAS DO DASHBOARD
   Backend PHP: views/procedures agregados
   GET /api/stats?provedor_id=X
═══════════════════════════════════════════════ */
function calcularStats(provedorId) {
    const clientes = CLIENTES[provedorId] || [];
    return {
        total: clientes.length,
        online: clientes.filter((c) => c.status === "online").length,
        degradado: clientes.filter((c) => c.status === "degradado").length,
        offline: clientes.filter((c) => c.status === "offline").length,
        alertas_abertos: (ALERTAS_BASE[provedorId] || []).length,
    };
}

/* ═══════════════════════════════════════════════
   EXPORTAÇÕES — usadas pelos demais módulos JS
═══════════════════════════════════════════════ */
window.SimDB = {
    USUARIOS,
    OLTS,
    CLIENTES,
    ALERTAS_BASE,
    THRESHOLDS,
    calcularStats,
    gerarHistorico,
};