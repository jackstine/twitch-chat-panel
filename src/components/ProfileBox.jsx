import MessageChain from "./MessageChain"

const ProfileBox = function (props) {
  let usernameStyles = {
    'color': props.tags.color
  }
  let NewMessages = props.messages.map(m => <div key={m.id} className="chat-box-messages-message"><MessageChain {...m.messageChain}/></div>)
  let badgeImages = props.badges.map(url => <img src={url} className="profile-badge"/>)
  return (
  <div className="profile-box">
      <div className="profile-box-username" style={usernameStyles}>
        <div className="profile-badge-area">
          {badgeImages}
          {props.username}
        </div>
        {/* working position for the badges */}
      </div>
      <div className="chat-box-messages">
        <img src={props.image} className="profile-box-image"/>
        {/* TODO need to fix so that the spans over the edge of the image */}
        <span className="chat-box-message-span">
          {NewMessages}
        </span>
      </div>
  </div>
  )
}

export default ProfileBox
