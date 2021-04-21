const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"


module.exports = {
    
    config: {
        name: "alpaca",
        aliases: ["Sem variável."],
        usage: "\u200B",
        category: "Imagens",
        description: "Envia imagens aleatórias de alpacas, imbecil.",
        noalias: "Sem variável",
        accessable: "Todos.",
        blocked: ["<@&669014222398554156>."]
    },

    run: async (bot, message, args) => {
    if(message.channel.id != "668354222353416234" & message.channel.id != "706378512499605524") return message.channel.send("Esse comando só pode ser usado no canal, <#668354222353416234>, imbecil!");
        if (message.member.roles.cache.has("669014222398554156")) return message.channel.send('Acha mesmo que o cargo <@&669014222398554156> tem permissão para utilizar de meus preciosos comandos? KKKKKKKKK')

        let msg = await message.channel.send("Carregando, imbecil...")

        fetch("https://apis.duncte123.me/alpaca")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply("Ou você é burro, ou eu fui mal desenvolvido! Tente novamente.")

            let cEmbed = new Discord.MessageEmbed()
            .setColor(colours.black)
            .setAuthor(`Eu odeio todo mundo,`, 'https://i.imgur.com/3NLlQVD.png')
            .setDescription('exceto alpacas, eu não sou um monstro.')
            .setImage(body.data.file)
            .setFooter(`Requisitado por @${message.author.username}.` , message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))

            message.channel.send(cEmbed)

            msg.delete();
        })
    }
}