import './ChatInput.css';
import { Chatbot} from 'supersimpledev';
import dayjs from 'dayjs';

export function ChatInput({chatMessages, setChatMessages, inputText, setInputText, setIsLoading, clearMessages}){
  
  function saveInputText(event){
    setInputText(event.target.value)
  }

  async function sendMessage(){
    const newChatMessages = [
      ...chatMessages,
      {
        message:inputText,
        sender:'user',
        id:crypto.randomUUID(),
        time:dayjs().valueOf()
      }
    ];

    setChatMessages(newChatMessages);
    setInputText('');
    setIsLoading(true);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message:response,
        sender:'robot',
        id:crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);
    setIsLoading(false);

  }
  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">Send</button>
      <button onClick={clearMessages} className="clear-button">Clear</button>
    </div>
  );
}