const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const fetch = require('node-fetch');
const prefix = "$"

module.exports = {
    
    config: {
        name: "careca",
        aliases: ["karek", "carecote"],
        usage: "\u200B",
        category: "Diversos",
        description: "Frases aleatórias do grande mito <@!658160489045688323>.",
        noalias: "Sem variável",
        accessable: "Todos.",
        blocked: ["<@&669014222398554156>."]
    },

    run: async (bot, message, args) => {
    if(message.channel.id != "597264797297541163" & message.channel.id != "706378512499605524" & message.channel.id != "668354222353416234" & message.channel.id != "705533843150733352") return message.channel.send("Esse comando só pode ser usado nos canais, <#597264797297541163>, <#668354222353416234> e <#705533843150733352>, imbecil!");
    if (message.member.roles.cache.has("669014222398554156")) return message.channel.send('Acha mesmo que o cargo <@&669014222398554156> tem permissão para utilizar de meus preciosos comandos? KKKKKKKKK')

     let randomsg = [
          `Está me marcando por quê? Não tem medo do perigo, <@!${message.author.id}>?`,
          `Se a <@!329487884103188500>, não trouxer o grande Campo Minado, irei delicadamente bani-la do *'grupão'*.`,
          `Fatos sobre o **Otaco's Group Inc**:\n\nA famosa <@!401528764686663700>, é gostosa *'pra caralho'*, adeus.`,
          `Você está sendo observado, cuidado.`,
          `O que você quer, animal?`,
          'Se você fuma, você é automaticamente mais imbecil que qualquer um desse servidor.',
          `Fatos sobre o **Otaco's Group Inc**:\n\nO grande e delicado <@!484550060307382282>, é imbecil, fim.`,
          `Vai tomar no seu cú.`,
          `A regra mais sensata do <#704173059099066479> é a regra de número 3, que diz: *"Ser "furry" é igual a ser imbecil, ou seja, será banido sem pudor algum"*.`,
          `Fatos sobre o **Otaco's Group Inc**:\n\nTodos devem respeitar, idolatrar e venerar o Deus Supremo <@!381329706542301185>, ou sofrerão as consequências.`,
          `Eu odeio vocês do cargo <@&704151121970593864>, mas, não se preocupem, vocês serão banidos(as) em breve.`,
          `Vá para puta que pariu.`,
          `Se você entra no servidor para não falar nada, você é um(a) tremendo(a) de filho(a) de uma puta. **EU ODEIO VOCÊ**.`,
          `Como sabem, eu sou onisciente, então eu sei que você estava *'batendo uma'* para hentai furry de Zootopia. **VOCÊ É DOENTE**. `,
          `Fatos sobre o **Otaco's Group Inc**:\n\nReza a lenda que quem xingar o <@!395661632820346902>, será absolvido de qualquer pecado.`,
          `Eu estou de olho em vocês, <@!320683310500151297> e <@!474270049360936968>.`,
          `Veja esse vídeo, por favor:\n\nhttps://www.youtube.com/watch?v=6vHfgbyBhPc`,
          `Sai do invisível aí, doente do caralho.`,
          `Você que vá pro inferno, animal... não me enche mais.`,
          `Se você usa COUPLE com alguém, não importa se a pessoa é sua MÃE, você é extremamente imbecil.`,
          `Esse <@!444908473524944896> está na minha lista, só aguarde a piroca vir de encontro com seu respectivo cú.`,
        ]
      let random = Math.floor (Math.random() * randomsg.length);
      message = await message.channel.send(randomsg[random]);
    
     }
};