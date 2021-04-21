const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on("message", async message =>{
    if(!message.author.bot && message.guild){
    }
    
    if(message.content === '<@!708907706588725268>'){
        message.react('👍');
        message.channel.send('Não respondo imbecis, só lamento.')
    }

    if(message.content === 'me ajuda careca'){
        message.react('🤔');
        message.react('🧐');
        message.react('🤨');
        message.react('🤫');
        message.channel.send('É só digitar **$info** e **$ajuda**, animal com **-100** de QI.')
    }
});

bot.login(token);