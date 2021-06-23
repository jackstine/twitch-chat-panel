const express = require("express");
const http = require("http");
const cors = require("cors");
const data = require('./tmi/data')
const {onStartUp} = require('./onstartup')
const config = require('./config')
const bodyParser = require("body-parser");



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
      if (currentProfile && currentProfile === userId) {
        currentMessageStack[currentMessageStack.length - 1].messages.push(m)
      } else {
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

const httpServer = http.createServer(app);

const SERVER_PORT = config.port;

httpServer.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});