"use client";

import React from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  disabel?:boolean;
  // Update the onClick type to accept a MouseEvent parameter
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ text, className = '', onClick ,disabel }) => {
  return (
    <button
      type="button"
      className={`font-medium rounded-lg text-center ${className}`}
      onClick={onClick}
      disabled={disabel}
    >
      {text}
    </button>
  );
};

export default Button;