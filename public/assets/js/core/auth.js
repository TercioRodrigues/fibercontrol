/**
 * auth.js — FiberControl
 * ─────────────────────────────────────────────────────────────────────────────
 * Gerencia login, logout e sessão do usuário.
 *
 * INTEGRAÇÃO FUTURA (PHP):
 *   POST /api/auth/login  → { usuario, senha } → { token, provedor_id, ... }
 *   POST /api/auth/logout → invalida token
 *   GET  /api/auth/me     → retorna dados da sessão pelo token JWT/cookie
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Chave usada no sessionStorage para guardar a sessão
var AUTH_CHAVE_SESSAO = "fibercontrol_sessao";

// Utilitário interno: simula delay de rede
function auth_delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

// ─── Auth: objeto global de autenticação ─────────────────────────────────────
var Auth = {

    /**
     * Tenta autenticar o usuário com as credenciais fornecidas.
     * SIMULAÇÃO: busca no array USUARIOS do dadosSimulacao.js
     *
     * SUBSTITUIR POR:
     * const resp = await fetch('/api/auth/login', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({ usuario, senha })
     * });
     * const dados = await resp.json();
     * if (!resp.ok) throw new Error(dados.mensagem);
     * return dados;
     */
    login: async function (usuario, senha) {
        await auth_delay(600);

        var encontrado = SimDB.USUARIOS.find(function (u) {
            return u.usuario === usuario && u.senha === senha;
        });

        if (!encontrado) {
            throw new Error("Usuário ou senha incorretos.");
        }

        var sessao = {
            usuario_id: encontrado.id,
            provedor_id: encontrado.provedor_id,
            nome_provedor: encontrado.nome_provedor,
            cidade: encontrado.cidade,
            logo_inicial: encontrado.logo_inicial,
            cor: encontrado.cor,
            logado_em: new Date().toISOString()
        };

        sessionStorage.setItem(AUTH_CHAVE_SESSAO, JSON.stringify(sessao));
        return sessao;
    },

    /**
     * Encerra a sessão do usuário.
     * SUBSTITUIR POR: await fetch('/api/auth/logout', { method: 'POST' });
     */
    logout: function () {
        sessionStorage.removeItem(AUTH_CHAVE_SESSAO);
        window.location.href = "/logout";
    },

    /**
     * Retorna os dados da sessão atual ou null se não logado.
     * SUBSTITUIR POR: GET /api/auth/me com verificação do token
     */
    getSessao: function () {
        var raw = sessionStorage.getItem(AUTH_CHAVE_SESSAO);
        return raw ? JSON.parse(raw) : null;
    },

    /**
     * Verifica se há sessão ativa. Redireciona para login se não houver.
     * Chamar no início de cada página protegida.
     */
    exigirLogin: function () {
        var sessao = Auth.getSessao();
        if (!sessao) {
            window.location.href = "/login";
            return null;
        }
        return sessao;
    }

};