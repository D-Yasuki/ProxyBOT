const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

module.exports = {

    config: {
        name: "removerole",
        description: "Remova um cargo de um usuário.",
        usage: "<@usuário> <@cargo> <motivo>",
        accessable: "Administradores.",
        category: "Moderação",
        aliases: ["remove"],
        blocked: ["Todos."]
    },
    
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send(`Está um tanto equivocado, <@!${message.author.id}>, você não tem permissão pra isso. Apenas chore.`)
    let user = message.mentions.users.first()
    let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
    if(!rMember) return message.channel.send("Amigo, eu preciso saber quem vou remover do cargo... parece que é burro.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Preciso saber qual é o cargo pra poder remover, animal do caralho")
    
    let reason = args.slice(3).join(" ")
    if(!reason) reason = "Não especificado, contudo, deve ser porquê você é imbecil."

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("ME A PERMISSÃO QUE EU FAÇO NÉ, ANIMAL!!!")

    let embed = new Discord.MessageEmbed()
    .setColor(colours.demon_red)
    .setAuthor(`${rMember.user.tag}`, user.avatarURL({ format: 'png'}))
    .setTitle(`${rMember.user.username}, foi removido de um cargo.`)
    .setDescription('*Relaxa, você não merecia esse cargo mesmo.*')
    .addFields(
         { name:'**Cargo:**' , value: `<@&${role.id}>`, inline: true},
         { name:'**Administrador:**' , value: `<@!${message.author.id}>`, inline: true},
         { name:'**Motivo:**', value: reason},
    )
    .setFooter(`Desenvolvido por Yasuki, Proxy e Sarsija.` , 'https://i.imgur.com/n0N6W3Y.png'); 
        let sChannel = message.guild.channels.cache.find(c => c.id === "716732760605327373")
    
    if(!rMember.roles.cache.has(role.id)) {
        return message.channel.send(`Parceiro, esse usuário não está nesse cargo... por favor, não me faça perder mais tempo!!`)
    } else {
        await rMember.roles.remove(role.id).catch(e => console.log(e.message))
        message.delete()
        sChannel.send(embed)
        }
    }
}