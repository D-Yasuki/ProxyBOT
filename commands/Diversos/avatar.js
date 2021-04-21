const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = "$"


module.exports = {
    
    config: {
        name: "avatar",
        aliases: ["icon"],
        usage: "<@usuário>",
        category: "Diversos",
        description: "Roubar o avatar de alguém, sem sofrer as consequências.",
        noalias: "Sem variável",
        accessable: "Todos.",
        blocked: ["<@&669014222398554156>."]
    },

    run: async (bot, message, args) => {
    if(message.channel.id != "668354222353416234" & message.channel.id != "706378512499605524") return message.channel.send("Esse comando só pode ser usado no canal, <#668354222353416234>, imbecil!")
    if (message.member.roles.cache.has("669014222398554156")) return message.channel.send('Acha mesmo que o cargo <@&669014222398554156> tem permissão para utilizar de meus preciosos comandos? KKKKKKKKK')
    
    let user = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send("Amigo, eu preciso saber quem é, para que eu possa pegar o avatar... parece que é burro.")

    let avatarEmbed = new Discord.MessageEmbed()
    .setColor(colours.black)
    .setAuthor(`Proxy`, 'https://i.imgur.com/3NLlQVD.png')
    .setDescription(`Pronto, roubei o avatar de @${user.username}, agora para me encher.`)
    .setImage(user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
    .setFooter(`Requisitado por @${message.author.username}.` , message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
        message.channel.send(avatarEmbed); 
    
    }
}