"use client";
import { redirect } from 'next/navigation'
import Button from "@/app/components/atoms/Button";
import Text from "@/app/components/atoms/Text";
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import Head from "next/head";
import AttachNetLogo from '../components/AttachNetLogo';
import Dropdown from '../components/Dropdown';

export default function Home() {
  const [userType, setUserType] = useState('');
  const {setUser}=useAuthStore()
  const rolesOption=["Teacher", "Student","Admin"]
  const handleRoleSelect = (option: string) => {
    setUserType(option);
    console.log("Selected Role:", option);
  };
  const handleHome = () => {
    if (!userType) return;
    setUser({
        id: 0,
        sid: '',
        username: '',
        batch: '',
        dept: '',
        email: '',
        role: userType as 'teacher' | 'student' | 'admin',
        number: ''
      });
    redirect("/signup")
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="welcome h-3/5 w-3/12 bg-transparent flex flex-col overflow-hidden rounded-lg border-2">
        <div className="w-full flex flex-col gap-8 items-center pt-8">

          <AttachNetLogo/>

          <Text
            text="Welcome To Attach-Net"
            gradient="from-blue-500 via-purple-500 to-indigo-500"
            className="text-4xl font-bold"
          />
          <Text
            text="Choose your role"
            gradient="from-blue-500 via-purple-500 to-indigo-500"
            className="text-sm font-bold justify-items-start"
          />

          <Dropdown
          label="Choose your role"
          options={rolesOption}
          onSelect={handleRoleSelect}
          className='w-4/5'
          />

          <Button
            text="Get Started"
            className="relative mt-4 w-4/5 h-14 py-3 text-white rounded-lg transition-all duration-300 
                     bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 
                     hover:from-blue-700 hover:via-purple-700 hover:to-pink-600
                     focus:ring-4 focus:outline-none focus:ring-purple-300 focus:ring-opacity-50
                     transform hover:scale-105
                     shadow-lg hover:shadow-xl
                     before:absolute before:inset-0 before:bg-gradient-to-r 
                     before:from-pink-500 before:via-purple-600 before:to-blue-600
                     before:opacity-0 before:transition-opacity before:duration-300
                     hover:before:opacity-100
                     overflow-hidden text-xl font-bold"
            onClick={handleHome}
          />
          <div className="flex flex-row"> 
          <span>Already have an Account?</span>
          <Text
            text="Sign In"
            gradient="from-blue-500 via-purple-500 to-indigo-500"
            className="text-sm font-bold justify-items-start"
          />
          </div>
          
        </div>
      </div>
    </div>
  );
}