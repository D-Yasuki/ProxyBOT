const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"


module.exports = {

    config: {
        name: "desmutar",
        description: "Retire um usuário do famoso Limbo.",
        usage: "<@usuário> <motivo>",
        category: "Moderação",
        accessable: "Administradores.",
        blocked: ["Todos."],
        aliases: ["unmute", "rlimbo"]
    },
    
    run: async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send(`Está um tanto equivocado, <@!${message.author.id}>, você não tem permissão pra isso. Apenas chore.`);

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("ME A PERMISSÃO QUE EU FAÇO NÉ, ANIMAL!!!")
    
    let user = message.mentions.users.first()
    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!mutee) return message.channel.send("Amigo, eu preciso saber quem vou desmutar... parece que é burro.");
    
    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Não especificado, contudo, sinta-se especial por isso."
    
    var check = message.mentions.users.first()
    if (mutee.roles.cache.some(r => r.name === 'Humano')) {
        return message.channel.send("Parceiro, esse usuário não está no Limbo... por favor, não me faça perder mais tempo!!")
    }

    let muterole = message.guild.roles.cache.find(r => r.name === "Limbo")
    let role = message.guild.roles.cache.find(r => r.name === "Humano")


    let embed = new Discord.MessageEmbed()
        .setColor(colours.demon_red)
        .setAuthor(`${mutee.user.tag}`, user.avatarURL({ format: 'png'}))
        .setTitle(`${mutee.user.username}, foi removido do Limbo, parabéns.`)
        .setDescription(`*Não se preocupe, a qualquer momento você volta.*`)
        .addFields(
            { name:'**Tipo de punição:**' , value: '`REMOÇÃO DO LIMBO`', inline: true},
            { name:'**Administrador:**' , value: `<@!${message.author.id}>`, inline: true},
            { name:'**Motivo:**', value: reason},
)
        .setImage(`https://i.pinimg.com/originals/be/91/b3/be91b3f93e14e0c72e3d91e2d70ba230.png`)
        .setFooter(`Você cumpriu sua penitência, imbecil.` , 'https://i.imgur.com/n0N6W3Y.png'); 
    let sChannel = message.guild.channels.cache.find(c => c.id === "716793606920339547")
        mutee.roles.remove(muterole.id)
        mutee.roles.add(role.id).then(() => {
})
        message.delete()
        sChannel.send(embed)
}

}