import { createContext, useEffect, useState } from 'react';

interface Chat {
  fromAuthor: boolean;
  message: string;
}

export const ChatContext = createContext({
  chats: [] as Chat[],
  setChat: (chat: Chat[]) => {},
});

// TODO: will be getting chat from local storage

export const ChatProvider = ({ children }: any) => {
  const [chats, setChat] = useState([] as Chat[]);
  return <ChatContext.Provider value={{ chats, setChat }}>{children}</ChatContext.Provider>;
};
