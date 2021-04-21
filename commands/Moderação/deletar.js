const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

module.exports = {

    config: {
        name: "deletar",
        description: "Deleta as mesagens de um canal.",
        usage: "<quantidade (max 100)>",
        accessable: "Administradores.",
        category: "Moderação",
        aliases: ["clear", "delete", "apagar"],
        blocked: ["Todos."]
    },

    run: async (bot, message, args) => {
        if (!message.member) return

        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`Está um tanto equivocado, <@!${message.author.id}>, você não tem permissão pra isso. Apenas chore.`)
    
        var limit = 100
        if (args.length === 1) {
          limit = parseInt(args[0])
        } else {
          return message.channel.send(`Determine uma quantidade de mensagens para serem excluídas, <@!${message.author.id}>.`)
        }
    
        if (!Number.isInteger(limit)) return message.channel.send(`Determine uma quantidade entre 1 a 200, <@!${message.author.id}>.`)
    
        limit = Math.min(limit, 100)
    
        message.channel.bulkDelete(limit)
          .then(messages => {
            message.channel.send(`Foram deletadas ${messages.size} mensagens por <@!${message.author.id}>.`)
              .then(message => setTimeout(() => message.delete(), 10000))
          })
      },
}