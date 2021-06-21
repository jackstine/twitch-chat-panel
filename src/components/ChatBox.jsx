import ProfileBox from './ProfileBox'


const ChatBox = function (props) {
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
