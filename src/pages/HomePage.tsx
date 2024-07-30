import styled from 'styled-components';
import {
  GitCommand,
  GitHub,
  GitIntro,
  withScrollAnimation,
} from '../components/molecules';

const AnimatedGitIntro = withScrollAnimation(GitIntro);
const AnimatedGitCommand = withScrollAnimation(GitCommand);
const AnimatedGitHub = withScrollAnimation(GitHub);

const HomePage = () => {
  return (
    <HomePageContainer>
      <AnimatedGitIntro />
      <AnimatedGitHub />
      <AnimatedGitCommand />
    </HomePageContainer>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 2rem 4rem;
`;
