import styled from 'styled-components';
import { BoldText, RegularText } from '../atoms';
import { theme } from '../../styles/theme';

const GitHub = () => {
  return (
    <Container>
      <BoldText size={30} color={theme.color.gray.main}>
        GitHub란?
      </BoldText>
      <HorizontalLine />
      <RegularText
        size={20}
        color={theme.color.gray[70]}
        style={{ lineHeight: '1.5' }}
      >
        GitHub은 소프트웨어 개발 프로젝트를 관리하고 협업할 수 있는 웹 기반
        플랫폼입니다. <br />
        GitHub은 Git이라는 분산 버전 관리 시스템을 사용하여 소스 코드의 변경
        내역을 추적하고, 여러 개발자가 동시에 협업할 수 있도록 도와줍니다.{' '}
        <br />
        GitHub은 특히 오픈 소스 프로젝트와 개인 프로젝트를 저장하고 관리하는 데
        널리 사용됩니다.
      </RegularText>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 2.5rem 0;
`;

export default GitHub;
