let $nomePerfil = $(".nome-perfil")

function carregarPerfil() {
    let id = sessionStorage.getItem("usuario");

    if(localStorage.getItem(id)) {
        let dados = JSON.parse(localStorage.getItem(id));
        $nomePerfil.html(dados.nome)

        let listas = dados.listas;
        carregarListas(listas)

        if(listas[listaSelecionada].itens)
            carregarItens(listas[listaSelecionada].itens);
    }
    else {
        sessionStorage.setItem("itens", JSON.stringify([]))
        $nomePerfil.html("Convidado");
    }
}

carregarPerfil();
