# Twitch_Chat_Bot
Show Emotes and Giphys in a nice chat overlay. (More work to come soon)

**Warning** this is a front end client, if built properly this will reveal the Twitch Secret to the front end. Do not Host this code without creating a seperate layer (API backend) for the TMI.js source code (src/tmi and src/config/*)

## Setup
1. Fork the Repo
2. set up the `src/config/config.development.js` file with the following schema
```
module.exports = {
  TWITCH_OAUTH: "Your Twitch OAUTH Key",
  TWITCH_CLIENT_ID: "Your Twitch Client ID",
  TWITCH_CLIENT_SECRET: "Your Twitch Client Secret",
  BOT_NAME: "botname",
  YOUR_CHANNEL: "#channel_name_that_you_stream_on",
  BOT_PROFILE_IMAGE: 'url to profile image',
  BOT_HELLO_MESSAGE: 'the message you want your bot to say every 15 minutes',
  BOT_REPLY_SPEECH: `reply speech` // outputs to chat Hey @${username} ${reply_speech}
}
```
3. Can get the OAUTH at https://twitchapps.com/tmi/
4. Can get Client ID and Client Secret when you register at https://dev.twitch.tv/console.  Register an app with URL http://localhost if you plan to keep it locahost only (TAKE HEED OF WARNING).
3. `yarn`
4. `yarn start`
5. set up in OBS as a Browser Source, Currently 600 Width and 800 Height. Use Custom CSS `body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }` to make it transparent.


## Commands
| Command | Description |
| ----------- | ----------- |
| !hello | Uses the Bot to say hello back the user that called hello |
| !commands | Returns a link to this github |
| !giphy | This will show a giphy given a giphy ID from giphy.com  IE: 'NmrqUdwGXPOog' from https://media.giphy.com/media/NmrqUdwGXPOog/giphy.gif |

## Features
1. Text Overlay from the ChatPanel.
2. Some Commands
3. Hello Message every 15 minutes
4. shows the emotes from Twitch

