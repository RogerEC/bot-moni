const express = require('express');
require('dotenv/config');

const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

// Conexão com o banco de dados
const mysql = require('mysql');
const conexao = mysql.createConnection({
    host     : process.env.HOST_MYSQL,
    port     : process.env.PORT_MYSQL,
    user     : process.env.USER_MYSQL,
    password : process.env.PASSWORD_MYSQL,
    database : process.env.DATABASE_MYSQL,
});

const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();  

client.login(process.env.TOKEN_BOT);

client.on("ready", () => {
    console.log('pronto');
})

client.on("message", mensagem => {
    if(mensagem.channel.type == "dm") return;
    if(mensagem.author.bot) return;
    if(!mensagem.content.toLocaleLowerCase().startsWith(config.prefix)) return;
    if(mensagem.content.startsWith(`<@!${client.user.id}>`) || mensagem.content.startsWith(`<@${client.user.id}>`)) return;
    
    const argumentos = mensagem.content.toLocaleLowerCase().substring(config.prefix.length).trim().split(/ +/g);
    if(argumentos[0]=='')
        argumentos[0]="ajuda";
    if(eh_disciplina(argumentos[0]))
        argumentos.unshift("info-geral");
    mensagem.content.indexOf
    console.log(argumentos);
});

function eh_disciplina(codigo="aaa"){
    if(codigo.length != 7)
        return false;
    conexao.connect();
    conexao.query(`SELECT ID_DISCIPLINA FROM MONI_DISCIPLINA WHERE CODIGO = '${codigo.toUpperCase()}'`, function(error, results, fields){
        if(error) throw error;/*{
            conexao.end();
            console.log('aquiii');
            return false;
        }*/
        console.log(results);
        conexao.end();
    });
}
