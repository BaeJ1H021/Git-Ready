import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexBox, RegularText } from '../atoms';
import { theme } from '../../styles/theme';
import { useDidMountEffect } from '../../hooks';

interface Command {
  command: string;
  result: string;
  branch: string;
}

interface GitSimulatorProps {
  commands: Command[];
  branch: string;
  handleCommand: (command: string) => void;
  isInputDisabled: boolean;
}

const GitSimulator: React.FC<GitSimulatorProps> = ({
  commands,
  branch,
  handleCommand,
  isInputDisabled,
}) => {
  const [input, setInput] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  // cmd 스크롤 내려주기
  const terminalRef = useRef<HTMLDivElement>(null);

  useDidMountEffect(() => {
    if (terminalRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = terminalRef.current;
      const isOverflow = scrollHeight > clientHeight;
      const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;

      if (isOverflow && !isScrolledToBottom) {
        terminalRef.current.scrollTop = scrollHeight;
      }
    }
  }, [commands]);

  return (
    <Terminal ref={terminalRef}>
      {commands.map((cmd, index) => (
        <FlexBox key={index} col gap="0.5rem">
          <Prompt>
            <RegularText size={14} color="#FF7B5A">
              root &nbsp;
            </RegularText>
            <RegularText size={14} color="#917974">
              ({cmd.branch || 'master'}) &nbsp;
            </RegularText>
            <RegularText size={14} color="#FF7B5A">
              &gt;&gt; &nbsp;
            </RegularText>
            <RegularText size={14} color="#333">
              {cmd.command}
            </RegularText>
          </Prompt>
          <RegularText size={14} color="#333">
            {cmd.result}
          </RegularText>
        </FlexBox>
      ))}
      <Prompt>
        <RegularText size={14} color="#FF7B5A">
          root &nbsp;
        </RegularText>
        <RegularText size={14} color="#917974">
          ({branch}) &nbsp;
        </RegularText>
        <RegularText size={14} color="#FF7B5A">
          &gt;&gt; &nbsp;
        </RegularText>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isInputDisabled}
        />
      </Prompt>
    </Terminal>
  );
};

export default GitSimulator;

const Terminal = styled.div`
  background-color: #f7f7f7;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

const Prompt = styled.div`
  display: flex;
  align-items: center;
  height: 1.6rem;
`;

const Input = styled.input`
  ${theme.font.regular14}
  background: transparent;
  border: none;
  color: #333;
  outline: none;
  height: 1.6rem;
  flex: 1;
`;
