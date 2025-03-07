"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SignInFormProps {
  switchToRegister: () => void;
  closeModal: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ switchToRegister, closeModal }) => {
  const router = useRouter();

  const handleLogin = () => {
    closeModal(); 
    router.push("/auditcalculator"); // Navigate to AuditCalculator page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-[#000] mb-4 text-center">Sign In</h2>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" />
        <button type="button" className="w-full bg-blue-600 text-white py-2 rounded-md" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p className="text-blue-600 text-sm mt-4 text-center cursor-pointer" onClick={switchToRegister}>
        New User? Register
      </p>
    </div>
  );
};

export default SignInForm;
