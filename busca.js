let tabelaConcordancia = document.querySelector("#mostrar-concordancia");
let textoUsuarioEncontrado = document.querySelector("#usuarioEncontrado");

function exibirTabela(){
    tabelaConcordancia.style.display = `block`;
}

let idSalvo = ""; // Variável para armazenar o ID

function validarEntrada(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    let input = document.getElementById("idAmiguinho").value.trim();

    if (input === "") {
        alert("Por favor, digite um ID antes de continuar!");
        return false; // Não executa a função se o campo estiver vazio
    }

    idSalvo = input; // Salva o ID na variável
    textoUsuarioEncontrado.innerHTML = `Usuário ${idSalvo} encontrado:`
    exibirTabela(); // Chama a função após validação
}
