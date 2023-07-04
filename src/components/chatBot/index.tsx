import { useContext, useState } from 'react';
import { ActivateContext } from '../../contexts/activate';
import { ChatContext } from '@src/contexts/chat';
import Activate from './activate';
import { API_URL } from './constants';

const ChatBot = () => {
  const { activate } = useContext(ActivateContext);
  const { chats, setChat } = useContext(ChatContext);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  // TODO: set error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    const data = { message };
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newChat = await response.json();
    // newChat.message is response from GPT
    setTimeout(() => {
      setChat([...chats, { fromAuthor: true, message }, { fromAuthor: false, message: newChat.message }]);
      setLoader(false);
    }, 1000);
    setMessage('');
  };

  return (
    <div className={activate ? 'show-chat-bot' : 'hide-chat-bot'}>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <h1>ChatBot</h1>
          <Activate />
        </div>
        {activate && (
          <>
            <div
              style={{
                overflowY: 'scroll',
                height: '300px',
              }}
            >
              {chats.map((chat, index) => {
                return (
                  <div key={index}>
                    {chat.fromAuthor ? (
                      <div className="from-author">
                        <p>{chat.message}</p>
                      </div>
                    ) : (
                      <div className="from-GPT">
                        <p>{chat.message}</p>
                      </div>
                    )}
                  </div>
                );
              })}
              {loader && (
                <>
                  <div className="from-author">
                    <p>{message}</p>
                  </div>
                  <div className="from-GPT">
                    <p>Loading...</p>
                  </div>
                </>
              )}
            </div>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setMessage(e.target.value);
                  }}
                  className="input-message"
                  placeholder="Type your message here..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
