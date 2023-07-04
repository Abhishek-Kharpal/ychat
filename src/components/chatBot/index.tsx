import { useContext, useState } from 'react';
import { ActivateContext } from '../../contexts/activate';
import { ErrorContext } from '@src/contexts/error';
import { ChatContext } from '@src/contexts/chat';
import Activate from './activate';
import { API_URL } from './constants';

const ChatBot = () => {
  const { activate } = useContext(ActivateContext);
  const { chats, setChat } = useContext(ChatContext);
  const { setError } = useContext(ErrorContext);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length === 0) {
      setError('Please enter a message');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    setLoader(true);
    const data = { message };
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => {
      setError(err.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    });
    if (!response) {
      setLoader(false);
      return;
    }
    const newChat = await response.json();
    setTimeout(() => {
      setChat([...chats, { fromAuthor: true, message }, { fromAuthor: false, message: newChat.message }]);
      localStorage.setItem(
        'chats',
        JSON.stringify([...chats, { fromAuthor: true, message }, { fromAuthor: false, message: newChat.message }]),
      );
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
          <p
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            ChatBot
          </p>
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
