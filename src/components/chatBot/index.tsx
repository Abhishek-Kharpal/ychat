import { useContext, useState } from 'react';
import { ActivateContext } from '../../contexts/activate';
import { ChatContext } from '@src/contexts/chat';
import Activate from './activate';

const ChatBot = () => {
  const { activate } = useContext(ActivateContext);
  const { chats, setChat } = useContext(ChatContext);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChat([...chats, { fromAuthor: true, message }]);
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMessage(e.target.value);
                }}
                className="message-form"
              />
              <button type="submit">Send</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
