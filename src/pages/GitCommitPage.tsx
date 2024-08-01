import { useState } from 'react';
import styled from 'styled-components';
import { GraphItem } from '../types/git';
import { BoldText, RegularText, Snackbar } from '../components/atoms';
import { theme } from '../styles/theme';
import { GitSimulator } from '../components/organisms';
import { GitGraphVisualizer } from '../components/molecules';

const GitCommitPage = () => {
  const [graph, setGraph] = useState<GraphItem[]>([
    { type: 'branch', name: 'master', from: null },
    { type: 'commit', branch: 'master', message: 'Initial commit' },
    { type: 'commit', branch: 'master', message: 'Second commit' },
  ]);

  const [showSnackbar, setShowSnackbar] = useState(false);

  // Git Simulator
  const [commands, setCommands] = useState<
    { command: string; result: string; branch: string }[]
  >([]);
  const [branch, setBranch] = useState('master');
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [stagedFiles, setStagedFiles] = useState(false);

  const addCommand = (command: string, result: string, branch: string) => {
    setCommands((prevCommands) => [
      ...prevCommands,
      { command, result, branch },
    ]);
  };

  const handleCommit = (command: string, message: string) => {
    if (stagedFiles) {
      setGraph((prevGraph) => [
        ...prevGraph,
        { type: 'commit', branch, message },
      ]);
      addCommand(command, `Committed with message: "${message}"`, branch);
      setStagedFiles(false);
      setIsInputDisabled(true);
      setShowSnackbar(true);
    } else {
      addCommand(command, `No files added to commit`, branch);
    }
  };

  const handleCommand = (command: string) => {
    const parts = command.trim().split(/\s+/);
    const mainCommand = parts[0];
    const subCommand = parts[1];
    const argument = parts[2];
    const messageIndex = command.indexOf('-m');
    const message =
      messageIndex !== -1
        ? command.slice(messageIndex + 3).replace(/"/g, '')
        : '';

    if (mainCommand !== 'git') {
      addCommand(
        command,
        `Invalid command. Commands should start with 'git'.`,
        branch,
      );
      return;
    }

    switch (subCommand) {
      case 'add':
        if (argument === '.') {
          if (stagedFiles) {
            addCommand(command, `Files are already staged`, branch);
          } else {
            setStagedFiles(true);
            addCommand(command, `Files added to staging area`, branch);
          }
        } else {
          addCommand(
            command,
            `git add . is the only allowed add command in this problem.`,
            branch,
          );
        }
        break;
      case 'commit':
        if (message) {
          handleCommit(command, message);
        } else {
          addCommand(
            command,
            `git: '${subCommand}' requires a commit message (-m "message").`,
            branch,
          );
        }
        break;
      default:
        addCommand(
          command,
          `git: '${subCommand}' is not a required command for this problem.`,
          branch,
        );
    }
  };

  return (
    <Container>
      <ProblemContainer>
        <GitGraphContainer>
          <GitGraphVisualizer graph={graph} />
        </GitGraphContainer>
        <TextContainer>
          <RegularText
            size={16}
            color="#b22222"
            style={{ marginBottom: '1.5rem' }}
          >
            {'Git 기초 > 커밋'}
          </RegularText>
          <BoldText
            size={16}
            color={theme.color.gray[70]}
            style={{ marginBottom: '1.5rem' }}
          >
            문제 상황
          </BoldText>
          <RegularText
            size={16}
            color={theme.color.gray.main}
            style={{ lineHeight: '1.3', marginBottom: '1.5rem' }}
          >
            당신은 웹사이트 프로젝트를 진행하고 있는 개발자입니다. <br />
            최근에 다음과 같은 작업이 진행되었습니다.
          </RegularText>
          <List>
            <ListItem>
              master 브랜치에서 두 개의 커밋이 이루어졌습니다.
            </ListItem>
          </List>
          <RegularText
            size={16}
            color={theme.color.gray.main}
            style={{ lineHeight: '1.3', marginBottom: '1.5rem' }}
          >
            현재 디렉토리 내의 모든 파일을 commit 해주세요.
          </RegularText>
          <BoldText
            size={16}
            color={theme.color.gray.main}
            style={{ marginBottom: '0.5rem' }}
          >
            제약 사항
          </BoldText>
          <SubList>
            <SubListItem>
              커밋 메시지는 원하는 대로 작성하셔도 됩니다.
            </SubListItem>
          </SubList>
        </TextContainer>
      </ProblemContainer>
      <PromptContainer>
        <GitSimulator
          commands={commands}
          branch={branch}
          handleCommand={handleCommand}
          isInputDisabled={isInputDisabled}
        />
      </PromptContainer>
      <Snackbar
        message="정답입니다 🥳"
        show={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </Container>
  );
};

export default GitCommitPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProblemContainer = styled.div`
  display: flex;
  height: 45rem;
  border-bottom: 1px solid #dcdee3;
`;

const GitGraphContainer = styled.div`
  width: 50%;
  border-right: 1px solid #dcdee3;
  display: flex;
`;

const TextContainer = styled.div`
  width: 50%;
  padding: 2rem;
`;

const List = styled.ol`
  margin-top: 1rem;
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin-bottom: 1rem;
  ${theme.font.regular16}
  color: #ff6347;
`;

const SubList = styled.ul`
  list-style: disc inside;
  padding-left: 1rem;
`;

const SubListItem = styled.li`
  margin-bottom: 0.1rem;
  ${theme.font.regular16}
`;

const PromptContainer = styled.div`
  display: flex;
  height: 20rem;
  border-bottom: 1px solid #dcdee3;
`;
