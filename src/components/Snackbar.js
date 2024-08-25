// src/components/Snackbar.js
import React from 'react';
import { Transition } from 'react-transition-group';

const transitionStyles = {
  entering: { opacity: 1, transform: 'translateY(0)' },
  entered: { opacity: 1, transform: 'translateY(0)' },
  exiting: { opacity: 0, transform: 'translateY(100%)' },
  exited: { opacity: 0, transform: 'translateY(100%)' },
};

function Snackbar({ message, type, visible, onClose }) {
  return (
    <Transition in={visible} timeout={300} onExited={onClose}>
      {(state) => (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
          style={{
            ...transitionStyles[state],
            transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
          }}
        >
          {message}
        </div>
      )}
    </Transition>
  );
}

export default Snackbar;
