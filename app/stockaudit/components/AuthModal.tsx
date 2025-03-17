import React, { useState } from 'react';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, closeModal }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg">
          <button
            className="absolute top-2 right-3 text-gray-600"
            onClick={closeModal}
          >
            ✖
          </button>
          {isSignIn ? (
            <SignInForm
              switchToRegister={() => setIsSignIn(false)}
              closeModal={closeModal}
            />
          ) : (
            <RegisterForm switchToSignIn={() => setIsSignIn(true)} />
          )}
        </div>
      </div>
    )
  );
};

export default AuthModal;
