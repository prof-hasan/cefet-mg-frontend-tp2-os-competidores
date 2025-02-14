let $nomePerfil = $(".nome-perfil")

function carregarPerfil() {
    let id = sessionStorage.getItem("usuario");

    if(localStorage.getItem(id)) {
        let dados = JSON.parse(localStorage.getItem(id));
        $nomePerfil.html(dados.nome)

        let listas = dados.listas;
        for(let lista of listas) {
            adicionarLista(lista);
        }
    }
    else
        $nomePerfil.html("Convidado");
}

carregarPerfil();
