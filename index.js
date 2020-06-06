/* OBS: nodemon buga no json ao ser alterado, recomendando criar um arquivo:
nodemon.json com o conteúdo:
{   "ignore" : ["*.json"]   } */

//importaçoes
//const express = require("express");
const fs = require("fs").promises;
//const app = express();

//Variáveis de caminhos
const caminhoJsonEstados = "./json/Estados/";
const caminhoEstados = "./json/Estados.json";
const caminhoCidades = "./json/Cidades.json";

//Variáveis de jsons
let jsonEstados = [];
let jsonCidadesUF = [];



/** 1 - Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json,
 *  e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. 
 * O nome do arquivo deve ser o UF do estado, por exemplo: MG.json. 
 */

readWriteUFFile();

async function readWriteUFFile() {
    try {
        const dataUFs = await fs.readFile(caminhoEstados, "utf8");
        const dataCities = await fs.readFile(caminhoCidades, "utf8");

        jsonEstados = JSON.parse(dataUFs);
        jsonCidadesUF = JSON.parse(dataCities);

        //Cria os arquivos UF.json
        jsonEstados.forEach((state) => {
            let citiesState = jsonCidadesUF.filter((city) => city.Estado === state.ID);
            arquivo = caminhoJsonEstados + state.Sigla.toUpperCase() + ".json";
            fs.writeFile(arquivo, JSON.stringify(citiesState), "utf8");
        });
        
    } catch (error) {
        console.log("Erro na readWriteUFFile()!!!!");
    }
}

/** 2 - Criar um método que recebe como parâmetro o UF do estado, 
 * realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado. 
 */
/* 
ReadUFCities("MG");

async function ReadUFCities(uf){
    const caminhoSelecionado = caminhoJsonEstados + uf.toUpperCase() + ".json";
    try {
        const data = await fs.readFile(caminhoSelecionado, "utf8");
        jsonEstados = JSON.parse(data);
        return qtd


    } catch (error) {
        
    }

} */