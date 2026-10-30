import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import './App.css';

function App(){

  const [chatMessages, setChatMessages] = useState(()=>{
    try{
      const message = localStorage.getItem('chatMessages');
      return message ? JSON.parse(message) : [];
    }catch(err){
      return [];
    }
  });

  useEffect(()=>{
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const [isLoading, setIsLoading] = useState(false);
  return (
    
    <div className="app-container">
      {
        chatMessages.length === 0 && <p className="welcome-msg">Welcome to Chatbot App! Send a message.</p>
      }
      <ChatMessages 
        chatMessages={chatMessages}
        isLoading={isLoading}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        setIsLoading={setIsLoading}
      />
    </div>
  )
}

export default App