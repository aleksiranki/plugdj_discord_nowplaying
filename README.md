# plugdj_discord_nowplaying
A bot which prints current song playing in plug.dj channel to Discord. This is just a dirty hack and has lot's of issues but will do the trick. It uses discord.js to act as Discord bot and plugAPI to talk with plug.dj API.
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
   "plugdjroomslug": "slug",
   "plugdjemail": "email",
   "plugdjpassword": "password"
}
```
Discord channel needs to be the channel ID format. Write `\#channelname` on the relevant server in Discord. It will produce something like `<#1234567890>`. The 1234567890 needs to be used in discordchannel.

`slug` is the part of your plug.dj URL after slash. 

