import React, { ReactNode } from 'react';

interface MessageParserProps {
  actions: {
    handleMerge: () => void;
    handleCommitMessage: () => void;
    handleBranchSwitch: () => void;
    handleBranchCreate: () => void;
    handleDefault: () => void;
  };
  children: ReactNode;
}

const MessageParser = ({ children, actions }: MessageParserProps) => {
  const parse = (message: string) => {
    const lowercase = message.toLowerCase();

    if (lowercase.includes('merge') || lowercase.includes('병합')) {
      actions.handleMerge();
    } else if (lowercase.includes('commit') || lowercase.includes('커밋')) {
      actions.handleCommitMessage();
    } else if (
      lowercase.includes('switch') ||
      lowercase.includes('checkout') ||
      lowercase.includes('브랜치 변경')
    ) {
      actions.handleBranchSwitch();
    } else if (
      lowercase.includes('create branch') ||
      lowercase.includes('브랜치 생성')
    ) {
      actions.handleBranchCreate();
    } else {
      actions.handleDefault();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
