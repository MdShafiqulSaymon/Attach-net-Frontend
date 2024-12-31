// data.ts

import { InputField } from "../types/UserType";

// Define the departments array
export const departments = [
    "CSE",
    "EEE",
    "CE",
    "ME",
    "BME",
    "ETE",
    "MSE",
    "MIE",
    "PME",
    "WRE",
    "Archi"
  ];
  
  // Define the inputFields array with required input field configurations
  export const userInputFields:InputField[] = [
    {
      id: "username",
      type: "text",
      label: "Name",
      placeholder: "John Doe",
      required: true,
    },
    {
      id: "email",
      type: "email",
      label: "Email address",
      placeholder: "john.doe@university.edu",
      required: true,
    },
    {
      id: "batch",
      type: "text",
      label: "Batch",
      placeholder: "2019",
      required: true,
    },
    {
      id: "sid",
      type: "text",
      label: "Student ID",
      placeholder: "1904083",
      required: true,
    },
    {
      id: "dept",
      type: "text",
      label: "Department",
      placeholder: "CSE/EEE",
      required: true,
    },
    {
      id: "phone",
      type: "tel",
      label: "Phone number",
      placeholder: "123-45-678",
      pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}",
      required: true,
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "•••••••••",
      required: true,
    },
    {
      id: "confirm_password",
      type: "password",
      label: "Confirm password",
      placeholder: "•••••••••",
      required: true,
    },
  ];
  