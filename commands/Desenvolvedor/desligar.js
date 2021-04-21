const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

module.exports = {

    config: {
        name: "desligar",
        aliases: ["shutdown"],
        usage: "\u200B",
        category: "Desenvolvedor",
        description: "Desligar o bot.",
        noalias: "Sem variável",
        accessable: "Desenvolvedores.",
        blocked: "Todos."
    },

    run: async (bot, message, args) => {

        if(message.author.id != "395661632820346902" & message.author.id != "484550060307382282" & message.author.id != "658160489045688323") return message.channel.send("Esse comando só pode ser utilizado pelos desenvolvedores.")
    
    try{
    await message.channel.send("Bot desligado com sucesso.")
    process.exit()  
    } catch(e){
        message.channel.send(`Erro: ${e.message}`)
    }
}

}