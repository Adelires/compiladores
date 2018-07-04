
var tabela = {
    S: {
        a: ['a', 'C', 'A'],
        c: ['c', 'B', 'b']
    },
    A: {
        a: ['3'],
        b: ['b', 'C', 'a'],
        c: ['3'],
        d: ['3'],
        $: ['3']
    },
    B: {
        a: ['a', 'A', 'c'],
        b: ['b', 'C', 'c']
    },
    C: {
        a: ['a'],
        b: ['b', 'B'],
        c: ['c', 'A', 'a']
    },

}


var entrada = "";
var pilha = "";



$(document).ready(function () {
    $('#sentenca').keyup(function () {
        entrada = this.value;
        $("#iniciar").attr('disabled', false);
    });

    $("#switch-id").change(function () {
        if ($(this).is(":checked")) {
            $('#iniciar').text("Proximo ->").attr("onclick", "iniciarVerificacaoPassoaPasso()");
        } else {
            $('#iniciar').text("Iniciar").attr("onclick", "iniciarVerificacao()");
        }
    });

})

ultimaEntrada = '';
cont_entrada = 0;
quant_linhas = 1;

function iniciarVerificacaoPassoaPasso() {

    entradaString = $("#sentenca").val();
    if (ultimaEntrada != entradaString) {
        ultimaEntrada = entradaString;
        $('#monta_tabela').html('');
        pilha = ["$", "S"];
        acao = "";
        entrada = (entradaString + '$').split('');
        cont_entrada = entrada.length;
        console.log("cont entrada -> " + cont_entrada);
        quant_linhas = 1;
    } else if (cont_entrada == 0) {
        return;
    }


    var topo_da_pilha = pilha[pilha.length - 1];
    var simbolo_atual = entrada[0];
    var entrada_atual = entrada.join("");
    var pilha_atual = pilha.join("");
    console.log(topo_da_pilha);
    console.log(entrada[0]);
    acao = "";

    if (topo_da_pilha === "$" && entrada_atual === "$") {
        acao = "Aceito em " + quant_linhas + " iterações.";

        cont_entrada = 0;
    } else if (simbolo_atual === topo_da_pilha) {
        console.log("entro no if de ler");
        pilha.pop();
        acao = "Ler " + simbolo_atual;

        console.log("ler -> " + acao);

        cont_entrada -= 1;
        entrada.shift();
        console.log("cont entrada -> " + cont_entrada);

    } else if (tabela[topo_da_pilha] != undefined && tabela[topo_da_pilha][simbolo_atual] != undefined) {
        var producao = tabela[topo_da_pilha][simbolo_atual]; // verifica se o simbolo topo da pilha tem a variavel da entrada
        console.log("aeeee tem !!");
        acao = topo_da_pilha + "::=" + producao.join(""); // S::= cBb
        console.log("acao =" + acao);
        pilha.pop();

        if (producao.join("") !== "3") {
            for (var j = producao.length - 1; j >= 0; j--) {
                console.log("contrario = " + producao[j]);
                pilha.push(producao[j]);
            }
        }


        console.log(pilha);
    } else {
        console.log("erro");
        acao = "Erro em " + quant_linhas + " iterações.";
        cont_entrada = 0;
    }


    $('#monta_tabela').append("<tr><td>" + quant_linhas + "</td><td>" + pilha_atual + "</td><td>" + entrada_atual + "</td><td>" + acao + "</td></tr>")
    quant_linhas++;


}


function iniciarVerificacao() {

    entrada = $("#sentenca").val();
    $('#monta_tabela').html('');
    pilha = ["$", "S"];
    var acao = "";
    entrada = (entrada + '$').split('');
    var cont_entrada = entrada.length;
    console.log("cont entrada -> " + cont_entrada);
    var quant_linhas = 1;

    //for(var i=0; i<entrada.length; i++)
    while (cont_entrada) {
        console.log("while");
        var topo_da_pilha = pilha[pilha.length - 1];
        var simbolo_atual = entrada[0];
        var entrada_atual = entrada.join("");
        var pilha_atual = pilha.join("");
        console.log(topo_da_pilha);
        console.log(entrada[0]);
        acao = "";

        if (topo_da_pilha === "$" && entrada_atual === "$") {
            acao = "Aceito em " + quant_linhas + " iterações.";

            cont_entrada = 0;
        } else if (simbolo_atual === topo_da_pilha) {
            console.log("entro no if de ler");
            pilha.pop();
            acao = "Ler " + simbolo_atual;

            console.log("ler -> " + acao);

            cont_entrada -= 1;
            entrada.shift();
            console.log("cont entrada -> " + cont_entrada);

        } else if (tabela[topo_da_pilha] != undefined && tabela[topo_da_pilha][simbolo_atual] != undefined) {
            var producao = tabela[topo_da_pilha][simbolo_atual]; // verifica se o simbolo topo da pilha tem a variavel da entrada
            console.log("aeeee tem !!");
            acao = topo_da_pilha + "::=" + producao.join(""); // S::= cBb
            console.log("acao =" + acao);
            pilha.pop();

            if (producao.join("") != '3') {
                for (var j = producao.length - 1; j >= 0; j--) {
                    console.log("contrario = " + producao[j]);
                    pilha.push(producao[j]);
                }
            }



            console.log(pilha);
        } else {
            console.log("erro");
            acao = "Erro em " + quant_linhas + " iterações.";
            cont_entrada = 0;
        }


        $('#monta_tabela').append("<tr><td>" + quant_linhas + "</td><td>" + pilha_atual + "</td><td>" + entrada_atual + "</td><td>" + acao + "</td></tr>")
        quant_linhas++;

    }
}

function limpar() {
    entrada = "";
    pilha = "";
    $('#monta_tabela').html('');
    $("#sentenca").val("");
    ultimaEntrada = '';
    cont_entrada = 0;
    quant_linhas = 1;

}

function gerarSentenca() {
    var gramatica = {
        'S': ['cBb', 'aCA'],
        'A': ['bCa', ''],
        'B': ['aAc', 'bCc'],
        'C': ['bB', 'a', 'cAa']
    }

    var estadoAtual = "S";
    var sentenca = "";

    var contMaiuscula = 1;

    console.log(estadoAtual);


    var parar = false;
    while (!parar) {

        var tamanho = (gramatica[estadoAtual + ''].length);
        console.log(tamanho);
        var random = Math.floor((Math.random() * tamanho) + 0);
        var producaoAtual = (gramatica[estadoAtual + ''][random]);

        sentenca = sentenca == "" ? producaoAtual : sentenca.replace(estadoAtual, producaoAtual);

        console.log("sentenca->" + sentenca);

        for (var i = 0; i < sentenca.length; i++) {
            if (sentenca.charCodeAt(i) >= 65 && sentenca.charCodeAt(i) <= 90) {
                console.log('M - ', sentenca[i]);
                estadoAtual = sentenca[i];
                break;
            }
            if (i == sentenca.length - 1) {
                parar = true;
            }
        }
    }

    $('#sentenca').val(sentenca).keyup();

}








