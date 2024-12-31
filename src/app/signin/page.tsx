"use client";

import Button from "@/app/components/atoms/Button";
import Text from "@/app/components/atoms/Text";
import { useState } from 'react';
import Head from "next/head";
import Layout from "@/app/components/Layout";
import SignIn from "./Signin";

export default function SignInPage() {
  const [userType, setUserType] = useState('');

  const handleSignIn = () => {
    console.log("sign in as:", userType);
  };

  return (
   <Layout>
    <SignIn/>
   </Layout>
  );
}