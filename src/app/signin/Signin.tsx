"use client";
import { redirect } from "next/navigation";
import { useState, ChangeEvent } from "react";
import Button from "@/app/components/atoms/Button";
import Text from "@/app/components/atoms/Text";
import Input from "../components/atoms/Input";
import AttachNetLogo from "../components/AttachNetLogo";
import { useAuth } from "../hooks/useAuth";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const { login, isLoading, error } = useAuth();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignIn = async () => {
    const success = await login(formData);
    if (success) {
      redirect("/dashboard"); 
    }
  };

  const redirectSignUp = () => {
    redirect("/signup");
  };

  const inputFields = [
    {
      id: "email",
      type: "text",
      label: "Email",
      placeholder: "saymon@gmail.com",
      required: true,
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "**********",
      required: true,
    },
  ] as const;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="welcome h-4/6 w-3/12 bg-transparent flex flex-col overflow-hidden rounded-lg border-2">
        <div className="w-full flex flex-col gap-8 items-center pt-8">
          <AttachNetLogo />

          <Text
            text="Sign In"
            gradient="from-blue-500 via-purple-500 to-indigo-500"
            className="text-4xl font-bold"
          />

          {inputFields.map((item) => (
            <Input
              key={item.id}
              {...item}
              onChange={handleInputChange}
              value={formData[item.id as keyof FormData]} 
            />
          ))}

          {error && (
            <span className="text-red-500 text-sm">{String(error)}</span>
          )}

          <Button
            text={isLoading ? "Signing In..." : "Get Started"}
            className="relative mt-4 w-4/5 h-14 py-3 text-white rounded-lg transition-all duration-300 
                     bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 
                     hover:from-blue-700 hover:via-purple-700 hover:to-pink-600
                     focus:ring-4 focus:outline-none focus:ring-purple-300 focus:ring-opacity-50
                     transform hover:scale-105
                     shadow-lg hover:shadow-xl
                     overflow-hidden text-xl font-bold"
            onClick={handleSignIn}
            disabel={isLoading}
          />

          <div className="flex flex-row">
            <span>Don't have an Account?</span>
            <Text
              text="Sign Up"
              gradient=" bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
              className="text-sm font-bold justify-items-start cursor-pointer"
              onClick={redirectSignUp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
