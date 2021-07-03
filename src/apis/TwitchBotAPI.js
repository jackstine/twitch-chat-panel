import WebAPI from "./WebAPI";
import config from '../config'

let ENDPOINT = config.BACKEND_ENDPOINT


class TwitchBotAPI extends WebAPI {
  constructor () {
    super({endpoint: ENDPOINT})
  }

  getMessages () {
    return this.__get('messages')
  }

  getSpecialGiph () {
    return this.__get('special/giphy')
  }
}

export default new TwitchBotAPI()
