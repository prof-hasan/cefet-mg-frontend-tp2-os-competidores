function cadastrar() {
    const nome = document.querySelector("#nome").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    if (!nome || !senha) {
        mostrarMensagem("Preencha todos os campos!", "error");
        return;
    }

    const id = nome.toLowerCase().replace(/\s+/g, "_");

    if(localStorage.getItem(id)) {
        mostrarMensagem("Usuário já existe! Tente outro nome.", "error");
        return;
    }

    const usuario = {
        nome: nome, 
        senha: senha,
        listas: []
    };

    localStorage.setItem(id, JSON.stringify(usuario));
    sessionStorage.setItem("usuario", id);

    mostrarMensagem("Registro realizado com sucesso! Redirecionando para o login...", "success");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
}

function login() {
    const nome = document.querySelector("#nome").value.trim();
    const senha = document.querySelector("#senha").value.trim();

    if (!nome || !senha) {
        mostrarMensagem("Preencha todos os campos!", "error");
        return;
    }

    const id = nome.toLowerCase().replace(/\s+/g, "_");
    const dados = localStorage.getItem(id);

    if (!dados) {
        mostrarMensagem("Usuário não encontrado! Registre-se primeiro.", "error");
        return;
    }

    const usuario = JSON.parse(dados);

    if (usuario.senha === senha) {
        sessionStorage.setItem("usuario", id); // Salva o ID do usuário logado
        mostrarMensagem(`Bem-vindo, ${usuario.nome}!`, "success");
        setTimeout(() => {
            window.location.href = "index.html"; // Redireciona para a página principal
        }, 2000);
    } else {
        mostrarMensagem("Senha incorreta!", "error");
    }
}

function mostrarMensagem(msg, tipo) {
    const mensagemDiv = document.querySelector("#mensagem");
    mensagemDiv.textContent = msg;
    mensagemDiv.className = `message ${tipo}`;
}

let $botaoEntrar = $("#login")
$botaoEntrar.click(login);

let $botaoCadastrar = $("#cadastrar")
$botaoCadastrar.click(cadastrar)
