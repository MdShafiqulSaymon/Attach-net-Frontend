import React, { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  className?: string;
  onSelect: (value: string) => void;
  error?: string;
  required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  className,
  error,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isTouched) {
      setIsTouched(true);
    }
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleBlur = () => {
    // Close dropdown on blur and mark as touched
    setTimeout(() => {
      setIsOpen(false);
      setIsTouched(true);
    }, 200); // Small delay to allow click to register
  };

  return (
    <div className={`relative ${className || ""}`}>
      <label className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        onBlur={handleBlur}
        className={`w-full max-w-96 bg-gray-50 border ${
          error 
            ? 'border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
        } text-sm font-medium rounded-lg px-5 py-2.5 inline-flex items-center 
        dark:bg-gray-700 dark:text-white dark:border-gray-600
        transition-colors duration-200
        ${error ? 'hover:bg-red-50' : 'hover:bg-gray-100'}`}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="dropdown-options"
      >
        <span className={!selectedOption ? 'text-gray-400' : ''}>
          {selectedOption || label}
        </span>
        <svg
          className={`w-2.5 h-2.5 ml-auto transform transition-transform duration-200 
          ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          {error}
        </p>
      )}

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdown-options"
          role="listbox"
          className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-full max-w-96 
          dark:bg-gray-700 border border-gray-200 dark:border-gray-600
          animate-in fade-in duration-200"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option) => (
              <li 
                key={option}
                role="option"
                aria-selected={selectedOption === option}
              >
                <button
                  onClick={() => handleSelect(option)}
                  className={`block w-full text-left px-4 py-2 
                  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white
                  ${selectedOption === option 
                    ? 'bg-gray-100 dark:bg-gray-600' 
                    : ''}`}
                >
                  {option}
                  {selectedOption === option && (
                    <span className="float-right text-blue-600 dark:text-blue-400">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;