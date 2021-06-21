const MessageChain = function (props) {
  let messageChain = props.messageChain;
  let Chain = [];
  let className = props.hasText ? "message-chain-emote-multiple" : "message-chain-emote-single";
  for (let m of messageChain) {
    if (m.type === "string") {
      Chain.push(<span>{m.data}</span>);
    } else if (m.type === "emote") {
      Chain.push(
        <img
          className={className}
          src={`https://static-cdn.jtvnw.net/emoticons/v2/${m.data}/default/dark/3.0`}
        />
      );
    } else if (m.type === "giph") {
      Chain.push(
        <img
          className="message-chain-giphy"
          src={`https://media.giphy.com/media/${m.data}/giphy.gif`}
        />
      );
    }
  }
  return Chain;
};

export default MessageChain;
