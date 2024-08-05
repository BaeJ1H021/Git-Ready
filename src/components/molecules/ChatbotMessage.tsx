import styled from 'styled-components';

interface Bot {
  isBot?: boolean;
}

const ChatMessageContainer = styled.div<Bot>`
  max-width: 85%;
  width: fit-content;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.isBot ? '#f2f2f2' : '#5c82ff')};
  border-radius: ${(props) =>
    props.isBot ? '20px 20px 20px 5px' : '20px 20px 5px 20px'};
  margin-left: 0.4rem;
  color: ${(props) => (props.isBot ? '#3d4f6e' : '#ffffff')};
  padding: ${(props) => (props.isBot ? '0.8rem 1.2rem' : '0.7rem 1.1rem')};
  font-weight: ${(props) => (props.isBot ? '500' : '400')};
  font-size: 1.5rem;
  line-height: 1.3;
  word-break: keep-all;
  white-space: pre-line;
`;

function ChatbotMessage({ message, bot }: any) {
  return <ChatMessageContainer isBot={bot}>{message}</ChatMessageContainer>;
}

export default ChatbotMessage;
