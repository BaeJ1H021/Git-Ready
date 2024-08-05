import React, { ReactNode, SetStateAction } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

interface ActionProviderProps {
  createChatBotMessage: typeof createChatBotMessage;
  setState: SetStateAction<any>;
  children: ReactNode;
}

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
}: ActionProviderProps) => {
  const addMessageToBotState = (message: any) => {
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleCommitMessage = () => {
    const message = createChatBotMessage(
      '커밋 메시지를 작성하려면:\n1. \'git commit -m "메시지"\' 명령어를 사용하세요.',
      {},
    );
    addMessageToBotState(message);
  };

  const handleBranchSwitch = () => {
    const message = createChatBotMessage(
      "브랜치를 변경하려면:\n1. 'git checkout <브랜치명>' 명령어를 사용하세요.",
      {},
    );
    addMessageToBotState(message);
  };

  const handleBranchCreate = () => {
    const message = createChatBotMessage(
      `새 브랜치를 생성하려면 다음 명령어를 사용할 수 있습니다:
        1. 'git branch <브랜치명>' 명령어를 사용하여 브랜치를 생성합니다.`,
      {},
    );
    addMessageToBotState(message);
  };

  const handleMerge = () => {
    const botMessage = createChatBotMessage(
      "A 브랜치를 B 브랜치에 병합하려면 다음 단계를 따르세요: \n1. 'git checkout B'로 B 브랜치로 이동하세요.\n2. 'git merge A'로 A 브랜치를 병합하세요.",
      {},
    );
    addMessageToBotState(botMessage);
  };

  const handleDefault = () => {
    const message = createChatBotMessage(
      "무슨 도움이 필요하신가요? 예를 들어 '브랜치 병합'이나 '커밋 생성' 같은 키워드를 입력해보세요.",
      {},
    );
    addMessageToBotState(message);
  };

  return (
    <div>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          actions: {
            handleMerge,
            handleCommitMessage,
            handleBranchSwitch,
            handleBranchCreate,
            handleDefault,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
