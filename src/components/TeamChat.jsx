import React, { useState, useRef, useEffect } from 'react';

export default function TeamChat({ isDarkMode }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Mehran", text: "Hey everyone! How is the frontend dashboard looking?", time: "5:00 PM" },
    { id: 2, sender: "You", text: "Just fixed the dark mode placeholder visibility bug!", time: "5:02 PM" },
    { id: 3, sender: "Zain", text: "Awesome! I am working on tying the APIs together now.", time: "5:05 PM" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll track to the newest message seamlessly
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage("");
  };

  return (
    <div className={`card border-0 shadow rounded-4 ${isDarkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}>
      
      {/* 1. Channel Metadata Sub-Header */}
      <div className={`card-header d-flex align-items-center justify-content-between p-3 border-bottom ${isDarkMode ? 'border-secondary bg-dark' : 'bg-light'}`}>
        <div className="d-flex align-items-center gap-3">
          <div className="bg-info bg-opacity-10 text-info p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-hash fs-4 fw-bold"></i>
          </div>
          <div>
            <h5 className="mb-0 fw-bold">project-sprint</h5>
            <small className="text-secondary d-flex align-items-center gap-1">
              <span className="bg-success rounded-circle d-inline-block" style={{ width: '8px', height: '8px' }}></span>
              {messages.length} messages active
            </small>
          </div>
        </div>
        <div className="text-secondary d-flex gap-2">
          <button type="button" className="btn btn-link text-secondary p-1"><i className="bi bi-people"></i></button>
          <button type="button" className="btn btn-link text-secondary p-1"><i className="bi bi-search"></i></button>
        </div>
      </div>

      {/* 2. Chat Timeline Wrapper Block */}
      <div className="card-body overflow-auto p-4 d-flex flex-column gap-3" style={{ height: '420px', background: isDarkMode ? '#191b1d' : '#f8f9fa' }}>
        {messages.map((msg) => {
          const isMe = msg.sender === "You";
          return (
            <div key={msg.id} className={`d-flex gap-3 align-items-start ${isMe ? 'flex-row-reverse' : ''}`}>
              
              {/* Profile Bubble Initial Avatar */}
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  fontSize: '0.85rem',
                  background: isMe ? '#0dcaf0' : '#6f42c1', 
                  color: isMe ? '#212529' : '#fff' 
                }}
              >
                {isMe ? "ME" : msg.sender.substring(0, 2).toUpperCase()}
              </div>

              {/* Message Content Layout */}
              <div className={`d-flex flex-column ${isMe ? 'align-items-end' : 'align-items-start'}`} style={{ maxWidth: '75%' }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="fw-bold small">{msg.sender}</span>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>{msg.time}</span>
                </div>
                
                {/* Dynamic Message Speech Bubble */}
                <div 
                  className={`p-3 rounded-3 shadow-sm ${
                    isMe 
                      ? 'bg-info text-dark rounded-end-0' 
                      : (isDarkMode ? 'bg-secondary bg-opacity-25 text-white rounded-start-0' : 'bg-white text-dark rounded-start-0')
                  }`}
                  style={{ lineHeight: '1.45', fontSize: '0.95rem' }}
                >
                  {msg.text}
                </div>
              </div>

            </div>
          );
        })}
        {/* Invisible anchor targeting bottom auto scroll position */}
        <div ref={chatEndRef} />
      </div>

      {/* 3. Modern Text Field Pill Toolbar Layout */}
      <div className={`card-footer p-3 border-top ${isDarkMode ? 'border-secondary bg-dark' : 'bg-white'}`}>
        <form onSubmit={handleSend} className="position-relative">
          <input 
            type="text" 
            className={`form-control form-control-lg rounded-pill pe-5 ps-4 ${isDarkMode ? 'bg-dark text-light border-secondary' : 'bg-light border-muted'}`}
            placeholder="Message #project-sprint..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ fontSize: '0.95rem' }}
          />
          <button 
            type="submit" 
            className="btn btn-info rounded-circle position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '36px', height: '36px' }}
          >
            <i className="bi bi-send-fill text-dark" style={{ fontSize: '0.9rem' }}></i>
          </button>
        </form>
      </div>

    </div>
  );
}