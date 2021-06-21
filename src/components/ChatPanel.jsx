import { useEffect, useState } from 'react'
import data from '../tmi/data'
import ChatBox from './ChatBox'

/**
 * 166 x 261
 * @param {} Component 
 * @returns 
 */

const addData = function (Component) {
  let getData = () => {
    let currentProfile = null
    let currentMessageStack = []
    for (let m of data.messages) {
      let userId = m.user.id
      if (currentProfile && currentProfile === userId) {
        currentMessageStack[currentMessageStack.length - 1].messages.push(m)
      } else {
        currentMessageStack.push({
          user: m.user,
          id: `${m.user.id}-${m.timestamp.getTime()}`,
          messages: [m]
        })
        currentProfile = userId
      }
    }
    return currentMessageStack
  }
  return (props) => {
    return <Component getData={getData} {...props}/>
  }
}

const ChatPanel = function (props) {
  let [messages, setMessages] = useState([])
  useEffect(() => {
    let i = setInterval(() => {
      let data = props.getData()
      setMessages(data)
    }, 2000)
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
