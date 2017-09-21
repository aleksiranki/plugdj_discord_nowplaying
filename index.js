// Read config file
var config = require('./config.json');

// Set up discord related stuff
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
     console.log('I am ready!');
});

client.login(config.discordbottoken);

// Set up plug.dj related bot stuff
var PlugAPI = require('plugapi');
var bot = new PlugAPI({
       email: config.plugdjemail,
       password: config.plugdjpassword
});

bot.connect(config.plugdjroomslug);

bot.on('roomJoin', function(room) {
       console.log("Joined " + room);
});


// Set up automatic reconnect for plug.dj
var reconnect = function() { bot.connect(config.plugdjroomslug); };

bot.on('close', reconnect);
bot.on('error', reconnect);

// Event listener for plug.dj
bot.on('advance', function(data) {
   // Find the channel in Discord
   var channel = client.channels.get(config.discordchannel);

   // Do not do anything if no-one is playing
   if (typeof data.media == 'undefined')
   {
      return;
   }
   // Collect stuff from the JSON
   var songauthor = data.media.author;
   var songtitle = data.media.title;
   var currentdj = data.currentDJ.username;

   // Create the message to display in Discord and send it to Discrod
   var message = "**Current DJ:** " + currentdj + "\n" + songauthor + " - " + songtitle;
   channel.send(message);

   // Log stuff to JS console
   console.log(data.mediaStartTime)
   console.log(message);
   console.log("\n");
});
