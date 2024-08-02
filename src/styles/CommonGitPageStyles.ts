import styled from 'styled-components';
import { theme } from './theme';

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
  margin-bottom: 0.5rem;
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

export const S = {
  Container,
  ProblemContainer,
  GitGraphContainer,
  TextContainer,
  List,
  ListItem,
  SubList,
  SubListItem,
  PromptContainer,
};
