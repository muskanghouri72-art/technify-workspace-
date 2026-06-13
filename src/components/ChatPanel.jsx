import React, { useState } from 'react';

export default function ChatPanel() {
  // State to hold the list of chat messages
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello! How can I help you code today?' }
  ]);
  
  // State to track what the user is typing
  const [inputText, setInputText] = useState('');

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim() === '') return; // Don't send empty messages

    // 1. Add user's message to the chat
    const newUserMessage = { sender: 'User', text: inputText };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputText(''); // Clear the input field

    // 2. Simulate a smart automated AI assistant response after a brief delay
    setTimeout(() => {
      let aiResponseText = "I'm analyzing your project setup. What module should we build next?";
      
      // Fun contextual responses based on what you type
      if (inputText.toLowerCase().includes('hello') || inputText.toLowerCase().includes('hi')) {
        aiResponseText = "Hello! Ready to work on the Technify Workspace dashboard?";
      } else if (inputText.toLowerCase().includes('error') || inputText.toLowerCase().includes('bug')) {
        aiResponseText = "Let me check the code execution blocks. Can you paste the specific error?";
      } else if (inputText.toLowerCase().includes('bootstrap') || inputText.toLowerCase().includes('css')) {
        aiResponseText = "Bootstrap styles are fully imported and working seamlessly edge-to-edge!";
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'AI', text: aiResponseText }
      ]);
    }, 800);
  };

  // Allow sending messages by pressing the "Enter" key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="card bg-dark text-light border-secondary" style={{ height: '80vh' }}>
      {/* Panel Header */}
      <div className="card-header border-secondary d-flex align-items-center">
        <h6 className="mb-0 fw-bold">🤖 AI Chatbot Assistant</h6>
      </div>

      {/* Chat Messages Display Area */}
      <div className="card-body overflow-auto d-flex flex-column gap-2" style={{ height: 'calc(100% - 110px)' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-3 text-start small max-w-75 ${
              msg.sender === 'AI' 
                ? 'bg-secondary text-white align-self-start' 
                : 'bg-info text-dark fw-semibold align-self-end'
            }`}
            style={{ maxWidth: '85%' }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Input Message Footer Area */}
      <div className="card-footer border-secondary bg-transparent">
        <div className="input-group input-group-sm">
          <input
            type="text"
            className="form-control bg-secondary text-white border-0"
            placeholder="Ask AI something..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button 
            className="btn btn-info fw-bold" 
            type="button"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}