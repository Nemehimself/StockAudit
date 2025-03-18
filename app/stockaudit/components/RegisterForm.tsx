'use client';

import React, { useEffect, useState } from 'react';
import { errorType, SignupSource, useSignup } from '@/services/hooks/auth/hook';
import { toast } from 'sonner';

interface RegisterFormProps {
  switchToSignIn: () => void;
}

interface FormInterface {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  password2: string;
  signupSource: SignupSource;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ switchToSignIn }) => {
  const [formValue, setFormValue] = useState<FormInterface>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    password2: '',
    signupSource: SignupSource.STOCK_AUDIT,
  });

  const [error, setError] = useState<string | null>('');

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const {
    isSuccess,
    isError,
    error: mutateError,
    mutate,
    data,
    isPending,
  } = useSignup();

  const handleRegister = () => {
    if (Object.values(formValue).some(value => value.trim() === '')) {
      setError('Please fill in all fields');
      return;
    }

    const { password, password2, firstName, lastName, email, phoneNumber } =
      formValue;

    if (password !== password2) {
      setError('Password field must match');
    }

    const fullName = `${firstName} ${lastName}`;
    const signupSource = SignupSource.STOCK_AUDIT;

    mutate({ fullName, email, phoneNumber, signupSource, password, password2 });
  };

  useEffect(() => {
    if (isSuccess) {
      toast('Account created succesfully', {
        description: 'You can now log in',
      });
      switchToSignIn();
    } else if (isError) {
      const error = mutateError as unknown as errorType;
      const errMsg = error.response.data.error;
      setError(errMsg);
      console.error(mutateError);
    }
  }, [isSuccess, isError, error, data, mutateError, switchToSignIn]);

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#000]">
        Register
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          className="w-full p-2 border rounded-md"
          value={formValue.firstName}
          onChange={handleValueChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          className="w-full p-2 border rounded-md"
          value={formValue.lastName}
          onChange={handleValueChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
          value={formValue.email}
          onChange={handleValueChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone number"
          className="w-full p-2 border rounded-md"
          value={formValue.phoneNumber}
          onChange={handleValueChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md"
          value={formValue.password}
          onChange={handleValueChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded-md"
          value={formValue.password2}
          onChange={handleValueChange}
        />

        {error && <p className="text-red-600">{error}</p>}

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="w-4 h-4" />
          Accept Terms and Conditions
        </label>

        <button
          type="button"
          className="w-full bg-slate-600 text-white py-2 rounded-md"
          onClick={handleRegister}
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Register'}
        </button>
      </form>

      <p
        className="text-blue-600 text-sm mt-4 text-center cursor-pointer"
        onClick={switchToSignIn}
      >
        Already a member? Sign in
      </p>
    </div>
  );
};

export default RegisterForm;
