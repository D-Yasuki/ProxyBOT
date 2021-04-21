const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");
const prefix = "$";


module.exports = {

    config: {
        name: "pedido",
        aliases: ["sugestao"],
        usage: "<tempo em s = (segundos) ou m = (minutos) max = 120m> <motivo-detalhado>.",
        category: "Diversos",
        description: "Faz um pedido no canal <#667536834032566272>. Caso esse comando seja abusado, comerei o cú de todos com farofa, vocês foram avisados...",
        noalias: "Sem variável",
        accessable: "Todos.",
        blocked: ["<@&669014222398554156>."]
    },

    run: async (bot, message, args) => {
        if(message.channel.id != "667536834032566272" & message.channel.id != "718979427496624179") return message.channel.send("Esse comando só pode ser usado no canal, <#667536834032566272> e <#718979427496624179>, imbecil!")
        if (message.member.roles.cache.has("669014222398554156")) return message.channel.send('Acha mesmo que o cargo <@&669014222398554156> tem permissão para utilizar de meus preciosos comandos? KKKKKKKKK')

        let time = args[0];
        if(!time) return message.channel.send("E o tempo, imbecil, não vai informar?\n*Obs: Max = 120m (duas horas)*.")
        
        let question = args.slice(1).join(" ");
        if(!question) return message.channel.send("VOCÊ É DOENTE? COMO FAZ UM PEDIDO SEM INFORMAR O PRÓPRIO PEDIDO, ANIMAL DA PORRA.")

        let regex = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmM]$/);

        if(regex.test(time)) {  
            if(time.toLowerCase().endsWith('s')) {
                time = parseInt(time.substring(0, time.indexOf('s')));
                time *= 1000;
            } 
            else if(time.toLowerCase().endsWith('m')) {
                time = parseInt(time.substring(0, time.indexOf('m')));
                time *= 60 * 1000;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Proxy`, 'https://i.imgur.com/3NLlQVD.png')
                .setTitle(`Nova sugestão:`)
                .setColor(colours.god_blue)
                .addFields(
                    { name:'**Para aprovar reaja com:**', value:'👍', inline: true},
                    { name:'**Para negar reaja com:**', value:'👎', inline: true},
                    { name: `**Sugestão de ${message.author.username}:**`, value: question},
                )
                .setFooter(`Requisitado por @${message.author.username}.` , message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }));

            try {
                const polls = new Map();
                const userVotes = new Map();
                let filter = (reaction, user) => {
                    if(user.bot) return false;
                    if(['👍', '👎'].includes(reaction.emoji.name)) {
                        if(polls.get(reaction.message.id).get(user.id))
                            return false;
                        else {
                            userVotes.set(user.id, reaction.emoji.name);
                            return true;
                        }
                    }
                }
                message.delete()
                let msg = await message.channel.send(embed);
                await msg.react('👍');
                await msg.react('👎');
                polls.set(msg.id, userVotes);
                let reactions = await msg.awaitReactions(filter, { time: time });
                let thumbsUp = reactions.get('👍');
                let thumbsDown = reactions.get('👎');
                let thumbsUpResults = 0, thumbsDownResults = 0;
                if(thumbsUp)
                    thumbsUpResults = thumbsUp.users.cache.filter(u => !u.bot).size;
                if(thumbsDown)
                    thumbsDownResults = thumbsDown.users.cache.filter(u => !u.bot).size;
                const resultsEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Proxy`, 'https://i.imgur.com/3NLlQVD.png')
                    .setTitle('Resultados:')
                    .setColor(colours.god_blue)
                    .addFields(
                        { name:'**Votos para aprovar:**', value:`👍 - ${thumbsUpResults}`, inline: true},
                        { name:'**Votos para negar:**', value:`👎 - ${thumbsDownResults}`, inline: true}
                    )
                    .setFooter(`Requisitado por @${message.author.username}.` , message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
                await message.channel.send(resultsEmbed);
            }
            catch(err) {
                console.log(err);
            }
        }
    }
}