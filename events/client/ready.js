const botconfig = require("../../botconfig.json")
const { ErelaClient, Utils } = require("erela.js")
const { nodes } = require("../../botconfig.json")
const prefix = "$"

module.exports = bot => {
    console.log(`${bot.user.username} está online atualmente em ${bot.guilds.cache.size} servidores.`);

    let activities = [ 
        `${bot.guilds.cache.size} servidores pegarem fogo.`, 
        `a putaria em mais de ${bot.channels.cache.size} canais.`, `o desespero de mais ${bot.users.cache.size} usuários`, `pessoas com 9 de QI utilizando, ${prefix}ajuda.`, `o comando ${prefix}hentai.`,], i = 0;
    
    setInterval(() => bot.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 25000)  

};