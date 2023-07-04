import { useContext } from 'react';
import { ActivateContext } from '../../contexts/activate';
import Activate from './activate';

const ChatBot = () => {
  const { activate } = useContext(ActivateContext);
  return (
    <div className={activate ? 'hide-chat-bot' : 'show-chat-bot'}>
      <div>
        <h1>ChatBot</h1>
        <Activate />
      </div>
    </div>
  );
};

export default ChatBot;
