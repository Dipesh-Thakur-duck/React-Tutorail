import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
import './App.css';


function App(){
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText]= useState('');

  const [chatMessages, setChatMessages] = useState(() => 
    JSON.parse(localStorage.getItem('messages')) || []
  );
  
  useEffect(() => {
    Chatbot.addResponses({
      'hello': 'Hi there! How can I help you?',
      'what is your name': 'I am a chatbot built with React!',
      'what time is it': () => `The current time is ${new Date().toLocaleTimeString()}`
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  function clearMessages(){
    setChatMessages([]);
  }

  return(
    <div className="app-container">
      {chatMessages.length === 0 ? <p>Welcome to the chatbot project! Send a message using the textbox below</p> : null}
      <ChatMessages 
        chatMessages={chatMessages}
        isLoading={isLoading}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        value={inputText}
        inputText={inputText}
        setInputText={setInputText}
        setIsLoading={setIsLoading}
        clearMessages={clearMessages}
      />
    </div>
  )
}
export default App
