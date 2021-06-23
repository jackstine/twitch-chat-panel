const data = require("./data");
const TwitchAPI = require("../apis/TwitchAPI");
const config = require('../config')

let helloCommand = function (client, channel, tags, message) {
	client.say(channel, `@${tags.username}, heya!`);
};

let sayCommands = function (client, channel, tags, message) {
	client.say(channel, "!hello is the only command I know 😔");
};

let giphyCommand = function (client, channel, tags, message) {
	addMessage({
		tags,
		giphys: [message.replace(`giphy `, "")],
	});
};

/**
 *
 * @param {*} messageObj
 * @param {*} user
 */
const __addMessage = function (messageObj, user) {
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
	let messageChain = parseMessage(messageObj);
	data.messages.push(messageObj);
	messageObj.user = user;
	messageObj.id = data.totalMessages;
	messageObj.timestamp = new Date();
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
		hasText,
	};
};

const addMessage = function (messageObj) {
	/**
	 * if data.users has the user just add the message
	 *
	 * else call the API to get the users information
	 * Then add the users Informaiton to the Message Object
	 */
	let userId = messageObj.tags["user-id"];
	if (!userId) {
		// TODO refactor
    // First time that the bot make a message
		let ds = messageObj.tags["display-name"];
		let isBot = ds === config.BOT_NAME;
		if (isBot) {
			// TODO add anything else...
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
			let user = userData.data[0];
			data.users[user.id] = user;
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

/**
 * 
 * @param {*} client 
 * @param {*} channel 
 * @param {*} tags 
{
    'badges': { 'broadcaster': '1', 'warcraft': 'horde' },
    'color': '#FFFFFF',
    'display-name': 'Schmoopiie',
    'emotes': { '25': [ '0-4' ] },
    'mod': true,
    'room-id': '58355428',
    'subscriber': false,
    'turbo': true,
    'user-id': '58355428',
    'user-type': 'mod',
    'emotes-raw': '25:0-4',
    'badges-raw': 'broadcaster/1,warcraft/horde',
    'username': 'schmoopiie',
    'message-type': 'action'
}
 * @param {*} message 
 */
const onMessageCommand = function (client, channel, tags, message) {
	console.log(message);
	addMessage({
		tags,
		message,
	});
};

const commandOnJoin = function (client, channel, username) {
	if (!data.firstTimers.has(username)) {
		// maybe after a certian amount of time message the person. in the chat
		data.firstTimers.add(username);
	}
};

const commandOnPart = function (client, channel, username) {
	// this means that they left the channel
};

const messageCommands = [
	{ word: "hello", action: helloCommand },
	{ word: "commands", action: sayCommands },
	{ word: "giphy", action: giphyCommand },
];

module.exports = {
	onMessageCommand,
	messageCommands,
	commandOnJoin,
	commandOnPart,
};
