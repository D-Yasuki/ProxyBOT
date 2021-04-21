const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent")
const prefix = "$";


module.exports = {

    config: {
        name: "desbanir",
        description: "Desbanir as gostosas.",
        usage: "<id> <motivo>",
        category: "Moderação",
        accessable: "Administradores.",
        aliases: ["desban"],
        blocked: "Todos."
    },
    
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send(`Está um tanto equivocado, <@!${message.author.id}>, você não tem permissão pra isso. Apenas chore.`)

    if(!args[0]) return message.channel.send("Amigo, eu preciso saber o ID de quem vou desbanir... parece que é burro."); 
    let bannedMember;
    try{                                                            
        bannedMember = await bot.users.fetch(args[0])
    }catch(e){
        if(!bannedMember) return message.channel.send("Não é um ID válido, imbecil.")
    }
    try {
            await message.guild.fetchBan(args[0])
        } catch(e){
            message.channel.send('Está alucinando? Esse usuário não está banido.');
            return;
        }

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Não especificado, contudo, deve ser porquê é uma gostosa."

    if(!message.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send("ME A PERMISSÃO QUE EU FAÇO NÉ, ANIMAL!!!")
    
    let embed = new Discord.MessageEmbed()
    .setColor(colours.demon_red)
    .setAuthor(`${bannedMember.username} (ID: ${bannedMember.id})`, 'https://i.imgur.com/Y32inkl.png')
    .setTitle(`${bannedMember.username}, foi desbanido do servidor.`)
    .setDescription('*Não seja tão imbecil dessa vez.*')
    .addFields(
         { name:'**Tipo de punição:**' , value: '`DESBAN`', inline: true},
         { name:'**Administrador:**' , value: `<@!${message.author.id}>`, inline: true},
         { name:'**Motivo:**', value: reason},
    )
    .setImage(`https://i.pinimg.com/originals/9c/55/46/9c554621b810766e567b583118a8ef24.png`)
    .setFooter(`Não se preocupe, logo logo você é banido de novo.` , 'https://i.imgur.com/n0N6W3Y.png'); 
        let sChannel = message.guild.channels.cache.find(c => c.id === "716793606920339547")
    
    try {
        message.delete()
        message.guild.members.unban(bannedMember, {reason: reason})
        sChannel.send(embed)
    } catch(e) {
        console.log(e.message)
        }
    }   
}