const express = require("express");
const http = require("http");
const cors = require("cors");
const data = require('./tmi/data')
const {onStartUp} = require('./onstartup')
const config = require('./config')
const bodyParser = require("body-parser");
const TwitchAPI = require('./apis/TwitchAPI')

setTimeout(() => {
  TwitchAPI.getBadges().then(resp => {
    data.badges = resp.data
  })
}, 2000)

process.on("unhandledRejection", function (err) {
  console.error(err);
});

onStartUp()

const app = express();
app.use(cors());
// TODO bodyParser is dprecated
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ERROR HANDLING DONE IN ./APIs.js

app.get('/messages', (req, res) => {
  let getData = () => {
    let currentProfile = null
    let currentMessageStack = []
    for (let m of data.messages) {
      let userId = m.user.id
      // stacks all the messages per user, if they have contingeous messages un interupted
      // this will ensure that the bot only shows 1 message at a time
      // TODO the bot will cannot show 2 messages that are different
      let currentProfileIsCurrentMessagesProfile = currentProfile && currentProfile === userId
      ds = m.tags["display-name"];
      let isBot = ds === config.BOT_NAME;
      if (currentProfileIsCurrentMessagesProfile && !isBot) {
        currentMessageStack[currentMessageStack.length - 1].messages.push(m)
      } else if (!currentProfileIsCurrentMessagesProfile) {
        currentMessageStack.push({
          user: m.user,
          id: `${m.user.id}-${m.timestamp.getTime()}`,
          messages: [m]
        })
        currentProfile = userId
      }
    }
    return currentMessageStack
  }
  res.send(getData())
});

app.get('/special/giphy', (req, res) => {
  console.log(data.giphy_urls)
  if (data.giphy_urls.length > 0) {
    let sendInfo = data.giphy_urls[0]
    data.giphy_urls = data.giphy_urls.splice(1)
    console.log(sendInfo)
    res.send({data: sendInfo})
  } else {
    res.send({data: null})
  }
})

app.get('/badges', (req, res) => {
  TwitchAPI.getBadges().then(resp => {
    res.send(resp.data)
  })
})

const httpServer = http.createServer(app);

const SERVER_PORT = config.port;

httpServer.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
