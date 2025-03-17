'use client';

import React, { useState } from 'react';
import TextInput from '@/app/landing/components/inputs/TextInput';
import ShadowContainer from '@/app/landing/components/ShadowContainer';
import { RegisterBtn } from '@/app/landing/components/buttons/solidButton';

const Page = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  interface IInputItems {
    name: string;
    value: string;
    type: string;
    setValue: (value: string) => void;
    error?: '';
  }

  const inputItems: IInputItems[] = [
    {
      name: 'First Name',
      type: 'text',
      value: firstName,
      setValue: setFirstName,
    },
    {
      name: 'Last Name',
      type: 'text',
      value: lastName,
      setValue: setLastName,
    },
    {
      name: 'Last Name',
      type: 'text',
      value: lastName,
      setValue: setLastName,
    },
    {
      name: 'email',
      type: 'text',
      value: email,
      setValue: setEmail,
    },
    {
      name: 'Password',
      type: 'password',
      value: password,
      setValue: setPassword,
    },
    {
      name: 'Confirm password',
      type: 'password',
      value: password2,
      setValue: setPassword2,
    },
  ];

  const handleClick = () => {
    console.log('loggig in');
  };

  return (
    <div className="w-screen bg-white flex items-center justify-center py-[5rem]">
      <ShadowContainer>
        <h2 className="font-semibold text-3xl text-center">MCOM</h2>
        {inputItems.map((items, i) => {
          const { name, type, value, setValue, error } = items;
          return (
            <div key={i}>
              <TextInput
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={name}
              />
              {error && <p className="text-red-600">{error}</p>}
            </div>
          );
        })}
        <div className="self-center">
          <RegisterBtn onClick={handleClick}>Create an account</RegisterBtn>
        </div>
      </ShadowContainer>
    </div>
  );
};

export default Page;
