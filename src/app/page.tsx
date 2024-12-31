// app/page.tsx
"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import Layout from "@/app/components/Layout";
import Home from "./home/page";

export default function App() {
  const [userType, setUserType] = useState("");
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
