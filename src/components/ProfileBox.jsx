import MessageChain from "./MessageChain"

const ProfileBox = function (props) {
  let usernameStyles = {
    'color': props.tags.color
  }
  let NewMessages = props.messages.map(m => <div key={m.id} className="chat-box-messages-message"><MessageChain {...m.messageChain}/></div>)
  return (
  <div className="profile-box">
      <div className="profile-box-username" style={usernameStyles}>
        {props.username}
      </div>
      <div className="chat-box-messages">
        <img src={props.image} className="profile-box-image"/>
        {NewMessages}
      </div>
  </div>
  )
}

export default ProfileBox
