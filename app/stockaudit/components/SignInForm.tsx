'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { errorType, useAuth } from '@/services/hooks/auth/hook';
import { toast } from 'sonner';

interface SignInFormProps {
  switchToRegister: () => void;
  closeModal: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ switchToRegister }) => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>();

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    data,
    error: mutateError,
  } = useAuth();

  const handleLogin = () => {
    if (!email || !password) setError('Enter email and password');
    else mutate({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      toast('Login succesfully');
      document.cookie = `token=${data.accessToken}; max-age=86400; path=/; secure;`;
      router.push('/auditcalculator'); // Navigate to AuditCalculator page
    } else if (isError) {
      const error = mutateError as unknown as errorType;
      const errMsg = error.response.data.error;
      setError(errMsg);
      console.error(mutateError);
    }
  }, [isSuccess, isError, error, data, mutateError]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
      <h2 className="text-2xl font-bold text-[#000] mb-4 text-center">
        Sign In
      </h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
          onClick={handleLogin}
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p
        className="text-blue-600 text-sm mt-4 text-center cursor-pointer"
        onClick={switchToRegister}
      >
        New User? Register
      </p>
    </div>
  );
};

export default SignInForm;
