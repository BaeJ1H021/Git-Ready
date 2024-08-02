import { useState } from 'react';
import { GraphItem } from '../types/git';
import { BoldText, RegularText, Snackbar } from '../components/atoms';
import { theme } from '../styles/theme';
import { GitSimulator } from '../components/organisms';
import { GitGraphVisualizer } from '../components/molecules';
import { S } from '../styles/CommonGitPageStyles';

const GitAdvanced1Page = () => {
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

  const mergeBranches = (from: any, to: any) => {
    setGraph((prevGraph) => [...prevGraph, { type: 'merge', from, to }]);
  };

  const handleAdd = (command: string) => {
    if (branch === 'master') {
      addCommand(command, `Cannot add files in the master branch`, branch);
      return;
    }
    if (stagedFiles) {
      addCommand(command, `Files are already staged`, branch);
    } else {
      setStagedFiles(true);
      addCommand(command, `Files added to staging area`, branch);
    }
  };

  const handleCommit = (command: string, message: string) => {
    if (message !== 'Add new feature') {
      addCommand(
        command,
        `error: commit message should be 'Add new feature'`,
        branch,
      );
      return;
    }
    if (stagedFiles) {
      setGraph((prevGraph) => [
        ...prevGraph,
        { type: 'commit', branch, message },
      ]);
      addCommand(command, `Committed with message: "${message}"`, branch);
      setStagedFiles(false);
    } else {
      addCommand(command, `No files added to commit`, branch);
    }
  };

  const handleBranch = (
    command: string,
    branchName: string,
    switchToBranch = false,
  ) => {
    if (branchName === 'feature') {
      setGraph((prevGraph) => [
        ...prevGraph,
        { type: 'branch', name: branchName, from: branch },
      ]);
      if (switchToBranch) {
        addCommand(command, `Switched to a new branch '${branchName}'`, branch);
        setBranch(branchName);
      } else {
        addCommand(command, `Branch '${branchName}' created`, branch);
      }
    } else {
      addCommand(
        command,
        `error: '${branchName}' is not a valid branch name.`,
        branch,
      );
    }
  };

  const handleCheckoutOrSwitch = (
    command: string,
    branchName: string,
    createBranch = false,
  ) => {
    if (createBranch) {
      handleBranch(command, branchName, true);
      return;
    }
    if (branchName === 'master' || branchName === 'feature') {
      if (branch === branchName) {
        addCommand(command, `Already on '${branchName}'`, branch);
      } else {
        addCommand(command, `Switched to branch '${branchName}'`, branch);
        setBranch(branchName);
      }
    } else {
      addCommand(
        command,
        `error: pathspec '${branchName}' did not match any file(s) known to git`,
        branch,
      );
    }
  };

  const handleMerge = (command: string, branchName: string) => {
    if (branch === branchName) {
      addCommand(
        command,
        `error: Cannot merge ${branchName} into itself.`,
        branch,
      );
    } else if (branchName === 'feature') {
      mergeBranches(branchName, branch);
      addCommand(
        command,
        `Merged branch '${branchName}' into '${branch}'`,
        branch,
      );
      setIsInputDisabled(true);
      setShowSnackbar(true);
    } else {
      addCommand(
        command,
        `error: '${branchName}' is not a valid branch.`,
        branch,
      );
    }
  };

  const handleCommand = (command: string) => {
    const parts = command.trim().split(/\s+/);
    const mainCommand = parts[0];
    const subCommand = parts[1];
    const argument = parts[2];
    const additionalArg = parts[3];
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

      case 'branch':
        if (argument) {
          handleBranch(command, argument);
        } else {
          addCommand(
            command,
            `git: '${subCommand}' requires a branch name.`,
            branch,
          );
        }
        break;

      case 'checkout':
        if (argument === '-b' && additionalArg) {
          handleCheckoutOrSwitch(command, additionalArg, true);
        } else if (argument) {
          handleCheckoutOrSwitch(command, argument);
        } else {
          addCommand(
            command,
            `git: '${subCommand}' requires a branch name.`,
            branch,
          );
        }
        break;

      case 'switch':
        if (argument) {
          handleCheckoutOrSwitch(command, argument);
        } else {
          addCommand(
            command,
            `git: '${subCommand}' requires a branch name.`,
            branch,
          );
        }
        break;

      case 'merge':
        if (argument) {
          handleMerge(command, argument);
        } else {
          addCommand(
            command,
            `git: '${subCommand}' requires a branch name.`,
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
            {'Git 고급 > feature 브랜치 생성 및 병합'}
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
            새로운 기능을 추가하기 위해 feature 브랜치를 생성하고 작업한 후,
            <br /> 이를 master 브랜치에 병합하려고 합니다.
          </RegularText>
          <BoldText
            size={16}
            color={theme.color.gray[70]}
            style={{ marginBottom: '0.5rem' }}
          >
            작업 내용
          </BoldText>
          <S.List>
            <S.ListItem>
              master 브랜치에서 feature 브랜치를 생성하세요.
            </S.ListItem>
            <S.ListItem>
              feature 브랜치에서 다음과 같은 작업을 수행하세요.
              <S.SubList>
                <S.SubListItem>'Add new feature' 메시지로 커밋</S.SubListItem>
              </S.SubList>
            </S.ListItem>
            <S.ListItem>
              feature 브랜치의 변경 사항을 master 브랜치에 병합하세요.
            </S.ListItem>
          </S.List>
          <BoldText
            size={16}
            color={theme.color.gray.main}
            style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
          >
            제약 사항
          </BoldText>
          <S.SubList>
            <S.SubListItem>
              현재 master 브랜치에 위치하고 있습니다.
            </S.SubListItem>
            <S.SubListItem>충돌이 발생하지 않는다고 가정합니다.</S.SubListItem>
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

export default GitAdvanced1Page;
