function adicionarMusica(musica) {
    let id = musica.releases[0].id;
    let srcImagem = `https://coverartarchive.org/release/${id}/front.jpg`

    let dadosArtistas = musica["artist-credit"];

    let arrayArtistas = [];

    for(let artista of dadosArtistas) {
        arrayArtistas.push(artista.name);
    }

    let tituloTexto = musica.title;
    let artistasTexto = arrayArtistas.join(" & ");

    let $containerResultados = $(".criacao-item .resultados")

    let $containerMusica = $(`<div class="resultado" data-capa="${srcImagem}" data-titulo="${tituloTexto}" data-artista="${artistasTexto}"></div>`)

    $containerMusica.append('<button class="adicionar-item">+</button>')
    $containerMusica.append(`<img src="${srcImagem}">`)

    let $containerInformacoes = $('<div class="informacoes"></div>')

    $containerInformacoes.append(`<h2>${tituloTexto}</h2>`)
    $containerInformacoes.append(`<p>${artistasTexto}</p>`)

    $containerMusica.append($containerInformacoes)

    $containerResultados.append($containerMusica)
}

function adicionarFilmeSerie(producao) {
    let srcImagem = producao.Poster;

    let tituloTexto = producao.Title;

    let $containerResultados = $(".criacao-item .resultados");

    let $containerFilmeSerie = $(`<div class="resultado" data-capa="${srcImagem}" data-titulo="${tituloTexto}"></div>`);

    $containerFilmeSerie.append('<button class="adicionar-item">+</button>')
    $containerFilmeSerie.append(`<img src="${srcImagem}">`)

    let $containerInformacoes = $('<div class="informacoes"></div>')

    $containerInformacoes.append(`<h2>${tituloTexto}</h2>`)

    $containerFilmeSerie.append($containerInformacoes)

    $containerResultados.append($containerFilmeSerie)
}

function adicionarLivro(livro) {
    let id = livro["cover_i"];
    let srcImagem = `https://covers.openlibrary.org/b/id/${id}-L.jpg`;

    let arrayAutores = livro["author_name"];

    let tituloTexto = livro.title;
    let artistasTexto = arrayAutores.join(" & ");

    let $containerResultados = $(".criacao-item .resultados");

    let $containerLivro = $(`<div class="resultado" data-capa="${srcImagem}" data-titulo="${tituloTexto}" data-autor="${artistasTexto}"></div>`)

    $containerLivro.append('<button class="adicionar-item">+</button>')
    $containerLivro.append(`<img src="${srcImagem}">`)

    let $containerInformacoes = $('<div class="informacoes"></div>')

    $containerInformacoes.append(`<h2>${tituloTexto}</h2>`)
    $containerInformacoes.append(`<p>${artistasTexto}</p>`)

    $containerLivro.append($containerInformacoes)

    $containerResultados.append($containerLivro)
}

function adicionarJogo(jogo) {
    let srcImagem = jogo["background_image"];

    let tituloTexto = jogo.name;

    let $containerResultados = $(".criacao-item .resultados");

    let $containerJogo = $(`<div class="resultado" data-capa="${srcImagem}" data-titulo="${tituloTexto}"></div>`)

    $containerJogo.append('<button class="adicionar-item">+</button>')
    $containerJogo.append(`<img src="${srcImagem}">`)

    let $containerInformacoes = $('<div class="informacoes"></div>')

    $containerInformacoes.append(`<h2>${tituloTexto}</h2>`)

    $containerJogo.append($containerInformacoes)

    $containerResultados.append($containerJogo)
}

async function buscarMusica(nome, artista) {
    let url;
    
    if(artista != "")
        url = `https://musicbrainz.org/ws/2/recording/?query=recording:"${nome}*" AND artist:"${artista}*" AND status:official&fmt=json&limit=5`
    else
        url = `https://musicbrainz.org/ws/2/recording/?query=recording:"${nome}*" AND status:official&fmt=json&limit=5`

    try {
        const resposta = await fetch(url)
        const dados = await resposta.json();

        let $containerResultados = $(".criacao-item .resultados")
        $containerResultados.html("");
        
        let resultados = dados.recordings;
        for(let musica of resultados)
            adicionarMusica(musica);
    }
    catch {

    }
}

async function buscarFilmeSerie(nome) {
    let url = `https://omdb-api.jeanmailforcoding.workers.dev?search=${nome}`

    try {
        const resposta = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        const dados = await resposta.json();

        let $containerResultados = $(".criacao-item .resultados")
        $containerResultados.html("");

        resultados = dados.Search.slice(0, 5);

        for(let producao of resultados)
            adicionarFilmeSerie(producao);
    }
    catch {

    }
}

async function buscarLivro(nome, autor) {
    let url;

    if(autor != "")
        url = `https://openlibrary.org/search.json?title=${nome}&author=${autor}&limit=5`
    else
        url = `https://openlibrary.org/search.json?title=${nome}&limit=5`

    try {
        const resposta = await fetch(url)
        const dados = await resposta.json();

        let $containerResultados = $(".criacao-item .resultados")
        $containerResultados.html("");
        
        let resultados = dados.docs;
        for(let livro of resultados)
            adicionarLivro(livro);
    }
    catch {

    }
}

async function buscarJogo(nome) {
    let url = `https://rawg-api.jeanmailforcoding.workers.dev?search=${nome}`

    try {
        const resposta = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        const dados = await resposta.json();

        let $containerResultados = $(".criacao-item .resultados")
        $containerResultados.html("");

        let resultados = dados.results
        
        for(let jogo of resultados)
            adicionarJogo(jogo);
    }
    catch {

    }
}

async function pesquisarFilmeSerie() {
    let $inputFilmeSerie = $(".input-filme-serie")
    let nomeFilmeSerie = $inputFilmeSerie.val();

    await buscarFilmeSerie(nomeFilmeSerie);
}

let $botaoPesquisarFilmeSerie = $(".filme-serie button");
$botaoPesquisarFilmeSerie.click(pesquisarFilmeSerie);

async function pesquisarMusica() {
    let $inputMusica = $(".input-musica")
    let nomeMusica = $inputMusica.val();

    let $inputArtista = $(".input-artista")
    let artistaMusica = $inputArtista.val();

    await buscarMusica(nomeMusica, artistaMusica);
}

let $botaoPesquisarMusica = $(".musica button");
$botaoPesquisarMusica.click(pesquisarMusica);

async function pesquisarLivro() {
    let $inputLivro = $(".input-livro")
    let nomeLivro = $inputLivro.val();

    let $inputAutor = $(".input-autor")
    let autorLivro = $inputAutor.val();

    await buscarLivro(nomeLivro, autorLivro);
}

let $botaoPesquisarLivro = $(".livro button");
$botaoPesquisarLivro.click(pesquisarLivro);

async function pesquisarJogo() {
    let $inputJogo = $(".input-jogo")
    let nomeJogo = $inputJogo.val();

    await buscarJogo(nomeJogo);
}

let $botaoPesquisarJogo = $(".jogo button");
$botaoPesquisarJogo.click(pesquisarJogo);
