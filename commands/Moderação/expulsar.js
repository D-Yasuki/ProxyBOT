const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

module.exports = {

    config: {
        name: "expulsar",
        description: "Expulsar os doentes que só enchem o saco.",
        usage: "<@usuário> <motivo>",
        category: "Moderação",
        accessable: "Administradores.",
        aliases: ["kick"],
        blocked: "Todos."
    },
    
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS"])) return message.channel.send(`Está um tanto equivocado, <@!${message.author.id}>, você não tem permissão pra isso. Apenas chore.`)

    let user = message.mentions.users.first()
    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    if(!kickMember) return message.channel.send("Amigo, eu preciso saber quem vou expulsar... parece que é burro.")

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Não especificado, contudo, deve ser porquê você é imbecil."
 
    if(!message.guild.me.hasPermission(["KICK_MEMBERS"])) return message.channel.send("ME A PERMISSÃO QUE EU FAÇO NÉ, ANIMAL!!!")

    if (message.author.id === kickMember.id) {
        return message.channel.send(`Por que você quer expulsar a si próprio? Puta que pariu, é cada imbecil que aparece.`)
    }

    if (!kickMember.kickable) return message.channel.send(`O membro, <@!${kickMember.user.id}>, está em um cargo no qual nem eu posso acessar, ou seja, ele(a) é um(a) dos(as) gostosos(as) do servidor.`);

    let kembed = new Discord.MessageEmbed()
   .setColor(colours.demon_red)
   .setAuthor(`${kickMember.user.tag}`, user.avatarURL({ format: 'png'}))
   .setTitle(`${kickMember.user.username}, teve a capacidade de ser punido(a).`)
   .setDescription('*Nossa equipe te parabeniza por isso.*')
   .addFields(
        { name:'**Tipo de punição:**' , value: '`KICK`', inline: true},
        { name:'**Administrador:**' , value: `<@!${message.author.id}>`, inline: true},
        { name:'**Motivo:**', value: reason},
   )
   .setImage(`https://i.pinimg.com/originals/f3/b9/de/f3b9de0f1ea4f633ce20ec1e5081162a.png`)
   .setFooter(`Vá pra puta que pariu.` , 'https://i.imgur.com/n0N6W3Y.png'); 
       let sChannel = message.guild.channels.cache.find(c => c.id === "716793606920339547")
       message.delete()
       sChannel.send(kembed)

    let dEmbed = new Discord.MessageEmbed()
    .setColor(colours.demon_red)
    .setAuthor(`Proxy`, 'https://i.imgur.com/3NLlQVD.png')
    .setTitle("Escute junto com a leitura.")
    .setURL("https://www.youtube.com/watch?v=b4FjU5bxzRg")
    .setDescription(`Salve, imbecil, você foi expulso(a) do servidor **${message.guild.name}**, só lamento.\n\nAinda sim, se não entendeu porque foi expulso(a), é simples, provavelmente você\nnão falou uma palavra desde de o primeiro dia que entrou, não respondeu\no grande <@!658160489045688323>, ou o pior motivo de todos, você é intoleravelmente imbecil.\n\n Até a próxima, amigo. \n\n**Motivo:** ${reason}\n\u200B`)
    .setFooter(`Boa sorte da próxima vez, adeus.` , 'https://i.imgur.com/n0N6W3Y.png');

   kickMember.send(dEmbed).then(() =>{
    kickMember.kick(kickMember, { days: 1, reason: reason}).catch() 
   })
    }
}