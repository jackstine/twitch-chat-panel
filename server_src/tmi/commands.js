const data = require("./data");
const {addMessage} = require('./messageProcessing')

let helloCommand = function (client, channel, tags, message) {
	client.say(channel, `@${tags.username}, heya!`);
};

let sayCommands = function (client, channel, tags, message) {
	client.say(channel, "https://github.com/jackstine/twitch-chat-panel#commands");
};

let giphyCommand = function (client, channel, tags, message) {
	addMessage({
		tags,
		giphys: [message.replace(`giphy `, "")],
	});
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
	addMessage({
		tags,
		message,
	});
};

const commandOnJoin = function (client, channel, username) {
	if (!data.firstTimers.has(username)) {
		// maybe after a certian amount of time message the person. in the chat
		data.firstTimers.add({username, joined: new Date()});
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
