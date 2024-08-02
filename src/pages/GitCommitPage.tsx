import { useState } from 'react';
import { GraphItem } from '../types/git';
import { BoldText, RegularText, Snackbar } from '../components/atoms';
import { theme } from '../styles/theme';
import { GitSimulator } from '../components/organisms';
import { GitGraphVisualizer } from '../components/molecules';
import { S } from '../styles/CommonGitPageStyles';

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

  const handleAdd = (command: string) => {
    if (stagedFiles) {
      addCommand(command, `Files are already staged`, branch);
    } else {
      setStagedFiles(true);
      addCommand(command, `Files added to staging area`, branch);
    }
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
          handleAdd(command);
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
    <S.Container>
      <S.ProblemContainer>
        <S.GitGraphContainer>
          <GitGraphVisualizer graph={graph} />
        </S.GitGraphContainer>
        <S.TextContainer>
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
          <S.List>
            <S.ListItem>
              master 브랜치에서 두 개의 커밋이 이루어졌습니다.
            </S.ListItem>
          </S.List>
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
          <S.SubList>
            <S.SubListItem>
              현재 디렉토리 내에 스테이징할 파일이 존재합니다.
            </S.SubListItem>
            <S.SubListItem>
              커밋 메시지는 원하는 대로 작성하셔도 됩니다.
            </S.SubListItem>
          </S.SubList>
        </S.TextContainer>
      </S.ProblemContainer>
      <S.PromptContainer>
        <GitSimulator
          commands={commands}
          branch={branch}
          handleCommand={handleCommand}
          isInputDisabled={isInputDisabled}
        />
      </S.PromptContainer>
      <Snackbar
        message="정답입니다 🥳"
        show={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </S.Container>
  );
};

export default GitCommitPage;
