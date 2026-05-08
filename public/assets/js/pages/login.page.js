/**
 * login.page.js
 * Controller da tela de login.
 */

window.addEventListener("DOMContentLoaded", function () {

    const inputUsuario =
        document.getElementById("usuario");

    const inputSenha =
        document.getElementById("senha");

    const btnLogin =
        document.getElementById("btn-login");

    const divErro =
        document.getElementById("login-erro");

    if (Auth.getSessao()) {

        window.location.href = "/home";

        return;
    }

    async function tentarLogin() {

        const usuario =
            inputUsuario.value.trim();

        const senha =
            inputSenha.value.trim();

        divErro.textContent = "";

        if (!usuario || !senha) {

            divErro.textContent =
                "Preencha usuário e senha.";

            return;
        }

        btnLogin.disabled = true;

        btnLogin.textContent = "Entrando...";

        try {

            await Auth.login(
                usuario,
                senha
            );

            window.location.href = "/home";

        } catch (err) {

            divErro.textContent = err.message;

            btnLogin.disabled = false;

            btnLogin.textContent = "Entrar";

        }

    }

    btnLogin.addEventListener(
        "click",
        tentarLogin
    );

    [inputUsuario, inputSenha]
        .forEach((inp) => {

            inp.addEventListener(
                "keydown",
                (e) => {

                    if (e.key === "Enter") {

                        tentarLogin();

                    }

                }
            );

        });

});