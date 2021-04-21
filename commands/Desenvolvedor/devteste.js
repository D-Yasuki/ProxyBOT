const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

module.exports = {

    config: {
        name: "teste",
        aliases: ["t", "test"],
        usage: "\u200B",
        category: "Desenvolvedor",       
        description: "Comando utilizado para testar uma função em desenvolvimento.",
        noalias: "Sem variável",
        accessable: "Desenvolvedores.",
        blocked: "Todos."
    },

    run: async (bot, message, args) => {

    if(message.author.id != "395661632820346902" & message.author.id != "484550060307382282" & message.author.id != "658160489045688323") return message.channel.send("Esse comando só pode ser utilizado pelos desenvolvedores.")
    message.channel.send('Teste')
    
    }      
}