import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import dayjs from 'dayjs';
import './ChatMessage.css';

export function ChatMessage({sender, message, time}){
  return(
    <div className={sender === 'user' ? 'user-message' : 'robot-message'}>
      {
        sender === 'user' ? <div className="message">
          {message}
          {time != null && <div className="message-time">{dayjs(time).format('h:mma')}</div>}
        </div>
        :
        <img src={RobotProfileImage} className="profile-img" />
      }
      {
        sender === 'user' ? <img src={UserProfileImage} className="profile-img" />
        :
        <div className="message">
          {message}
          {time != null && <div className="message-time">{dayjs(time).format('h:mma')}</div>}
        </div>
      }
    </div>
  )
}