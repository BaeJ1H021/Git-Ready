import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ScrollToTop, Sidebar } from './index';

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
        <GenAI>Gen AI</GenAI>
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
  padding: 1rem;
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
  grid-template-columns: 250px 1fr 300px;
  flex: 1;
  max-width: 1480px;
  margin: 0 auto;
  width: 100%;
`;

const Content = styled.main`
  grid-area: content;
  padding: 1rem;
  border-left: 1px solid #dcdee3;
  border-right: 1px solid #dcdee3;
`;

const GenAI = styled.div`
  grid-area: gen-ai;
  background-color: #d3d3d3;
  padding: 1rem;
`;
