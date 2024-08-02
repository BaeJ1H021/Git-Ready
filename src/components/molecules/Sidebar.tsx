import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarContainer>
      <Nav>
        <NavSection>
          <SectionTitle>Git Help</SectionTitle>
          <HorizontalLine />
          <NavItem $isActive={isActive('/')}>
            <StyledLink to="/">Git 명령어 이해하기</StyledLink>
          </NavItem>
        </NavSection>
        <NavSection>
          <SectionTitle>Git 기초</SectionTitle>
          <HorizontalLine />
          <NavItem $isActive={isActive('/git-init')}>
            <StyledLink to="/git-init">git 저장소 생성</StyledLink>
          </NavItem>
          <NavItem $isActive={isActive('/git-stage')}>
            <StyledLink to="/git-stage">파일 스테이징</StyledLink>
          </NavItem>
          <NavItem $isActive={isActive('/git-commit')}>
            <StyledLink to="/git-commit">커밋</StyledLink>
          </NavItem>
          <NavItem $isActive={isActive('/git-create-branch')}>
            <StyledLink to="/git-create-branch">브랜치 생성</StyledLink>
          </NavItem>
          <NavItem $isActive={isActive('/git-switch-branch')}>
            <StyledLink to="/git-switch-branch">브랜치 변경</StyledLink>
          </NavItem>
        </NavSection>
        <NavSection>
          <SectionTitle>Git 중급</SectionTitle>
          <HorizontalLine />
          <NavItem $isActive={isActive('/git-undo-commit')}>
            <StyledLink to="/git-undo-commit">커밋 취소</StyledLink>
          </NavItem>
          <NavItem $isActive={isActive('/git-stash')}>
            <StyledLink to="/git-stash">변경 사항 임시 저장</StyledLink>
          </NavItem>
          <NavItem $isActive={isActive('/git-merge')}>
            <StyledLink to="/git-merge">병합</StyledLink>
          </NavItem>
          <NavItem $isActive={isActive('/git-rebase')}>
            <StyledLink to="/git-rebase">리베이스</StyledLink>
          </NavItem>
          <NavItem $isActive={isActive('/git-restore')}>
            <StyledLink to="/git-restore">파일 되돌리기</StyledLink>
          </NavItem>
        </NavSection>
        <NavSection>
          <SectionTitle>Git 고급</SectionTitle>
          <HorizontalLine />
          <NavItem $isActive={isActive('/git-advanced-1')}>
            <StyledLink to="/git-advanced-1">
              feature 브랜치 생성 및 병합
            </StyledLink>
          </NavItem>
        </NavSection>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.aside`
  grid-area: sidebar;
  //background-color: #e2e2e2;
  padding: 1rem;
  height: 100%;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  ${theme.font.bold18}
  margin-bottom: 1rem;
`;

const NavItem = styled.div<{ $isActive: boolean }>`
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    background-color: ${({ $isActive }) =>
      $isActive ? '#f0f0f0' : 'transparent'};
    border-radius: 8px;
  }

  a:hover {
    background-color: #f0f0f0;
  }
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 1.5rem 0;
`;

const StyledLink = styled(Link)`
  ${theme.font.regular16}
  color: ${({ theme }) => theme.color.gray[60]};
  margin-left: 1rem;
  padding: 0.5rem 1rem;
`;
