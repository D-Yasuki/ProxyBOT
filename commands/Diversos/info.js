const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"


module.exports = {

    config: {
        name: "info",
        aliases: ["i", "desc"],
        usage: "\u200B",
        category: "Diversos",
        description: "Informações sobre mim e sobre os *'punheteiros'* que me criaram.",
        noalias: "Sem variável",
        accessable: "Todos.",
        blocked: ["Ninguém."]
    
    },

    run: async (bot, message, args) => {
    if(message.channel.id != "668354222353416234" & message.channel.id != "706378512499605524" ) return message.channel.send("Esse comando só pode ser usado no canal, <#668354222353416234>, imbecil!")

    let sEmbed = new Discord.MessageEmbed()
    .setColor(colours.black)
    .setTitle("Informações sobre mim:")
    .setURL('https://www.youtube.com/watch?v=t9h4A5ulaqk')
    .setDescription("Salve, bando de doente, me chamo **Proxy** e sou um **BOT** privado criado especialmente para **meter o louco** em todos desse grupo.\n\nAtualmente estou em minha fase BETA, então para ver novas funções, aguarde minhas próximas atualizações (que vão demorar *'pa carai'*, porquê o *'dev'* é um vagabundo), contudo, se achar que eu devo melhorar e '*os caralho*', peço humildemente que vá toma no seu cú, adeus.\n\u200B")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(`Proxy`, 'https://i.imgur.com/3NLlQVD.png')

    .addFields(
        { name: '**Informações sobre o servidor:**', value: 'Leia sobre regras em <#704173059099066479>.\n\u200BLeia sobre a hierarquia em <#704527645840375838>.\n\u200BLeia sobre as tags em <#706408650083663882>.'},
        { name: '**Donos do servidor:**', value: '<@!381329706542301185>, <@!484550060307382282> e <@!395661632820346902>.'},
        { name: '**Gostosa do servidor:**', value: '<@!401528764686663700>.'},
        { name: '\u200B', value: '\u200B' },
        { name: '**Nome do servidor:**', value: `${message.guild.name}`, inline: true },
        { name: '**Total de membros:**', value: `${message.guild.memberCount}`, inline: true },
    )

    .addField('**Comandos disponíveis:**', `${prefix}ajuda\n\u200B`, true)
    .setImage('')
    .setFooter(`Desenvolvido por Yasuki, Proxy e Sarsija.` , 'https://i.imgur.com/n0N6W3Y.png');
    message.channel.send({embed: sEmbed});
 
    }
};