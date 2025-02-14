function abrirMenuLista() {
    let $menu = $(".criacao-lista");
    $menu.addClass("visivel-flex");

    $body = $("body");
    $body.addClass("fundo-visivel")
}

function abrirMenuItem() {
    let $menu = $(".criacao-item");
    $menu.addClass("visivel-flex");

    $body = $("body");
    $body.addClass("fundo-visivel")
}

function fecharAbas() {
    let $abas = $("aside");
    $abas.each(function() {
        $(this).removeClass("visivel-flex")
    })

    $body = $("body");
    $body.removeClass("fundo-visivel")
}

let $botaoFechar = $(".fechar");
$botaoFechar.click(fecharAbas)
