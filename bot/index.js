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

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.login(process.env.TOKEN_BOT); //Ligando o Bot caso ele consiga acessar o token

client.on("ready", () => {
    console.log('pronto');
})

client.on("message", msg => {
    console.log(msg.content);
    console.log(msg.author);
    if(msg.content === "teste"){
        msg.reply("O teste funcionou!");
    }
})

const mysql = require('mysql');
const conexao = mysql.createConnection({
    host     : process.env.HOST_MYSQL,
    port     : process.env.PORT_MYSQL,
    user     : process.env.USER_MYSQL,
    password : process.env.PASSWORD_MYSQL,
    database : process.env.DATABASE_MYSQL,
});

conexao.connect(function(err){
    if(err) return console.log(err);
    console.log("conectou!");
});

// Teste inicial
/*const Discord = require('discord.js');

const bot = new Discord.Client();

const token = '';

bot.login(token);

bot.on("ready", () => {
    console.log('pronto');
})

bot.on("message", msg => {
    if(msg.content === "teste"){
        msg.reply("O teste funcionou!");
    }
})*/