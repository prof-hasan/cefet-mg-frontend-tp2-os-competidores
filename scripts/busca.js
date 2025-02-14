let $inputUsuario = $("#idAmigo");
let $botaoChecarConcordancia = $("form button")

function calcularConcordancia() {
    let nomeUsuario = $inputUsuario.val();
    let listaUsuariosStr = localStorage.getItem("usuarios");
    let listaUsuarios = JSON.parse(listaUsuariosStr);

    let $tituloUsuario = $(".concordancia > h2");
    let $porcentagemConcordancia = $(".porcentagem-match");

    for(let usuario of listaUsuarios) {
        if(usuario.nome === nomeUsuario) {
            console.log("legal")
        }
    }

    $tituloUsuario.html("Usuário não encontrado");
    $porcentagemConcordancia.html("-");
}

if(!localStorage.getItem("usuarios"))
    localStorage.setItem("usuarios", "[]");

$botaoChecarConcordancia.click(calcularConcordancia);
