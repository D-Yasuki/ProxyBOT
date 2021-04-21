const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

module.exports = {

    config: {
        name: "anunciar",
        description: "Use bot para falar por você em algum canal específico.",
        usage: "<#canal> <mensagem>",
        category: "Moderação",
        accessable: "Administradores.",
        aliases: ["a"],
        blocked: ["Todos."]
    },
    
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(`Está um tanto equivocado, <@!${message.author.id}>, você não tem permissão pra isso. Apenas chore.`)
    if(!message.guild.me.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("ME A PERMISSÃO QUE EU FAÇO NÉ, ANIMAL!!!")

    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
        }
    }
}