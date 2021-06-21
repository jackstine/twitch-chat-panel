import config from '../config'
import WebAPI from './WebAPI'
// const WebAPI = require('./WebAPI')

class TwitchAuthAPI extends WebAPI {
  constructor () {
    super({endpoint: 'https://id.twitch.tv/oauth2/'})
  }

  getToken() {
    let record = {
      'client_id': config.TWITCH_CLIENT_ID,
      'client_secret': config.TWITCH_CLIENT_SECRET,
      'grant_type': 'client_credentials',
      'scope': 'user:read:email'
    }
    let queryString = Object.keys(record).map(key => `${key}=${record[key]}`).join('&')
    return this.__post(`token?${queryString}`)
    // https://dev.twitch.tv/docs/authentication#scopes
    // headers['Client-Id'] = 
    // headers['Authorization'] = `Bearer ${access_token}`
    /*resp.access_token
    resp.expires_in
    resp.scope
    resp.token_type
    */
  }
}

export default new TwitchAuthAPI()
