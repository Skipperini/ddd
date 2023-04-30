import React, { useState } from 'react';
import { Modal, Button, Spin, Input } from 'antd';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';

const Logo = styled.span`
  color: #000;
  font-weight: bold;
  font-size: 24px;
`;

const LoggedInMessage = styled.span`
  display: block;
  font-size: 12px;
  margin-top: 4px;
`;

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    setIsModalVisible(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  const handleOk = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoggedIn(true);
      setIsModalVisible(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <header>
      <div>
        <ul className="nav">
          <Logo className="logo">Kitty Shop</Logo>
          <li>
            {isLoggedIn ? (
              <>
                <Button type="primary" onClick={handleLogoutClick}>
                  Logout
                </Button>
                <LoggedInMessage>You are logged in as {username}</LoggedInMessage>
              </>
            ) : (
              <Button type="primary" onClick={handleLoginClick}>
                Login
              </Button>
            )}
          </li>
          
          <li>about us</li>
          <li>contacts</li>
        </ul>
      </div>
      <div className="baner"></div>

      <Modal
        title="Login"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="login" type="primary" loading={isLoading} onClick={handleOk}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>,
        ]}
      >
          {isLoggedIn ? (
            <p>You are logged in.</p>
          ) : (
            <div>
              <Input
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          )}

      </Modal>
    </header>
  );
};

export default Header;
