import { ChatMessage } from './ChatMessage';
import LoadingSpinner from '../assets/loading-spinner.gif';
import { useAutoScroll } from '../hooks/useAutoScroll';
import './ChatMessages.css';

export function ChatMessages({chatMessages, isLoading}){
  
  const chatMessagesRef = useAutoScroll([chatMessages]);
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
    {
      chatMessages.map((chatMessage)=>{
        return(
          <ChatMessage 
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
            time={chatMessage.time}
          />
        );
      })
    }
    {
      isLoading && (
        <ChatMessage
          message={<img src={LoadingSpinner} className='spinner-message' />}
          sender="robot"
        />
      )
    }
    </div>
  );
}