const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = "$";


module.exports = {

    config: {
        name: "ping",
        aliases: ["latencia"],
        usage: "\u200B",
        category: "Diversos",
        description: "Mostra a conexão do Bot e da API.",
        noalias: "Sem variável",
        accessable: "Todos.",
        blocked: ["<@&669014222398554156>."]
    },

    run: async (bot, message, args) => {
    if(message.channel.id != "668354222353416234" & message.channel.id != "706378512499605524") return message.channel.send("Esse comando só pode ser usado no canal, <#668354222353416234>, imbecil!")
    if (message.member.roles.cache.has("669014222398554156")) return message.channel.send('Acha mesmo que o cargo <@&669014222398554156> tem permissão para utilizar de meus preciosos comandos? KKKKKKKKK')
    
    message.channel.send("Carregando, imbecil...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["Vai toma no cú cigarro", "Puta que pariu, conexão de vagabundo", "Alô desenvolvedor, me paga uma host melhor"]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response}:\n\nLatência do Bot: \`${ping}\`, Latência da API: \`${Math.round(bot.ws.ping)}\``)
    })
    }
}