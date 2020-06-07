/* OBS: nodemon buga no json ao ser alterado, recomendando criar um arquivo:
nodemon.json com o conteúdo:
{   "ignore" : ["*.json"]   } */

//importaçoes
//const express = require("express"); //express é para requições http
//const fs = require("fs").promises; //Caso queira mexer com promises
//const app = express();
const fs = require("fs");

//Variáveis de caminhos
const caminhoJsonEstados = "./json/Estados/";
const caminhoEstados = "./json/Estados.json";
const caminhoCidades = "./json/Cidades.json";

//Variáveis de jsons
let jsonEstados = []; //Armazena todos os Estados do arquivo estados.json
let jsonCidadesUF = []; //Armazena todas as cidades do arquivo cidades.json

//Variáveis auxiliares
let listaCidadesEstado = [];
let biggerCitties = [];
let smallerCitties = [];


//Exercicio 1
readWriteUFFile();

//Exercicio 2
console.log("\nExercicio 2 - Qtd de cidades do estado selecionado:");
const uf = "MG"
const x = ReadUFCities(uf);
console.log("Estado: " + uf + "    QTD Cidades: " + x);

//Exercicio 3
console.log("\nExercicio 3 - 6 Estados com MAIS cidades em ordem decrescente: ");
biggerUFs();

//Exercicio 4
console.log("\nExercicio 4 - 6 Estados com MENOS cidades em ordem decrescente:");
smallerUFs();

//Exercicio 5
console.log("\nExercicio 5 - Cidade com mais letras de cada estado:");
countBiggerCitties();

//Exercicio 6
console.log("\nExercicio 6 - Cidade com menos letras de cada estado:");
countSmallerCitties();

//Exercicio 7
console.log("\nExercicio 7 - Cidade de MAIOR nome do Brasil:");
biggerNameBrasil();

//Exercicio 8
console.log("\nExercicio 8 - Cidade de MENOR nome do Brasil:");
smallerNameBrasil();



/** 1 - Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json,
 *  e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. 
 * O nome do arquivo deve ser o UF do estado, por exemplo: MG.json. 
 */
function readWriteUFFile() {
    try {
        const dataUFs = fs.readFileSync(caminhoEstados, "utf8");
        const dataCities = fs.readFileSync(caminhoCidades, "utf8");

        jsonEstados = JSON.parse(dataUFs);
        jsonCidadesUF = JSON.parse(dataCities).map((city) => {
            const {
                ID,
                Nome,
                Estado
            } = city;
            return {
                ID: ID,
                Nome: Nome,
                Estado: Estado,
                QtdeLetras: Nome.length,
            };
        });

        //Cria os arquivos UF.json com as cidades de cada estado dentro do arquivo do estado
        jsonEstados.forEach((state) => {
            let citiesState = jsonCidadesUF.filter((city) => city.Estado === state.ID);
            arquivo = caminhoJsonEstados + state.Sigla.toUpperCase() + ".json";
            fs.writeFileSync(arquivo, JSON.stringify(citiesState), "utf8");
        });
        //console.log("Arquivos de estados criados com sucesso!");
    } catch (error) {
        console.log("Erro Exercicio 1");
    }
}

/** 2 - Criar um método que recebe como parâmetro o UF do estado, 
 * realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado. 
 */
function ReadUFCities(uf) {
    const caminhoSelecionado = caminhoJsonEstados + uf.toUpperCase() + ".json";
    let selectedUF = [];
    try {
        data = fs.readFileSync(caminhoSelecionado, 'utf8');
        selectedUF = JSON.parse(data);
        return selectedUF.length;
    } catch (err) {
        console.error("Erro Exercicio 2");
    }
}


/** 3 - Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, 
 * seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. 
 * Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
 */
function biggerUFs() {
    jsonEstados.forEach((state) => {
        listaCidadesEstado.push(`${state.Sigla} - ${ReadUFCities(state.Sigla)}`);
    });

    let sorted = listaCidadesEstado.sort(decrescenta); // Deixa os numeros em ordem decrescente
    console.log(sorted.slice(0, 6).toString());
}

function decrescenta(a, b) {
    let x = a.split(" - ");
    let y = b.split(" - ");
    return y[1] - x[1];
}

/** 4 - Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, 
 * seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. 
 * Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
 */
function smallerUFs() {
    let ultimosLista = listaCidadesEstado.slice(listaCidadesEstado.length - 6, listaCidadesEstado.length);
    console.log(ultimosLista.toString());
}

/** 5 - Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. 
 * Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. 
 * Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
 */

function countBiggerCitties() {
    let citiesState = [];
    jsonEstados.forEach((state) => {
        citiesState = jsonCidadesUF
            .filter((city) => city.Estado === state.ID)
            .sort(decrescentaLetras);
        const qtdeLetras = citiesState[0].Nome.length;

        const citiesState2 = citiesState
            .filter((city) => city.Nome.length === qtdeLetras);

        const citiesState3 = citiesState2.sort()[0];

        console.log(`${citiesState3.Nome} - ${state.Sigla}`);
        biggerCitties.push(`${citiesState3.Nome} - ${state.Sigla}`)
    });

}

function decrescentaLetras(a, b) {
    if (a.QtdeLetras < b.QtdeLetras)
        return 1;
    else if (b.QtdeLetras < a.QtdeLetras)
        return -1;
    else return 0;
}

/** 6 - Criar um método que imprima no console um array com a cidade de menor nome de cada estado, seguida de seu UF. 
 * Em caso de empate, considerar a ordem alfabética para ordená-los e então retorne o primeiro. 
 * Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
 */
function countSmallerCitties() {
    let citiesState = [];
    jsonEstados.forEach((state) => {
        citiesState = jsonCidadesUF
            .filter((city) => city.Estado === state.ID)
            .sort(letrasCrescentes);
        const qtdeLetras = citiesState[0].Nome.length;

        const citiesState2 = citiesState
            .filter((city) => city.Nome.length === qtdeLetras);

        const citiesState3 = citiesState2.sort()[0];

        console.log(`${citiesState3.Nome} - ${state.Sigla}`);
        smallerCitties.push(`${citiesState3.Nome} - ${state.Sigla}`)
    });

}

function letrasCrescentes(a, b) {
    if (a.QtdeLetras < b.QtdeLetras)
        return -1;
    else if (b.QtdeLetras < a.QtdeLetras)
        return 1;
    else return 0;
}

/** 7 - Criar um método que imprima no console a cidade de maior nome entre todos os estados, seguido do seu UF. 
 * Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. 
 * Exemplo: “Nome da Cidade - UF".
 */
function biggerNameBrasil() {
    let x = biggerCitties.reduce(function (atual, proximo) {
        return atual.length > proximo.length ? atual : proximo;
      });
    console.log(x);
}


/** 8 - Criar um método que imprima no console a cidade de menor nome entre todos os estados, seguido do seu UF. 
 * Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. 
 * Exemplo: “Nome da Cidade - UF".
 */

function smallerNameBrasil() {
    let x = smallerCitties
    .sort()
    .reduce(function (atual, proximo) {
        return atual.length > proximo.length ? proximo : atual;
      });
    console.log(x);
}