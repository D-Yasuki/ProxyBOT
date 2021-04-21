const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require("node-fetch");
const dateFormat = require("dateformat");
const prefix = "$";


module.exports = {

    config: {
        name: "steam",
        aliases: ["Sem variável"],
        usage: "<usuário>",
        category: "Diversos",
        description: "Mostra as estatisticas de um perfil na Steam.",
        accessable: "Todos.",
        blocked: ["<@&669014222398554156>."]
    },

    run: async (bot, message, args) => {
        if(message.channel.id != "668354222353416234" & message.channel.id != "706378512499605524") return message.channel.send("Esse comando só pode ser usado no canal, <#668354222353416234>, imbecil!")
        if (message.member.roles.cache.has("669014222398554156")) return message.channel.send('Acha mesmo que o cargo <@&669014222398554156> tem permissão para utilizar de meus preciosos comandos? KKKKKKKKK')
    
        const token = "6DB10F09AB69C660641832B4B99D7887";
        if(!args[0]) return message.channel.send("Preciso saber o nome do perfil, né imbecil?");
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

        fetch(url).then(res => res.json()).then(body => {
            if(body.response.success === 42) return message.channel.send("Não achei nenhum perfil com esse nome.");

                const id = body.response.steamid;
                const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
                const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
                const state = ["Offline.", "Online.", "Ocupado.", "Ausente.", "Dormindo.", "Trocando.", "Jogando."];

        fetch(summaries).then(res => res.json()).then(body => {
            if(!body.response) return message.channel.send("Não achei nenhum perfil com esse nome.");
            const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

        fetch(bans).then(res => res.json()).then(body => {
            if(!body.players) return message.channel.send("Não achei nenhum perfil com esse nome.");
            const { NumberOfVACBans, NumberOfGameBans} = body.players[0];

            const embed = new Discord.MessageEmbed()
                .setColor(colours.black)
                .setAuthor(`Perfil Steam | ${personaname}`, 'https://i.imgur.com/3NLlQVD.png')
                .setImage(avatarfull)
                .setDescription(`**Nome verdadeiro:** ${realname || "Não especificado."}`)
                .addFields(
                    { name: '**Status:**', value: `${state[personastate]}`, inline: true },
                    { name: '**País:**', value: `:flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:`, inline: true},
                    { name: '**Conta criada em:**', value: `${dateFormat(timecreated * 1000, "d/mm/yyyy.")}`, inline: true },
                    { name: '**Bans:**', value: `VAC: ${NumberOfVACBans} | Game: ${NumberOfGameBans}`, inline: true },
                    { name: '**Link:**', value: `[Link do perfil](${profileurl})`, inline: true },
                )
                .setFooter(`Requisitado por @${message.author.username}.`, message.author.displayAvatarURL());


                message.channel.send(embed)
            })
        })
    })
  }
}