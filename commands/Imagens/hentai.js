//This command has NSFW images, and i will not post into GitHub :)

/*
const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

let cooldown = new Set();
let cdseconds = 600;


module.exports = {

  config: {
    name: "hentai",
    aliases: ["porn"],
    usage: "<uso apenas no canal #nsfw>",
    description: "Tenta a sorte amigo KKKKKKKKK.",
    noalias: "Sem variável",
    category: "Imagens",
    accessable: "Todos.",
    blocked: ["<@&669014222398554156>", " <@&685251620078092346>."]
},
  
  run: async (bot, message, args) => {
    
  if (message.member.roles.cache.has("669014222398554156")) return message.channel.send('Acha mesmo que o cargo <@&669014222398554156> tem permissão para utilizar de meus preciosos comandos? KKKKKKKKK')
  if (message.member.roles.cache.has("685251620078092346")) return message.channel.send('Me perdoe grande Maisa, mas meus superiores ordenaram que você não utilize esse comando.')
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.channel.send(`Vai spammar HENTAI na casa do caralho, imbecil sem futuro.`).then(message => setTimeout(() => message.delete(), 10000))
}
  if(!message.member.hasPermission("ADMINISTRATOR")){
      cooldown.add(message.author.id);

  }
    number = 218;
    imageNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1;
    
    let pChannel = message.guild.channels.cache.find(c => c.id === "708863213957283891")
    message.delete()
    pChannel.send(`Cuidado, o(a) <@!${message.author.id}> está tentando *'bater uma'* pra hentai, venham **'meter o louco'** nele(a). @everyone`, {files: ["./images/" + imageNumber + ".png"]} );

    setTimeout(() =>{
      cooldown.delete(message.author.id)
  }, cdseconds * 1000)

    setTimeout(() => {
    if(message.author.id === "708907706588725268"){
        message.delete()
    }
  }, 1800000);
  
  }
};
/*