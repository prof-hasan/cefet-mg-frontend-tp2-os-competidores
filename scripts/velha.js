let $botoesVelha = $(".jogo button")

let turno = 0;
let velha = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
]

function mostrarVencedor(id) {
    if(id === 0)
        console.log("KSDHIKUAHDKUSAHDA");
    else if(id === 1)
        console.log("OIADHDSDSAG");
}

function testarVelha() {
    for(let i = 0; i < velha.length; i++) {
        for(let j = 0; j < velha[i].length - 2; j++) {
            if(velha[i][j] === velha[i][j + 1] && velha[i][j + 1] === velha[i][j + 2] && velha[i][j] === 0)
                mostrarVencedor(0);
            else if(velha[i][j] === velha[i][j + 1] && velha[i][j + 1] === velha[i][j + 2] && velha[i][j] === 1)
                mostrarVencedor(1);
        }
    }

    for(let i = 0; i < velha.length - 2; i++) {
        for(let j = 0; j < velha[i].length; j++) {
            if(velha[i][j] === velha[i + 1][j] && velha[i + 1][j] === velha[i + 2][j] && velha[i][j] === 0)
                mostrarVencedor(0);
            else if(velha[i][j] === velha[i + 1][j] && velha[i + 1][j] === velha[i + 2][j] && velha[i][j] === 1)
                mostrarVencedor(1);
        }
    }

    for(let i = 0; i < velha.length - 2; i++) {
        for(let j = 0; j < velha[i].length - 2; j++) {
            if(velha[i][j] === velha[i + 1][j + 1] && velha[i + 1][j + 1] === velha[i + 2][j + 2] && velha[i][j] === 0)
                mostrarVencedor(0);
            else if(velha[i][j] === velha[i + 1][j + 1] && velha[i + 1][j + 1] === velha[i + 2][j + 2] && velha[i][j] === 1)
                mostrarVencedor(1);
        }
    }
    
    for(let i = 0; i < velha.length - 2; i++) {
        for(let j = 0; j < velha[i].length - 2; j++) {
            if(velha[i][j + 2] === velha[i + 1][j + 1] && velha[i + 1][j + 1] === velha[i + 2][j] && velha[i][j + 2] === 0)
                mostrarVencedor(0);
            else if(velha[i][j + 2] === velha[i + 1][j + 1] && velha[i + 1][j + 1] === velha[i + 2][j] && velha[i][j + 2] === 1)
                mostrarVencedor(1);
        }
    }
}

function carregarVelha() {
    $botoesVelha = $(".jogo button")

    for(let i = 0; i < velha.length; i++) {
        for(let j = 0; j < velha[i].length; j++) {
            if(velha[i][j] === -1)
                $botoesVelha[i * velha[i].length + j].html("");
            else if(velha[i][j] === 0)
                $botoesVelha[i * velha[i].length + j].html("O");
            else if(velha[i][j] === 1)
                $botoesVelha[i * velha[i].length + j].html("X");
        }
    }
}

function alterarVelha(e, num) {
    let botaoClicado = e.currentTarget;
    let casa = $(botaoClicado).data("casa");
    let linha = Math.floor(casa / velha[0].length);
    let coluna = Math.floor(casa % velha[0].length);
    
    if(botaoClicado.innerHTML === "") {
        if(num === 0) {
            velha[linha][coluna] = 0;
            $(botaoClicado).html("O");
        }
        else if(num === 1) {
            velha[linha][coluna] = 1;
            $(botaoClicado).html("X");
        }

        return 1;
    }
    
    return 0;
}

function passarTurno() {
    if(turno === 0)
        turno = 1;
    else
        turno = 0;
}

$botoesVelha.click((e) => {
    let alterado = alterarVelha(e, turno);

    if(alterado)
        passarTurno();

    testarVelha();
});
