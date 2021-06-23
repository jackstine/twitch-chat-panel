import { useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import TwitchBotAPI from '../apis/TwitchBotAPI'

/**
 * @param {} Component 
 * @returns 
 */

const addData = function (Component) {
  let getData = async () => {
    return await TwitchBotAPI.getMessages()
  }
  return (props) => {
    return <Component getData={getData} {...props}/>
  }
}

const ChatPanel = function (props) {
  let [messages, setMessages] = useState([])
  useEffect(() => {
    let i = setInterval(async () => {
      let data = await props.getData()
      setMessages(data)
    }, 6000)
    // left off
    let setScroll = setInterval(() => {
      let boxes = document.getElementsByClassName('chat-box')
      if (boxes.length) {
        boxes[boxes.length - 1].scrollIntoView();
      }
    }, 100)
    return () => {
      clearInterval(i);
      clearInterval(setScroll);
    }
  }, [props.getData])
  let OutputComponent = messages.map(user => <ChatBox key={`${user.id}-${user.messages.length}`} user={user.user} messages={user.messages}/>)
  return (
    <div id="chat_panel"> 
      {OutputComponent}
    </div>
  )
}

export default addData(ChatPanel)
