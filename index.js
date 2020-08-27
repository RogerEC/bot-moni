const Discord = require('discord.js');

const bot = new Discord.Client();

const token = 'NzQ4NDEwMDY0ODUwNjQ5MTI4.X0dBMA.HcUBs4TrkvfkbW0Sl0uuSRMXA6E';

bot.login(token);

bot.on("ready", () => {
    console.log('pronto');
})

bot.on("message", msg => {
    if(msg.content === "teste"){
        msg.reply("O teste funcionou!");
    }
})