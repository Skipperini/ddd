import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles/dialog.css';

const Dialog = ({ isOpen, onClose, content }) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="dialog"
      unmountOnExit
      onExited={onClose}
    >
      <div className="dialog-overlay">
        <div className="dialog-content">
          {content}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Dialog;
