import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface SnackbarProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <SnackbarContainer show={show}>
      <SnackbarMessage>{message}</SnackbarMessage>
    </SnackbarContainer>
  );
};

export default Snackbar;

const SnackbarContainer = styled.div<{ show: boolean }>`
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  left: 50%;
  top: ${(props) => (props.show ? '20px' : '-100px')};
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  ${theme.font.bold16}
  color: #fff;
  text-align: center;
  border-radius: 1rem;
  padding: 1.5rem;
  position: fixed;
  z-index: 1;
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition:
    opacity 0.5s,
    visibility 0.5s,
    top 0.5s;
`;

const SnackbarMessage = styled.span`
  margin-left: 1.5rem;
  color: #fff;
`;
