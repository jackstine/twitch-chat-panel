import { useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import TwitchBotAPI from '../apis/TwitchBotAPI'
const ChatPanel = function () {

const [messages, setMessages] = useState([])
  useEffect(() => {
    let i = setInterval(async () => {
      let data = await TwitchBotAPI.getMessages()
      setMessages(data)
    }, 6000)
    // left off
    let setScroll = setInterval(() => {
      // debugger
      // console.log(window)
      // window.scrollTo(0, 1000 * 1000)
      let boxes = document.getElementsByClassName('chat-box')
      if (boxes.length) {
        boxes[boxes.length - 1].scrollIntoView();
      }
      boxes = document.getElementsByClassName('chat-box-messages-message')
      if (boxes.length) {
        boxes[boxes.length - 1].scrollIntoView();
      }
    }, 100)
    return () => {
      clearInterval(i);
      clearInterval(setScroll);
    }
  }, [])

  let OutputComponent = messages.map(user => <ChatBox key={`${user.id}-${user.messages.length}`} user={user.user} messages={user.messages}/>)
  return (
    <div id="chat_panel"> 
      {OutputComponent}
    </div>
  )
}

export default ChatPanel
