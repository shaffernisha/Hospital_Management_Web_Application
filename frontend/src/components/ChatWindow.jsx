import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm HealNow AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/chatbot/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: userMessage })
      });

      // ✅ FIX: Safe JSON parse — avoid crash if server returns non-JSON
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('Server returned an invalid response');
      }

      // ✅ FIX: Read data.response (not data.data.response)
      if (data && data.success && data.response) {
        setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: data?.message || 'Sorry, I could not process your request.' }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const chatStyles = `
    .chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .chat-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a6b63 0%, #158170 100%);
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: all 0.3s;
    }

    .chat-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    }

    .chat-window {
      display: ${isOpen ? 'flex' : 'none'};
      flex-direction: column;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
      position: absolute;
      bottom: 80px;
      right: 0;
      overflow: hidden;
    }

    .chat-header {
      background: linear-gradient(135deg, #1a6b63 0%, #158170 100%);
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-title {
      font-weight: 700;
      margin: 0;
      font-size: 1.3rem;
      color: white; 
    }

    .chat-subtitle {
      font-size: 0.75rem;
      opacity: 0.9;
      margin: 0;
    }

    .chat-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      display: flex;
      gap: 0.5rem;
    }

    .message.user {
      justify-content: flex-end;
    }

    .message-bubble {
      max-width: 70%;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      word-wrap: break-word;
      line-height: 1.4;
      font-size: 0.95rem;
    }

    .message.bot .message-bubble {
      background: #e9ecef;
      color: #333;
    }

    .message.user .message-bubble {
      background: linear-gradient(135deg, #FF7A45 0%, #FF6B35 100%);
      color: white;
    }

    .chat-input-container {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid #e9ecef;
      background: white;
    }

    .chat-input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      font-family: inherit;
      outline: none;
      font-size: 0.9rem;
    }

    .chat-input:focus {
      border-color: #1a6b63;
      box-shadow: 0 0 0 2px rgba(26, 107, 99, 0.1);
    }

    .chat-send {
      padding: 0.75rem 1rem;
      background: #FF7A45;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      font-size: 0.9rem;
    }

    .chat-send:hover {
      background: #FF6B35;
    }

    .chat-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  return (
    <>
      <style>{chatStyles}</style>
      <div className="chat-container">
        <button
          className="chat-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          💬
        </button>

        <div className="chat-window">
          <div className="chat-header">
            <div>
              <h3 className="chat-title">HealNow Assistant</h3>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <div className="message-bubble">
                  Thinking... ●●●
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;