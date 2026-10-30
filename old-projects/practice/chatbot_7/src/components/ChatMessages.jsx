import { ChatMessage } from './ChatMessage';
import { useAutoScroll } from '../hooks/useAutoScroll';
import SpinnerImg from '../assets/loading-spinner.gif';
import './ChatMessages.css';

export function ChatMessages({chatMessages, isLoading}){

  const elementRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={elementRef}>
      {
        chatMessages.map(message=>{
          return <ChatMessage 
            sender={message.sender}
            message={message.message}
            time={message.time}
            key={message.key}
          />
        })
      }
      {
        isLoading && <ChatMessage 
          sender='robot'
          message={<img src={SpinnerImg} className="spinner-img"/>}
        />
      }
    </div>
  )
}