function abrirMenuLista() {
    let $menu = $(".criacao-lista");
    $menu.addClass("visivel-flex");

    $body = $("body");
    $body.addClass("fundo-visivel")
}

let $botaoAbrirMenuLista = $(".container-listas button");
$botaoAbrirMenuLista.click(abrirMenuLista);

function adicionarLista(objeto) {
    let $containerLista = $("<div></div>");
    $containerLista.css("border-left", `8px solid ${objeto.cor}`);

    let $nomeLista = $("<h3></h3>");
    $nomeLista.html(`${objeto.nome}`);
    $containerLista.append($nomeLista);

    if(objeto.descricao != "") {
        let $descricaoLista = $('<p class="texto-descricao"></p>');
        $descricaoLista.html(objeto.descricao);
        $containerLista.append($descricaoLista);
    }

    let $selecaoListas = $(".selecao-listas");
    $selecaoListas.append($containerLista);
}

function criarLista() {
    let $inputNome = $(".nome-lista");
    let $inputDescricao = $(".descricao-lista");
    let $inputCor = $(".cor-lista");

    let lista = {
        nome: $inputNome.val().trim(),
        descricao: $inputDescricao.val().trim(),
        cor: $inputCor.val()
    }

    console.log(lista)

    let id = sessionStorage.getItem("usuario");
    if(id) {
        let dados = JSON.parse(localStorage.getItem(id));
        dados.listas.push(lista);
        localStorage.setItem(id, JSON.stringify(dados));
    }

    adicionarLista(lista);
}

let $botaoCriarLista = $(".criacao-lista > button")
$botaoCriarLista.click(criarLista);
