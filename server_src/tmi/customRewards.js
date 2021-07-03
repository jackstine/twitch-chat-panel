const data = require("./data")

const IDS = {
  THREE_MIN_GIPHY: '7d05f2e7-ae82-40c3-a317-df3fc7ba5810'
}

const CUSTOM_REWARDS = {
  [IDS.THREE_MIN_GIPHY]: {
    name: '3 minute giphy',
    func: function (messageObj) {
      data.giphy_urls.push(messageObj)
    },
    isSpecial: true
  }
}


const customRewardIsSpecial = function (customReward, messageObj) {
  let custom = CUSTOM_REWARDS[customReward]
  if (custom) {
    custom.func(messageObj)
    return true
  } else {
    return false
  }
}



module.exports = {
  CUSTOM_REWARDS,
  customRewardIsSpecial
}