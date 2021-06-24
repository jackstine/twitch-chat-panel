const tmi = require("tmi.js");
const config = require("../config");
const {
	onMessageCommand,
	messageCommands,
	commandOnJoin,
	commandOnPart,
} = require("./commands");
const data = require("./data");

const create = function () {
	let CHANNEL = config.YOUR_CHANNEL;

	const client = new tmi.Client({
		options: { debug: true },
		identity: {
			username: config.BOT_NAME,
			password: `${config.TWITCH_OAUTH}`,
		},
		channels: [CHANNEL],
	});

	client.connect();

  const botSaysHey = function (override) {
    let message = override || config.BOT_HELLO_MESSAGE;
    client.say(CHANNEL, message);
  }

	const createBot = function (client) {
		let TIME_FOR_REPEAT_MESSAGES = 15 * 60 * 1000; // 15 minutes
    botSaysHey('!giphy https://media.giphy.com/media/3ornk57KwDXf81rjWM/giphy.gif')
		setInterval(() => {
      botSaysHey()
		}, TIME_FOR_REPEAT_MESSAGES);

		client.on("message", (channel, tags, message, self) => {
			if (message[0] === "!") {
				message = message.substring(1);
				let command = message.split(" ")[0];
				for (let com of messageCommands) {
					if (com.word === command) {
						com.action(client, channel, tags, message);
						return;
					}
				}
			}
			onMessageCommand(client, channel, tags, message);
		}); // END OF MESSAGE
		client.on("join", (channel, username, self) => {
			commandOnJoin(client, channel, username);
		}); // END OF JOIN
		client.on("part", (channel, username, self) => {
			commandOnPart(client, channel, username);
		}); // END OF PART
		client.on("chat", (channel, userstate, message, self) => {
			if (self) return;
			if (message.toLowerCase().includes(`@${config.BOT_NAME}`)) {
				client.say(channel, `Hey @${userstate.username} ${config.BOT_REPLY_SPEECH}`);
			}
		}); // END OF CHAT
		client.on("ban", (channel, username, reason, userstate) => {
			// TODO
		}); //END OF BAN
		client.on(
			"timeout",
			(channel, username, reason, duration, userstate) => {
				// TODO
			}
		); // END OF TIMEOUT
	};

	createBot(client);
	return client;
};

module.exports = {
	create,
	addEmotes: (emotes) => {
		data.emotes = emotes;
	},
};
/**
 * I want a bot
 * I want to talk to people
 * It will only talk back
 *
 * games
 *  find the number
 *
 *
 * songs
 *  add to a spotify playlist
 *
 *
 * use join to say hello to people intro
 *
 */
