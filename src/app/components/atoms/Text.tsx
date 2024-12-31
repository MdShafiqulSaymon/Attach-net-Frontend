"use client";

import React from 'react';

interface TextProps {
  text: string;
  textColor?: string; // Allows text color customization
  gradient?: string;  // Allows gradient customization
  className?: string; // Additional custom classes
  onClick?:()=>void;
}

const Text: React.FC<TextProps> = ({
  text,
  textColor,
  gradient,
  className,
  onClick
}) => {
  return (
    <h1
      className={`z-10 font-bold text ${textColor} bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`} onClick={onClick}
    >
      {text}
    </h1>
  );
};

export default Text;
