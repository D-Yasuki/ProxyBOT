const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

module.exports = {
    
    config: {
        name: "reiniciar",
        aliases: ["reload"],
        usage: "<comando>",
        category: "Desenvolvedor",
        description: "Reiniciar um comando específico do bot.",
        noalias: "Sem variável",
        accessable: "Desenvolvedores.",
        blocked: "Todos."
    },

    run: async (bot, message, args) => {

        if(message.author.id != "395661632820346902" & message.author.id != "484550060307382282" & message.author.id != "658160489045688323") return message.channel.send("Esse comando só pode ser utilizado pelos desenvolvedores.")

    if(!args[0]) return message.channel.send("Está faltando informações, utilize **$reiniciar <comando>**.")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Não foi possível reiniciar o comando: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`O comando \`${args[0].toUpperCase()}\` foi reiniciado com sucesso.`)

    }
}