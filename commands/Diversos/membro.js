const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = "$";

module.exports = {
    config: {
        name: "membro",
        description: "Informações sobre um membro.",
        usage: "@usuário",
        category: "Diversos",
        noalias: "Sem variável",
        accessable: "Todos.",
        blocked: ["<@&669014222398554156>."],
        aliases: ["userinfo", "ui"]
    },
    run: async (bot, message, args) => {
    if(message.channel.id != "668354222353416234" & message.channel.id != "706378512499605524") return message.channel.send("Esse comando só pode ser usado no canal, <#668354222353416234>, imbecil!");
    if (message.member.roles.cache.has("669014222398554156")) return message.channel.send('Acha mesmo que o cargo <@&669014222398554156> tem permissão para utilizar de meus preciosos comandos? KKKKKKKKK')

    let userr = message.mentions.users.first()
    let userinfo = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    
    let sEmbed = new Discord.MessageEmbed() 

        .setColor(colours.black)
        .setTitle("Informações sobre o membro:")
        .setThumbnail(message.guild.iconURL())
        .setAuthor(`${userinfo.user.tag}`, userr.avatarURL({ format: 'png'}))
        .addFields(
            { name: "**Nome:**", value: `\`${userinfo.user.username}\``, inline: true},
            { name: "**#:**", value: `\`${userinfo.user.discriminator}\``, inline: true},
            { name: "**ID:**", value: `\`${userinfo.user.id}\``, inline: true},
            { name: '\u200B', value: '\u200B' },
            { name: "**Status:**", value: `\`${userinfo.user.presence.status}\``, inline: true},
        )
        .addField( '**Nome do servidor:**', `\`${message.guild.name}\``, true )
        .setFooter(`Requisitado por @${message.author.username}.` , message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
        message.channel.send({embed: sEmbed});
     
        }
    };