const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"


module.exports = {

    config: {
        name: "mutar",
        description: "Coloque um membro no famoso Limbo e desfrute da desgraça alheia.",
        usage: "<@usuário> <@cargo-atual> <motivo>",
        category: "Moderação",
        accessable: "Administradores.",
        aliases: ["mute", "limbo"],
        blocked: "Todos."
    },
    
    run: async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send(`Está um tanto equivocado, <@!${message.author.id}>, você não tem permissão pra isso. Apenas chore.`);
    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("ME A PERMISSÃO QUE EU FAÇO NÉ, ANIMAL!!!")

    let user = message.mentions.users.first()
    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!mutee) return message.channel.send("Amigo, eu preciso saber quem vou mutar... parece que é burro.");

    var check = message.mentions.users.first()
    if (mutee.roles.cache.some(r => r.name === 'Limbo')) {
        return message.channel.send("Parceiro, esse usuário já está no Limbo... por favor, não me faça perder mais tempo!!")
    }

    let reason = args.slice(2).join(" ");
    if(!reason) reason = "Não especificado, contudo, deve ser porquê você é imbecil."

    if (message.author.id === mutee.id) {
        return message.channel.send(`Por que você quer colocar a si próprio no Limbo? Puta que pariu, é cada imbecil que aparece.`)
    }

    let othersrole = message.guild.roles.cache.find(r => r.id == args[2]) || message.guild.roles.cache.find(r => r.id == args[2]) || message.mentions.roles.first()
    let muterole = message.guild.roles.cache.find(r => r.name === "Limbo")
    if(!muterole) {
        try{
            muterole = await message.guild.roles.create({
                name: "Limbo",
                color: "#a0a0a0",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                })
            })
        } catch(e) {
            console.log(e.stack);
        }
    }

let embed = new Discord.MessageEmbed()
.setColor(colours.demon_red)
.setAuthor(`${mutee.user.tag}`, user.avatarURL({ format: 'png'}))
.setTitle(`${mutee.user.username}, teve o azar de cair no Limbo.`)
.setDescription(`*Com certeza você fez por merecer.*`)
.addFields(
     { name:'**Tipo de punição:**' , value: '`LIMBO`', inline: true},
     { name:'**Administrador:**' , value: `<@!${message.author.id}>`, inline: true},
     { name:'**Motivo:**', value: reason},
)
.setImage(`https://i.pinimg.com/originals/c4/7f/47/c47f478492ea9476af9f70c4ac50f5d8.png`)
.setFooter(`Você irá sofrer nisso até quando eu quiser.` , 'https://i.imgur.com/n0N6W3Y.png'); 
    let sChannel = message.guild.channels.cache.find(c => c.id === "716793606920339547")
    mutee.roles.remove(othersrole.id)
    mutee.roles.add(muterole.id).then(() => {
    })
    message.delete()
    sChannel.send(embed)
    }
}