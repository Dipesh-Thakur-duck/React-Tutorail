import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/profile-supersimpledev.jpg';
import './ChatMessage.css';
import dayjs from 'dayjs';

export function ChatMessage({message, sender, time}){
  // const message = props.message;
  // const sender = props.sender;

  // const {message, sender } = props;

  /*
  if(sender === 'robot'){
    return(
      <div>
        <img src={`./${sender}.png`} width="50" />
        {message}
      </div>
    )
  }
  */
  console.log(UserProfileImage);
  return (  
    <div className={
      sender === 'user' 
      ? 'chat-message-user' 
      : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message">
        {message}
        <div className="message-time">{dayjs(time).format('h:mma')}</div>
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage}  className="chat-message-profile" />
      )}
    </div>
  );
}