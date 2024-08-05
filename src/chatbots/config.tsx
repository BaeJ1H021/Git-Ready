import { createChatBotMessage } from 'react-chatbot-kit';
import { ChatbotMessage } from '../components/molecules';

const config = {
  initialMessages: [
    createChatBotMessage(
      '안녕하세요! Git 관련 도움을 드릴 수 있어요. \n 무엇을 도와드릴까요?',
      {},
    ),
  ],
  botName: 'Git Helper Bot',
  customComponents: {
    botAvatar: (props: any) => <div {...props} />,
    botChatMessage: (props: any) => <ChatbotMessage {...props} bot />,
    userAvatar: (props: any) => <div {...props} />,
    userChatMessage: (props: any) => <ChatbotMessage {...props} />,
  },
};

export default config;
