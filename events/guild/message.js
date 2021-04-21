const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

let cooldown = new Set();
let cdseconds = 8;

module.exports = async (bot, message) => {
 

    if(message.author.bot || message.channel.type === "dm") return;
    console.log(`${message.author.username}: ${message.content}`); 
    
    if(!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)){
        message.delete();
       return message.channel.send(`Acha que isso aqui é putaria, <@!${message.author.id}>? Aguarde 8 segundos.`).then(message => setTimeout(() => message.delete(), 10000))
    }
    if(!message.member.hasPermission("ADMINISTRATOR")){
        cooldown.add(message.author.id);

    }

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)

    setTimeout(() =>{
        cooldown.delete(message.author.id)
    }, cdseconds * 1000)

};