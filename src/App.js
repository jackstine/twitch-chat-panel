import "./App.css";
import { useEffect, useState } from "react";
import { create } from "./tmi/tmi";
import ChatPanel from "./components/ChatPanel";
import TwitchAuthAPI from "./apis/TwitchAuthAPI";
import TwitchAPI from "./apis/TwitchAPI";
import config from "./config";

function App() {
	let [clients, setClients] = useState([]);
	useEffect(() => {
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
		clients.push(create());
		setClients([...clients]);
		return () => {
			for (let c of clients) {
				if (c) {
					c.disconnect();
				} else {
					console.error("no client");
				}
			}
		};
	}, []);
	return <ChatPanel />;
}
export default App;
