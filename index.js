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

// Find the channel in Discord
var channel = client.channels.get(config.discordchannel);

// Event listener for plug.dj
bot.on('advance', function(data) {
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
   var message = songauthor + " - " + songtitle + "\n**DJ:** " + currentdj;
   if (typeof config.topicmode == "string" && config.topicmode == "yes")
   {
      channel.setTopic(message, function(data) {
         console.log("Tried to set topic");
      });
   }
   else
   {
      channel.send(message);
   }

   // Log stuff to JS console
   console.log(message);
   console.log("");
});

// Check if the message bridging is on
if (typeof config.bridgemessages == "string" && config.bridgemessages == "yes")
{
   // Event listener for messages in plug.dj
   bot.on('chat', function(data) {
      var user = data.from.username;
      // Prevent loop if message was sent by the bot
      // TODO: Better way for this
      if (user == config.plugdjusername)
      {
         return;
      }
      var plugdjmessage = data.message;
      var message = "**<" + user + "**> " + plugdjmessage;
      channel.send(message);
      console.log("Plugdj: " + message);
   });

   // Event listener for messages in Discord channel
   client.on('message', function(discordmessage) {
      // Bridge messages only from the chosen channel
      if (discordmessage.channel == channel)
      {
         var user = discordmessage.author.username;
         // Prevent loop if message was sent by the bot
         // TODO: Better way to do this
         if (user == config.discordusername)
         {
            return;
         }
         var content = discordmessage.content;
         var message = "<" + user + "> " + content;
         bot.sendChat(message);
         console.log("Discord: " + message);
      }
   });
}

