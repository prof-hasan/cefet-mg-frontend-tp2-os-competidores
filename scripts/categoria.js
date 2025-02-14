let $imagemCategoria = $(".categoria-conteudo img")

function alterarImagem(categoria) {
    $imagemCategoria.attr("src", `imagens/${categoria}.png`);
}

function alterarPesquisa(categoria) {
    let $containeresPesquisa = $(".pesquisa");
    $containeresPesquisa.each(function() {
        $(this).removeClass("visivel-flex")
    });

    let $containerSelecao = $(`.${categoria}`);
    $containerSelecao.addClass("visivel-flex");
}

function alterarCategoria() {
    let $opcaoSelecionada = $(".categoria-conteudo option:selected");
    let categoria = $opcaoSelecionada.val();

    alterarImagem(categoria);
    alterarPesquisa(categoria);
}

let $selectCategoria = $(".categoria-conteudo select");
$selectCategoria.change(alterarCategoria);

document.addEventListener("DOMContentLoaded", alterarCategoria)
