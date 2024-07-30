import styled from 'styled-components';
import { BoldText, RegularText } from '../atoms';
import { theme } from '../../styles/theme';

const GitCommand = () => {
  return (
    <Container>
      <BoldText size={30} color={theme.color.gray.main}>
        Git 명령어
      </BoldText>
      <HorizontalLine />
      <Section>
        <BoldCode>git init</BoldCode>
        <SectionUl>
          <SectionLi>새로운 git 저장소를 초기화합니다.</SectionLi>
          <SectionLi>현재 작업 디렉토리를 git 저장소로 설정합니다.</SectionLi>
        </SectionUl>
      </Section>
      <Section>
        <BoldCode>git config</BoldCode>
        <SectionUl>
          <SectionLi>git의 환경 설정을 관리합니다.</SectionLi>
          <SectionLi>
            사용자 정보 설정이나 저장소별 설정을 구성할 수 있습니다.
          </SectionLi>
        </SectionUl>
      </Section>
      <Section>
        <BoldCode>git add</BoldCode>
        <SectionUl>
          <SectionLi>변경된 파일을 스테이징 영역에 추가합니다.</SectionLi>
          <SectionLi>
            <RegularCode>{'git add <파일명>'}</RegularCode>
            <span> 혹은 </span>
            <RegularCode>{'git add .'}</RegularCode>
            <span>과 같이 사용합니다.</span>
          </SectionLi>
        </SectionUl>
      </Section>
      <Section>
        <BoldCode>git status</BoldCode>
        <SectionUl>
          <SectionLi>
            작업 디렉토리와 스테이징 영역의 상태를 확인합니다.
          </SectionLi>
          <SectionLi>
            어떤 파일이 변경되었고, 어떤 파일이 스테이징되었는지 등을
            보여줍니다.
          </SectionLi>
        </SectionUl>
      </Section>
      <Section>
        <BoldCode>git commit</BoldCode>
        <SectionUl>
          <SectionLi>
            스테이징 영역에 있는 파일들의 상태를 저장소에 기록합니다.
          </SectionLi>
          <SectionLi>
            <RegularCode>{'git commit -m "커밋 메시지"'}</RegularCode>
            <span>와 같이 사용하여 메시지를 작성합니다.</span>
          </SectionLi>
        </SectionUl>
      </Section>
      <Section>
        <BoldCode>git branch</BoldCode>
        <SectionUl>
          <SectionLi>브랜치를 생성, 조회하거나 삭제할 때 사용합니다.</SectionLi>
          <SectionLi>
            <RegularCode>git branch</RegularCode>
            <span>로 현재 브랜치 목록을 확인하거나</span>
            <RegularCode>{'git branch <브랜치명>'}</RegularCode>
            <span>으로 새 브랜치를 생성합니다.</span>
          </SectionLi>
        </SectionUl>
      </Section>
      <Section>
        <BoldCode>git switch</BoldCode>
        <SectionUl>
          <SectionLi>다른 브랜치로 전환합니다.</SectionLi>
          <SectionLi>
            <RegularCode>{'git switch <브랜치명>'}</RegularCode>
            <span>으로 사용합니다.</span>
          </SectionLi>
        </SectionUl>
      </Section>
      <Section>
        <BoldCode>git checkout</BoldCode>
        <SectionUl>
          <SectionLi>
            특정 커밋, 브랜치, 또는 파일로 작업 디렉토리를 되돌립니다.
          </SectionLi>
          <SectionLi>
            <span>주로 </span>
            <RegularCode>{'git checkout <파일명>'}</RegularCode>
            <span>이나</span>
            <RegularCode>{'git checkout <커밋 해시>'}</RegularCode>
            <span>, 또는</span>
            <RegularCode>{'git checkout <브랜치명>'}</RegularCode>
            <span>와 같이 사용됩니다.</span>
          </SectionLi>
        </SectionUl>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const BoldCode = styled.code`
  ${theme.font.bold22}
  background: ${theme.color.gray[30]};
  color: ${theme.color.tint.yellow};
  padding: 0 0.35rem;
  border-radius: 4px;
  width: fit-content;
`;

const RegularCode = styled.code`
  ${theme.font.regular18}
  background: ${theme.color.gray[30]};
  color: ${theme.color.tint.yellow};
  padding: 0 0.35rem;
  border-radius: 4px;
  width: fit-content;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 4rem;
`;

const SectionUl = styled.ul`
  padding-left: 2rem;
`;

const SectionLi = styled.li`
  ${theme.font.regular18}
  color: ${theme.color.gray.main};
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 2.5rem 0;
`;

export default GitCommand;
