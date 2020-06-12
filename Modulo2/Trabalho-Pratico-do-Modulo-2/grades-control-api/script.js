'use strict';

const fs = require('fs').promises;

const { readFile, writeFile } = fs;

let cidades = null, estados = null;
let arquivos = './arquivos';

const init = async () => {
    // Ler dados
    cidades = JSON.parse(await readFile('./data/Cidades.json', 'utf8'));
    estados = JSON.parse(await readFile('./data/Estados.json', 'utf8'));

    // Criar arquivos .json por estados na pasta arquivo
    estados.forEach(e => {
        const cidadeEstado = cidades.filter(c => c.Estado === e.ID);
        writeFile(`${arquivos}/${e.Sigla}.json`, JSON.stringify(cidadeEstado));
    });
}

const carregarArquivos = async (sigla) => {
    return JSON.parse(await readFile(`${arquivos}/${sigla}.json`, 'utf8'));
}

const lerAquivoEstado = async (sigla) => {
    let cidades = await carregarArquivos(sigla);
    return cidades.length;
}

const contaCidades = async () => {
    let quantidades = [];

    await Promise.all(estados.map(async (e) => {
        // Retorna o quantidades de cidades
        let qtd = await lerAquivoEstado(e.Sigla);
        // Cria objeto
        let estadoObj = {
            Sigla: e.Sigla,
            Quantidade: qtd
        };

        quantidades.push(estadoObj);
    }));

    return quantidades;
}

// Função para retonar os cincos estado com a maior quantidades de cidades por estado em ordem decrescente
const ordemCincoMaiorUF = async (listaEstado) => {

    let listaAtualizada = [];
    let listaOrdenada = listaEstado.sort((a, b) => b.Quantidade - a.Quantidade).slice(0, 5);

    listaOrdenada.forEach(a => {
        listaAtualizada.push(`${a.Sigla} - ${a.Quantidade}`);
    })

    console.log('Atividades 3:');
    console.log(listaAtualizada);
}

// Função para retonar os cincos estado com a menor quantidades de cidades por estado em ordem decrescente
const ordemCincoMenorUF = async (listaEstado) => {

    let listaAtualizada = [];
    let listaOrdenada = listaEstado.sort((a, b) => a.Quantidade - b.Quantidade).slice(0, 5).sort((a, b) => b.Quantidade - a.Quantidade);

    listaOrdenada.forEach(a => {
        listaAtualizada.push(`${a.Sigla} - ${a.Quantidade}`);
    })

    console.log('Atividades 4:');
    console.log(listaAtualizada);
}

//-------
const cidadeDeMaiorNomeUF = async (sigla) => {
    let cidades = await carregarArquivos(sigla);

    cidades.sort((a, b) => a.Nome.localeCompare(b.Nome)).sort((a, b) => b.Nome.length - a.Nome.length);

    const maioresNomes = { Sigla: sigla, ...cidades[0] };

    return maioresNomes;
}

const cidadeDeMenorNomeUF = async (sigla) => {
    let cidades = await carregarArquivos(sigla);

    cidades.sort((a, b) => a.Nome.localeCompare(b.Nome)).sort((a, b) => a.Nome.length - b.Nome.length);

    const menoresNomes = { Sigla: sigla, ...cidades[0] };

    return menoresNomes;
}

const obterMaior = async () => {

    let ufs = [], nomes = [];

    await Promise.all(estados.map(async (e) => {
        let cidades = await cidadeDeMaiorNomeUF(e.Sigla);
        ufs.push(cidades);
    }));

    ufs.sort((a, b) => a.Sigla.localeCompare(b.Sigla)).forEach(e => {
        nomes.push(`${e.Nome} - ${e.Sigla}`);
    });

    console.log("5: ");
    console.log(nomes);
}

const obterMenor = async () => {

    let ufs = [], nomes = [];

    await Promise.all(estados.map(async (e) => {
        let cidades = await cidadeDeMenorNomeUF(e.Sigla);
        ufs.push(cidades);
    }));

    ufs.sort((a, b) => a.Sigla.localeCompare(b.Sigla)).forEach(e => {
        nomes.push(`${e.Nome} - ${e.Sigla}`);
    });

    console.log("6: ");
    console.log(nomes);
}

const obterCidadeDeMaiorNome = async () => {

    let cidadesMaior = await cidades.sort((a, b) => a.Nome.localeCompare(b.Nome)).sort((a, b) => b.Nome.length - a.Nome.length)[0];
    let estadoCidade = await estados.find(e => e.ID === cidadesMaior.Estado);

    console.log("7:");
    console.log(`${cidadesMaior.Nome} - ${estadoCidade.Sigla}`)
}

const obterCidadeDeMenorNome = async () => {

    let cidadesMenor = await cidades.sort((a, b) => a.Nome.localeCompare(b.Nome)).sort((a, b) => a.Nome.length - b.Nome.length)[0];
    let estadoCidade = await estados.find(e => e.ID === cidadesMenor.Estado);

    console.log("8:");
    console.log(`${cidadesMenor.Nome} - ${estadoCidade.Sigla}`)
}

init().then(async () => {
    let listaEstado = await contaCidades();
    ordemCincoMaiorUF(listaEstado);
    ordemCincoMenorUF(listaEstado);
    await obterMaior();
    await obterMenor();
    obterCidadeDeMaiorNome();
    obterCidadeDeMenorNome();
});