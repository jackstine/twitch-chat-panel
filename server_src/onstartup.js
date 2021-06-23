const TwitchAuthAPI = require('./apis/TwitchAuthAPI')
const TwitchAPI = require('./apis/TwitchAPI')
const config = require('./config')
const tmi = require('./tmi/tmi')

const onStartUp = function () {
  TwitchAuthAPI.getToken().then((resp) => {
    TwitchAPI.addHeader({
      key: "Authorization",
      value: `Bearer ${resp.access_token}`,
    });
    TwitchAPI.addHeader({
      key: "Client-Id",
      value: config.TWITCH_CLIENT_ID,
    });
    // TwitchAPI.getGlobalEmotes().then(resp => {
    //   let emoteDict = resp.data.reduce((obj, el) => {
    //     obj[el.id] = el
    //     return obj
    //   }, {})
    //   addEmotes(emoteDict)
    // })
    // TwitchAPI.getEmoteSet('67842281').then(resp => {
    //   console.log(resp)
    // })
    // TwitchAPI.getEmoteFromChannel('37286968').then(resp => {
    //   console.log(resp)
    // })
    // TwitchAPI.getChannel('37286968').then(resp => {
    //   console.log(resp)
    // })
  });
let tmi_client = tmi.create()
}

module.exports = {
  onStartUp
}
