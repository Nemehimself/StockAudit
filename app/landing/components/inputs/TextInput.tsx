import React from 'react';

interface TextInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = 'w-[402px]',
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded-lg p-2 focus:outline-primary ${className}`}
    />
  );
};

export default TextInput;
