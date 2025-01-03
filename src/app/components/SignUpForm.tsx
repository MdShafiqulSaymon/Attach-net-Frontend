"use client";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "./atoms/Input";
import Button from "./atoms/Button";
import Dropdown from "./Dropdown";
import AgreementCheckBox from "./AgreementCheckBox";
import Text from "./atoms/Text";
import { useAuthStore } from "../store/authStore";
import { departments,userInputFields } from "../data/data";
import { FormData,FormErrors } from "../types/UserType";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { signUp, isLoading, error: apiError } = useAuth();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const {user, setUser } = useAuthStore();
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const validateField = (id: keyof FormData, value: string): string => {
    if (!value && userInputFields.find((field) => field.id === id)?.required) {
      return `${id.charAt(0).toUpperCase() + id.slice(1)} is required`;
    }

    switch (id) {
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email address"
          : "";
      case "password":
        return value.length < 8 ? "Password must be at least 8 characters" : "";
      case "sid":
        return !/^\d{7}$/.test(value)
          ? "Student ID must be exactly 7 digits"
          : "";
      case "phone":
        return !/^\d{3}-\d{2}-\d{3}$/.test(value)
          ? "Phone must match format: 123-45-678"
          : "";
      case "batch":
        return !/^20\d{2}$/.test(value)
          ? "Batch must be a valid year (e.g., 2019)"
          : "";
      default:
        return "";
    }
  };

  const handleDepartmentSelect = (option: string) => {
    setSelectedOption(option);
    setFormData((prev) => ({ ...prev, dept: option }));
    if (formErrors.dept) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.dept;
        return newErrors;
      });
    }
  };

  const handleInputChange = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([id, value]) => {
      const error = validateField(id as keyof FormData, value as string);
      if (error) newErrors[id] = error;
    });

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords don't match";
    }
    if (!isAgreementChecked) {
      newErrors.agreement = "You must agree to the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    try {
      const success = await signUp({
        username: formData.username!,
        email: formData.email!,
        batch: formData.batch!,
        sid: formData.sid!,
        role:user?.role||"student",
        dept: selectedOption || formData.dept!,
        phone: formData.phone!,
        password: formData.password!,
      });
      console.log("Response: ",success)
      
      if (success) {
        router.push("/signin");
      }
    } catch (err) {
      setFormErrors({ submit: "Failed to submit form. Please try again." });
    }
  };

  return (
    <form className="flex flex-col justify-center items-center relative max-w-4xl mx-auto p-6">
      {apiError && (
        <div className="w-full p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
          {apiError}
        </div>
      )}

      <div className="grid gap-6 mb-6 md:grid-cols-2 w-full">
        {userInputFields.map((field) =>
          field.id === "dept" ? (
            <div key={field.id} className="relative">
              <Dropdown
                label="Department"
                options={departments}
                onSelect={handleDepartmentSelect}
                error={formErrors.dept}
                required={true}
                className="w-full"
              />
              {formErrors[field.id] && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors[field.id]}
                </p>
              )}
            </div>
          ) : (
            <div key={field.id} className="relative">
              <Input
                {...field}
                value={formData[field.id] || ""}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                error={formErrors[field.id]}
              />
              {formErrors[field.id] && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors[field.id]}
                </p>
              )}
            </div>
          )
        )}
      </div>

      <AgreementCheckBox
        onChange={setIsAgreementChecked}
        error={formErrors.agreement}
      />

      {formErrors.agreement && (
        <p className="mt-1 text-sm text-red-600">{formErrors.agreement}</p>
      )}

      <div className="flex flex-row items-center gap-2 mt-4">
        <span className="text-gray-600">Already have an Account?</span>
        <Text
          text="Sign In"
          gradient="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
          className="text-sm font-bold cursor-pointer"
          onClick={() => router.push("/signin")}
        />
      </div>

      <Button
        text={isLoading ? "Signing up..." : "Submit"}
        className={`relative mt-4 w-2/5 h-14 py-3 text-white rounded-lg transition-all duration-300 
                   bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 
                   hover:from-blue-700 hover:via-purple-700 hover:to-pink-600
                   focus:ring-4 focus:outline-none focus:ring-purple-300 focus:ring-opacity-50
                   transform hover:scale-105
                   shadow-lg hover:shadow-xl
                   disabled:opacity-50 disabled:cursor-not-allowed
                   before:absolute before:inset-0 before:bg-gradient-to-r 
                   before:from-pink-500 before:via-purple-600 before:to-blue-600
                   before:opacity-0 before:transition-opacity before:duration-300
                   hover:before:opacity-100
                   overflow-hidden text-xl font-bold
                   ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
        onClick={handleSubmit}
        disabel={isLoading}
      />

      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
