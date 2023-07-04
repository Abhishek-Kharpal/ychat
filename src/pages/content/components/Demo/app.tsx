import { ActivateProvider } from '@src/contexts/activate';
import { ErrorProvider } from '@src/contexts/error';
import { ChatProvider } from '@src/contexts/chat';
import ChatBot from '@src/components/chatBot';

const App = () => {
  return (
    <ActivateProvider>
      <ErrorProvider>
        <ChatProvider>
          <ChatBot />
        </ChatProvider>
      </ErrorProvider>
    </ActivateProvider>
  );
};

export default App;
