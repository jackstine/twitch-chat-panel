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
}

export default new TwitchBotAPI()
