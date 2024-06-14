import React from 'react';

interface ModalProps {

  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="rounded-lg shadow-lg w-full max-w-4xl h-auto max-h-screen overflow-auto">
          {children}
      </div>
    </div>
  );
};

export default Modal;
