import React from 'react';
import {useToggle} from './myHooks';

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
        <button className="logButton" onClick={handleLogoutClick}>
          Logout
        </button>
      ) : (
        <button className="logButton" onClick={handleLoginClick}>
          Login
        </button>
      )}
    </div>
  );
}

export default LoginControl;
