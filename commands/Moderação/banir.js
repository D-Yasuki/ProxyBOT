const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = "$";


module.exports = {

    config: {
        name: "banir",
        description: "Banir os doentes que só enchem o saco.",
        usage: "<@usuário> <motivo>",
        category: "Moderação",
        accessable: "Administradores.",
        aliases: ["b", "ban"],
        blocked: "Todos."
    },
    
   run: async (bot, message, args) => {

   if(!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send(`Está um tanto equivocado, <@!${message.author.id}>, você não tem permissão pra isso. Apenas chore.`)
   
   let user = message.mentions.users.first()
   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
   if(!banMember) return message.channel.send("Amigo, eu preciso saber quem vou banir... parece que é burro.")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "Não especificado, contudo, deve ser porquê você é imbecil."

   if(!message.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send("ME A PERMISSÃO QUE EU FAÇO NÉ, ANIMAL!!!")

   if (message.author.id === banMember.id) {
    return message.channel.send(`Por que você quer banir a si próprio? Puta que pariu, é cada imbecil que aparece.`)
}

   if (!banMember.bannable) return message.channel.send(`O membro, <@!${banMember.user.id}>, está em um cargo no qual nem eu posso acessar, ou seja, ele(a) é um(a) dos(as) gostosos(as) do servidor.`);

   let embed = new Discord.MessageEmbed()
   .setColor(colours.demon_red)
   .setAuthor(`${banMember.user.tag} (ID: ${banMember.id})`, user.avatarURL({ format: 'png'}))
   .setTitle(`${banMember.user.username}, teve a capacidade de ser punido(a).`)
   .setDescription(`*Nossa equipe te parabeniza por isso.*`)
   .addFields(
        { name:'**Tipo de punição:**' , value: '`BAN`', inline: true},
        { name:'**Administrador:**' , value: `<@!${message.author.id}>`, inline: true},
        { name:'**Motivo:**', value: reason},
   )
   .setImage(`https://i.pinimg.com/originals/b3/84/97/b384978ab88d3d4c96269c12b5884064.png`)
   .setFooter(`Já vai tarde, imbecil.` , 'https://i.imgur.com/n0N6W3Y.png'); 
       let sChannel = message.guild.channels.cache.find(c => c.id === "716793606920339547")
       message.delete()
       sChannel.send(embed)

    let dEmbed = new Discord.MessageEmbed()
    .setColor(colours.demon_red)
    .setAuthor(`Proxy`, 'https://i.imgur.com/3NLlQVD.png')
    .setTitle("Escute junto com a leitura.")
    .setURL("https://www.youtube.com/watch?v=b4FjU5bxzRg")
    .setDescription(`Salve, imbecil, você foi banido(a) do servidor **${message.guild.name}**, só lamento.\n\nAinda sim, se não entendeu porque foi banido(a), é simples, provavelmente você\nnão falou uma palavra desde de o primeiro dia que entrou, não respondeu\no grande <@!658160489045688323>, ou o pior motivo de todos, você é intoleravelmente imbecil.\n\n Até a próxima, amigo. \n\n**Motivo:** ${reason}\n\u200B`)
    .setFooter(`Quando você voltar, será banido novamente, beijos.` , 'https://i.imgur.com/n0N6W3Y.png');


    banMember.send(dEmbed).then(() =>{
    message.guild.members.ban(banMember, {reason: reason}).catch() 
   })
    }
}