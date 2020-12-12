const Discord = require("discord.js");
const client = new Discord.Client();
const fivem = require("discord-fivem-api");
const botConfig = require('./config.json');
const FiveM = require("fivem");
const srv = new FiveM.Server(botConfig.ip);

client.on("ready", () => {
    console.log(`Ingelogt als ${client.user.tag}!`)
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content === 'stats') {
       fivem.getServerInfo(botConfig.ip).then(server => {
         let result  = [];
         let index = 1;
         for (let player of server.players) {
           result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
         }
         const Embed = new Discord.MessageEmbed()
           .setColor("BLUE")
           .setAuthor("Server is online")
           .setTitle(`Players (${server.players.length}/${server.infos.vars.sv_maxClients})`)
           .setDescription(result)
           .setTimestamp();
         message.channel.send(Embed);
       }).catch(err => {
         console.log(err);
         const Embed = new Discord.MessageEmbed()
         .setColor("RED")
         .setAuthor("Server is offline")
         .setTimestamp();
       message.channel.send(Embed);
       });
    }
   })

   client.on("message", async (message) => {
       if (message.content === 'status') {
    srv.getPlayers().then(data => message.channel.send(`Spelers online: ${data}`))
    srv.getServerStatus().then(data1 => message.channel.send(`Server status: ${data1}`))
       }
      });
    
   client.login(botConfig.token);
