const TwitchAPI = require("../apis/TwitchAPI");
const config = require('../config')
const data = require("./data");
const {customRewardIsSpecial} = require('./customRewards');


/**
 *
 * @param {*} messageObj.giphys
 * @param {*} messageObj.message
 * @param {*} messageObj.tags
 * @param {*} user
 */
const __addMessage = function (messageObj, user) {
  let customRewards = messageObj.tags['custom-reward-id']
	messageObj.user = user;
	messageObj.timestamp = new Date();
  // we have decide if the message will be used in the message chain
  // or if the message will be used in something else
  if (customRewards) {
    if (customRewardIsSpecial(customRewards, messageObj)) {
      return
    }
  }
	if (data.messages.length > 20) {
		data.messages = data.messages.slice(1);
	}
	/**
	 * message = [
	 *  Object ({type: string, data: MessageData}),
	 *  Object ({type: emote, data: endpoint to the image}),
	 *  Object ({type: string, data: Message})
	 * ]
	 */
	messageObj.emotes = messageObj.tags.emotes;
  // now parse the message
	let messageChain = parseMessage(messageObj);
	data.messages.push(messageObj);
	messageObj.id = data.totalMessages;
	messageObj.messageChain = messageChain;
	data.totalMessages++;
	data.messages = [...data.messages];
};

const getEmotes = function (messageEmotes) {
	let emotes = [];
	if (messageEmotes) {
		let es = messageEmotes;
		for (let emoteId of Object.keys(es)) {
			let positions = es[emoteId].map((el) => el.split("-"));
			for (let sub of positions) {
				emotes.push({
					start: parseInt(sub[0]),
					end: parseInt(sub[1]),
					id: emoteId,
				});
			}
		}
	}
	emotes.sort((a, b) => a.start - b.start);
	return emotes;
};

const getGiphys = function (giphys) {
	let giphs = [];
	if (giphys) {
		for (let giph of giphys) {
			giphs.push({
				type: "giph",
				data: giph,
			});
		}
	}
	return giphs;
};

const parseMessage = function (messageObj) {
	let message = messageObj.message;
	let emotes = getEmotes(messageObj.emotes);
	let giphies = getGiphys(messageObj.giphys);
  let tags = messageObj.tags
	let hasText = false;
	let messageChain = [];
	// special case for giphs
	if (giphies.length > 0) {
		return {
			messageChain: giphies,
			hasText: false,
		};
	}
	if (emotes.length === 0) {
		messageChain = [
			{
				type: "string",
				data: message,
			},
		];
	} else {
		messageChain = [];
		let currentIndex = 0;
		for (let e of emotes) {
			// emotes add one space before and one space after
			if (currentIndex !== e.start) {
				messageChain.push({
					type: "string",
					// -1 for the one space before the emote
					data: message.substring(currentIndex, e.start - 1),
				});
				hasText = true;
			}
			messageChain.push({
				type: "emote",
				data: parseInt(e.id),
			});
			// +1 for the start of the next character,
			// and +1 for space after the emote
			currentIndex = e.end + 2;
		}
		if (currentIndex < message.length) {
			messageChain.push({
				type: "string",
				data: message.substring(currentIndex),
			});
		}
	}
	return {
		messageChain,
    tags,
		hasText,
	};
};

const BADGES = [ "image_url_4x", "image_url_2x", "image_url_1x"]
const getBadges = function (tags) {
  let badges = tags.badges
  if (badges) {
    let userBadges = Object.keys(badges).map((badgeKey) => { 
      // x is the set of all the badges in the global state
      // only getting the first set
      let sets = data.badges.filter(e => {
        if (!e.set_id) {
          return false
        } else {
          return e.set_id === badgeKey
        }
      })
      if (sets.length > 0) {
        // get the version from the badge
        return sets[0].versions.filter(e => e.id === badges[badgeKey].toString())
      } else {
        return null
      }
    }).map(el => el[0]) // last step to return the badge object
    let url_of_badges = userBadges.map(el => {
      if (el) {
        // iterate throught the images sizes starting with the largest
        for (let b of BADGES) {
          if (el[b]) {
            return el[b]
          }
        }
      } // filter out the undefined badges
    }).filter(el => Boolean(el))
    return url_of_badges
  } else {
    return []
  }
}

const addMessage = function (messageObj) {
	/**
	 * if data.users has the user just add the message
	 *
	 * else call the API to get the users information
	 * Then add the users Informaiton to the Message Object
	 */
	let userId = messageObj.tags["user-id"];
  let ds = messageObj.tags["display-name"];
  let isBot = ds === config.BOT_NAME;
	if (!userId) {
		if (isBot) {
			data.users[ds] = {
				id: ds,
				profile_image_url: config.BOT_PROFILE_IMAGE,
				display_name: ds,
			};
			userId = ds;
		}
  }
	if (!data.users[userId]) {
		TwitchAPI.getUsers(userId).then((userData) => {
      let url_of_badges = getBadges(messageObj.tags) 
			let user = userData.data[0];
			data.users[user.id] = user;
      user.badges = url_of_badges;
			__addMessage(messageObj, user);
		});
	} else {
		__addMessage(messageObj, data.users[userId]);
	}
	/**
   * add in the api call to get the users information
   * if we do not have the users information already
   * broadcaster_type: ""
      created_at: "2021-05-20T03:18:07.354201Z"
      description: "Im just a regular guy, coding the night away. Im in EST, Atlanta Georgia USA.  Ask me any questions, I can help out.   Im also working on some open source projects so check them out."
      display_name: "byte_of_code"
      id: "689076619"
      login: "byte_of_code"
      offline_image_url: ""
      profile_image_url: "https://static-cdn.jtvnw.net/user-default-pictures-uv/ead5c8b2-a4c9-4724-b1dd-9f00b46cbd3d-profile_image-300x300.png"
      type: ""
      view_count: 635
   * 
   */
};

module.exports = {
  addMessage
}

/**
 * custom-reward-id - this is the id of the custom reward that was used
 * messages - message, tag, user
 * 
 * 
 * 
 */
