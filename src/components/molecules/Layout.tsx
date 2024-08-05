import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ScrollToTop, Sidebar } from './index';
import { ChatBot } from '../organisms';

const Layout = () => {
  return (
    <LayoutContainer>
      <ScrollToTop />
      <Header>
        <HeaderContainer>
          <Link to="/">Git Ready</Link>
        </HeaderContainer>
      </Header>
      <Main>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
        <GenAI>
          <StickyContainer>
            <ChatBot />
          </StickyContainer>
        </GenAI>
      </Main>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  font-size: 32px;
  border-bottom: 1px solid #dcdee3;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1480px;
  margin: 0 auto;
`;

const Main = styled.section`
  display: grid;
  grid-template-areas: 'sidebar content gen-ai';
  grid-template-columns: 250px 949px 300px;
  flex: 1;
  max-width: 1480px;
  margin: 0 auto;
  width: 100%;
`;

const Content = styled.main`
  grid-area: content;
  border-left: 1px solid #dcdee3;
  border-right: 1px solid #dcdee3;
`;

const GenAI = styled.div`
  grid-area: gen-ai;
  background-color: #f3e6ff;
  padding: 1rem;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 1rem;
`;
