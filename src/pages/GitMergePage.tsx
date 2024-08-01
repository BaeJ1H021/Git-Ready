import { useState } from 'react';
import styled from 'styled-components';
import { GraphItem } from '../types/git';
import { BoldText, RegularText, Snackbar } from '../components/atoms';
import { theme } from '../styles/theme';
import { GitSimulator } from '../components/organisms';
import { GitGraphVisualizer } from '../components/molecules';

const GitMergePage = () => {
  const [graph, setGraph] = useState<GraphItem[]>([
    { type: 'branch', name: 'master', from: null },
    { type: 'commit', branch: 'master', message: 'Initial commit' },
    { type: 'branch', name: 'develop', from: 'master' },
    { type: 'commit', branch: 'develop', message: '검색창 컴포넌트 개발' },
    { type: 'commit', branch: 'develop', message: '검색 api 구현' },
    { type: 'commit', branch: 'master', message: '홈페이지 리팩토링' },
  ]);

  const mergeBranches = (from: any, to: any) => {
    setGraph((prevGraph) => [...prevGraph, { type: 'merge', from, to }]);
  };

  const [showSnackbar, setShowSnackbar] = useState(false);

  // Git Simulator
  const [commands, setCommands] = useState<
    { command: string; result: string; branch: string }[]
  >([]);
  const [branch, setBranch] = useState('develop');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const addCommand = (command: string, result: string, branch: string) => {
    setCommands((prevCommands) => [
      ...prevCommands,
      { command, result, branch },
    ]);
  };

  const handleCheckoutOrSwitch = (
    command: string,
    subCommand: string,
    branchName: string,
  ) => {
    if (branchName === 'master' || branchName === 'develop') {
      if (branch === branchName) {
        addCommand(command, `Already on '${branchName}'`, branch);
      } else {
        setBranch(branchName);
        addCommand(command, `Switched to branch '${branchName}'`, branch);
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
    } else if (branchName === 'develop') {
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
    const branchName = parts[2];

    if (mainCommand !== 'git') {
      addCommand(
        command,
        `Invalid command. Commands should start with 'git'.`,
        branch,
      );
      return;
    }

    switch (subCommand) {
      case 'checkout':
      case 'switch':
        if (branchName) {
          handleCheckoutOrSwitch(command, subCommand, branchName);
        } else {
          addCommand(
            command,
            `git: '${subCommand}' requires a branch name.`,
            branch,
          );
        }
        break;
      case 'merge':
        if (branchName) {
          handleMerge(command, branchName);
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
            {'Git 중급 > 병합'}
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
            style={{ lineHeight: '1.3' }}
          >
            당신은 웹사이트 프로젝트를 진행하고 있는 개발자입니다. <br /> 현재
            master 브랜치는 안정된 버전을 유지하고 있으며, <br /> 새로운 기능
            개발은 develop 브랜치에서 이루어집니다. <br /> 최근에 다음과 같은
            작업이 진행되었습니다.
          </RegularText>
          <List>
            <ListItem>
              master 브랜치에서 develop 브랜치를 생성했습니다.
            </ListItem>
            <ListItem>
              develop 브랜치에서 두 개의 주요 기능이 구현되었습니다.
              <SubList>
                <SubListItem>첫 번째 커밋: 검색창 컴포넌트 개발</SubListItem>
                <SubListItem>두 번째 커밋: 검색 api 구현</SubListItem>
              </SubList>
            </ListItem>
          </List>
          <RegularText
            size={16}
            color={theme.color.gray.main}
            style={{ lineHeight: '1.3', marginBottom: '1.5rem' }}
          >
            develop 브랜치의 변경 사항을 master 브랜치에 병합하여 안정된 버전에
            포함하시오.
          </RegularText>
          <BoldText
            size={16}
            color={theme.color.gray.main}
            style={{ marginBottom: '0.5rem' }}
          >
            제약 사항
          </BoldText>
          <SubList>
            <SubListItem>각 브랜치는 최신 상태입니다.</SubListItem>
            <SubListItem>현재 develop 브랜치에 위치하고 있습니다.</SubListItem>
            <SubListItem>충돌은 발생하지 않는다고 가정합니다.</SubListItem>
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

export default GitMergePage;

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
