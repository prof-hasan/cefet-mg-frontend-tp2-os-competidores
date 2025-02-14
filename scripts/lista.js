function carregarListas(listas) {
    for(let lista of listas) {
        let $botaoAbrirMenuItens = $(".abrir-menu-item");
        $botaoAbrirMenuItens.addClass("visivel-block");
        adicionarLista(lista);
    }
}

let $botaoAbrirMenuLista = $(".controle-listas button");
$botaoAbrirMenuLista.click(abrirMenuLista);

let $botoesLista;

function adicionarLista(objeto) {
    let $containerLista = $("<button></button>");
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

    $containerLista.click(() => {
        let indice = $containerLista.index();
        listaSelecionada = indice;

        let id = sessionStorage.getItem("usuario");
        if(id) {
            let dados = JSON.parse(localStorage.getItem(id));
            let lista = dados.listas[indice].itens;

            if(lista) {
                carregarItens(lista);
            }
            else {
                let $visualizador = $(".visualizador");
                $visualizador.html("A lista está vazia!!!");
            }
        }
        else {
            let dados = JSON.parse(sessionStorage.getItem("itens"));
            carregarItens(dados);
        }
    })
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

    let id = sessionStorage.getItem("usuario");
    if(id) {
        let dados = JSON.parse(localStorage.getItem(id));
        dados.listas.push(lista);
        localStorage.setItem(id, JSON.stringify(dados));
    }

    if(semListas) {
        let $botaoAbrirMenuItens = $(".abrir-menu-item");
        $botaoAbrirMenuItens.addClass("visivel-block");
        semListas = 0;
    }

    fecharAbas();
    adicionarLista(lista);
}

let $botaoCriarLista = $(".criacao-lista > button");
$botaoCriarLista.click(criarLista);

let semListas = 1;

function carregarItens(itens) {
    let $visualizador = $(".visualizador");
    $visualizador.html("");

    for(let item of itens) {
        adicionarItem(item);
    }
}

let $botaoAbrirMenuItens = $(".abrir-menu-item");
$botaoAbrirMenuItens.click(abrirMenuItem);

let listaSelecionada = 0;

function adicionarItem(item) {
    let $containerItem = $('<div class="item-lista"></div>');

    let $imagemCategoria = $("<img>");
    $imagemCategoria.attr("src", `imagens/${item.categoria}.png`);
    $containerItem.append($imagemCategoria);

    let $capaItem = $("<img>");
    $capaItem.attr("src", item.capa);
    $containerItem.append($capaItem);

    let $containerInformacoes = $('<div class="informacoes"></div>');

    let $nomeItem = $("<h3></h3>");
    $nomeItem.html(item.titulo);
    $containerInformacoes.append($nomeItem);

    if(item.descricao != "") {
        let $descricaoItem = $('<p class="texto-descricao"></p>');
        $descricaoItem.html(item.descricao);
        $containerInformacoes.append($descricaoItem);
    }

    $containerItem.append($containerInformacoes);

    let $visualizador = $(".visualizador");

    if($visualizador.html() === "A lista está vazia!!!")
        $visualizador.html("");

    $visualizador.append($containerItem);
}

function criarItem(e) {
    let itemSelecionado = e.currentTarget;
    let $divDados = $(itemSelecionado).parent();
    
    let item = {
        categoria: $(".categoria-conteudo option:selected").val(),
        capa: $divDados.data("capa"),
        titulo: $divDados.data("titulo"),
    }

    if($divDados.data("descricao"))
        item["descricao"] = $divDados.data("descricao");


    let id = sessionStorage.getItem("usuario");
    if(id) {
        let dados = JSON.parse(localStorage.getItem(id));

        if(dados.listas[listaSelecionada].itens === undefined)
            dados.listas[listaSelecionada].itens = []

        dados.listas[listaSelecionada].itens.push(item);
        localStorage.setItem(id, JSON.stringify(dados));
    }
    else {
        let dados = JSON.parse(sessionStorage.getItem("itens"));

        if(!dados)
            sessionStorage.set("itens", JSON.stringify([]));
        else {
            dados.push(item);
            sessionStorage.setItem("itens", JSON.stringify(dados));
        }
    }

    adicionarItem(item);
}
