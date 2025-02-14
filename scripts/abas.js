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
