import React from 'react';
import styled from 'styled-components';
import { useToggle } from './myHooks';

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: ${(props) => (props.variant === 'primary' ? 'blue' : 'gray')};
`;

const PrimaryButton = styled(Button)`
  background-color: #F08080;
`;

const SecondaryButton = styled(Button)`
  background-color: gray;
`;

function LoginControl() {
  const [isLoggedIn, toggleIsLoggedIn] = useToggle(false);

  const handleLoginClick = () => {
    toggleIsLoggedIn();
  };

  const handleLogoutClick = () => {
    toggleIsLoggedIn();
  };

  return (
    <div>
      {isLoggedIn ? (
        <SecondaryButton variant="primary" onClick={handleLogoutClick}>
          Logout
        </SecondaryButton>
      ) : (
        <PrimaryButton onClick={handleLoginClick}>
          Login
        </PrimaryButton>
      )}
    </div>
  );
}

export default LoginControl;
