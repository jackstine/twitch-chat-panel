// https://dev.twitch.tv/docs/api/reference#get-users
// const WebAPI = require('./WebAPI')
const WebAPI = require('./WebAPI')


class TwitchAPI extends WebAPI {
  constructor () {
    super({endpoint: 'https://api.twitch.tv/helix/'})
  }

  getUsers(ids) {
    if (!Array.isArray(ids)) {
      ids = [ids]
    }
    let queryString = ids.map(id => `id=${id}`).join('&')
    return this.__get(`users?${queryString}`)
    // https://dev.twitch.tv/docs/api/reference#get-users
  }

  getGlobalEmotes() {
    return this.__get(`chat/emotes/global`)
  }

  getEmoteSet (ids) {
    if (!Array.isArray(ids)) {
      ids = [ids]
    }
    let queryString = ids.map(id => `emote_set_id=${id}`).join('&')
    return this.__get(`chat/emotes/set?${queryString}`)
  }

  getEmoteFromChannel(name) {
    return this.__get(`chat/emotes?broadcaster_id=${name}`)
  }

  getChannel(id) {
    return this.__get(`channels?broadcaster_id=${id}`)
  }
}

module.exports = new TwitchAPI()
