import { createContext, useEffect, useState } from 'react';

interface Chat {
  fromAuthor: boolean;
  message: string;
}

export const ChatContext = createContext({
  chat: [] as Chat[],
  setChat: (chat: Chat[]) => {},
});

// TODO: will be getting chat from local storage

export const ChatProvider = ({ children }: any) => {
  const [chat, setChat] = useState([] as Chat[]);
  return <ChatContext.Provider value={{ chat, setChat }}>{children}</ChatContext.Provider>;
};
