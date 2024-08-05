import Chatbot from 'react-chatbot-kit';
import { ActionProvider, config, MessageParser } from '../../chatbots';
import 'react-chatbot-kit/build/main.css';
import '../../chatbots/chatbot.css';

const ChatBot = () => {
  return (
    <Chatbot
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
    />
  );
};

export default ChatBot;
