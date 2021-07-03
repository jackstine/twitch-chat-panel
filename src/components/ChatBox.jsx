import { useEffect, useState } from 'react';
import ProfileBox from './ProfileBox'
const postUsers = function (data) {
  return fetch('http://localhost:7078/users', 
    {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body:  JSON.stringify(data)
    }
  ).then(response => {
    if (response.status === 200) {
      return response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw response;
    }
  })
}

const ChatBox = function (props) {
  const [users, setUsers] = useState()
  useEffect(() => {
    postUsers({asdlfj:'asdjkflkasj', asdkljfl: 'asdfjhiowj'}).then(resp=> {
      setUsers(resp)
    })
  }, [])
  // let Messages = props.messages.map(m => <div class="chat-box-messages-message">{m.message}</div>)
  return (
    <div className="chat-box">
      <ProfileBox messages={props.messages} tags={props.messages[0].tags} username={props.user.display_name} image={props.user.profile_image_url}/>
      {/* <div className="chat-box-messages">
        {Messages}
      </div> */}
    </div>
  )
}


export default ChatBox
