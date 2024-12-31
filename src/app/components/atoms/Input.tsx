import React from "react";

interface InputProps {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  placeholder,
  required,
  pattern,
  value,
  error,
  onChange,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`bg-gray-50 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5`}
      placeholder={placeholder}
      required={required}
      pattern={pattern}
    />
  </div>
);

export default Input;
