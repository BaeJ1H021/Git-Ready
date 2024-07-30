import styled from 'styled-components';
import { BoldText, RegularText } from '../atoms';
import { theme } from '../../styles/theme';

const GitIntro = () => {
  return (
    <Container>
      <BoldText size={30} color={theme.color.gray.main}>
        Git이란?
      </BoldText>
      <HorizontalLine />
      <RegularText
        size={20}
        color={theme.color.gray[70]}
        style={{ lineHeight: '1.5' }}
      >
        Git은 소스 코드 및 프로젝트 버전 관리를 위해 사용됩니다. <br /> 여러
        개발자가 협업하고 소스 코드를 효율적으로 관리하기 위한 도구로 많이
        사용됩니다.
      </RegularText>
      <Section>
        <BoldText size={22} color={theme.color.gray.main}>
          Repository (저장소)
        </BoldText>
        <SectionUl>
          <SectionLi>Git에서 프로젝트를 저장하는 곳을 의미합니다.</SectionLi>
          <SectionLi>로컬 저장소와 원격 저장소로 나뉩니다.</SectionLi>
        </SectionUl>
      </Section>
      <Section>
        <BoldText size={22} color={theme.color.gray.main}>
          Commit (커밋)
        </BoldText>
        <SectionUl>
          <SectionLi> 변경사항을 저장소에 기록하는 단위입니다.</SectionLi>
          <SectionLi>
            각 커밋은 고유한 해시값을 가지며, 변경사항의 설명을 포함합니다.
          </SectionLi>
        </SectionUl>
      </Section>
      <Section>
        <BoldText size={22} color={theme.color.gray.main}>
          Branch (브랜치)
        </BoldText>
        <SectionUl>
          <SectionLi>
            코드를 나누어 개발하거나 실험할 때 사용하는 가지(branch)입니다.
          </SectionLi>
          <SectionLi>
            각 브랜치는 독립적으로 관리되며, 변경사항은 다른 브랜치에 영향을
            주지 않습니다.
          </SectionLi>
        </SectionUl>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
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

export default GitIntro;
