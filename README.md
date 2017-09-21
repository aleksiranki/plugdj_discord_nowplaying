# plugdj_discord_nowplaying
A bot which prints current song playing in plug.dj channel to Discord. This is just a dirty hack and has lot's of issues but will do the trick.

Started just as a simple bot to display song playing in plug.dj to Discord but expanded also to be able bridge messages between discord and plug.dj chats.

It uses discord.js to act as Discord bot and plugAPI to talk with plug.dj API.
## Installation and usage
Before you can run this you need to create the config.json file for configuration.

Clone the repository and install the needed modules in repository folder:
```bash
$ npm install
```

To run:
```bash
$ node index.js
```

## Configuration
You need Discord bot user and bot token for it.
Also you need plug.dj username and password to access the plug.dj API.
### Example configuration
```js
{
   "discordbottoken": "token",
   "discordchannel": "channel",
   "discordusername": "username", // Used for message briding to prevent loop
   "plugdjroomslug": "slug",
   "plugdjemail": "email",
   "plugdjpassword": "password",
   "plugdjusername": "username", // Used for message bridging to prevent loop
   "topicmode": "no",            // If you want the information about current song to be displayed in topic instead of message change this to yes
   "bridgemessages": "no"        // Set to yes if you want to bridge messages between plug.dj chat and Discord chat. For now needs the discordusername and plugdjusername to be set.
}
```
Discord channel needs to be the channel ID format. Write `\#channelname` on the relevant server in Discord. It will produce something like `<#1234567890>`. The 1234567890 needs to be used in discordchannel.

`slug` is the part of your plug.dj URL after slash. 

