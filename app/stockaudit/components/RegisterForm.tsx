"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  switchToSignIn: () => void;
  closeModal: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ switchToSignIn, closeModal }) => {
  const router = useRouter();

  const handleRegister = () => {
    closeModal(); // Close modal
    router.push("/auditcalculator"); // Navigate to AuditCalculator page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#000]">Register</h2>
      <form className="space-y-4">
        <input type="text" placeholder="First Name" className="w-full p-2 border rounded-md" />
        <input type="text" placeholder="Last Name" className="w-full p-2 border rounded-md" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" />
        <input type="password" placeholder="Confirm Password" className="w-full p-2 border rounded-md" />
        
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="w-4 h-4" />
          Accept Terms and Conditions
        </label>

        <button type="button" className="w-full bg-slate-600 text-white py-2 rounded-md" onClick={handleRegister}>
          Register
        </button>
      </form>
      
      <p className="text-blue-600 text-sm mt-4 text-center cursor-pointer" onClick={switchToSignIn}>
        Already a member? Sign in
      </p>
    </div>
  );
};

export default RegisterForm;
