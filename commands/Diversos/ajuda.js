const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags")
const prefix = "$"

module.exports = {

    config: {
        name: "ajuda",
        aliases: ["help"],
        usage: "<comando>",
        category: "Diversos",
        description: "Informações sobre todos os comandos disponíveis.",
        noalias: "Sem variável",
        accessable: "Todos.",
        blocked: ["Ninguém."]
    },
    
    run: async (bot, message, args) => {
        if(message.channel.id != "668354222353416234" & message.channel.id != "706378512499605524" ) return message.channel.send("Esse comando só pode ser usado no canal, <#668354222353416234>, imbecil!")
        const embed = new Discord.MessageEmbed()
            .setColor(colours.black)
            .setAuthor("Proxy", 'https://i.imgur.com/3NLlQVD.png')
            .setTitle("Comandos:")
            .setURL('https://www.youtube.com/watch?v=6vHfgbyBhPc')
            .setThumbnail(message.guild.iconURL())

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`Minha prefix é: \`${prefix}\`\n\n**Comandos disponíveis:**`)
            embed.setFooter(`\nDesenvolvido por Yasuki, Proxy e Sarsija | Total de comandos: ${bot.commands.size}` , 'https://i.imgur.com/n0N6W3Y.png')

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`**❯ ${capitalise} [${dir.size}]:**\n`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send(embed)
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Tudo errado, imbecil.").setDescription(`Use \`${prefix}ajuda\` para saber a lista de comandos.`))
            command = command.config

            embed.setDescription(stripIndents`Minha prefix é: \`${prefix}\`\n
            **❯ Comando:**\n${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
            **❯ Descrição:**\n${command.description || "Não especificado."}\n
            **❯ Modo de uso:**\n${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "Não especificado."}\n
            **❯ Acessível à:**\n${command.accessable || "Não especificado."}\n
            **❯ Bloqueado à:**\n${command.blocked || "Ninguém."}\n
            **❯ Variável:**\n${command.aliases ? command.aliases.join(", ") : "Não especificado."}`)

            return message.channel.send(embed)
        }
    }
}