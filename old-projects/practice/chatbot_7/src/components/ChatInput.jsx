import {useState} from 'react';
import './ChatInput.css';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';

export function ChatInput({chatMessages, setChatMessages, setIsLoading}){
  const [inputText, setInputText] = useState('');
  function saveMessage(event){
    setInputText(event.target.value);
  }
  async function sendMessage(){
    const newMessage = [
      ...chatMessages, {
        sender:'user',
        message:inputText,
        time:dayjs().valueOf(),
        key:crypto.randomUUID()
      }
    ];

    setChatMessages(newMessage);
    setInputText('');
    setIsLoading(true);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newMessage,{
        sender:'robot',
        message:response,
        time:dayjs().valueOf(),
        key:crypto.randomUUID()
      }
    ]);

    setIsLoading(false);
  }

  function clearMessages(){
    setChatMessages([]);
  }
  
  return (
    <div className="chat-input-container">
      <input placeholder="Send message to chatbot" onChange={saveMessage} value={inputText} className="input-field" />
      <button className="send-btn" onClick={sendMessage}>Send</button>
      <button className="clear-btn" onClick={clearMessages}>Clear</button>
    </div>
  )
}