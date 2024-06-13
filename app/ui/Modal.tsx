import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full h-full max-w-none max-h-none">
        <div className="flex justify-end p-2">
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            Close Preview
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
