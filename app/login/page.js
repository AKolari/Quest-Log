"use client"

import Login from "@/components/Login";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function Page() {

  const router = useRouter();
  useEffect(()=>{
    
    router.push('/');
  }, [router])
 
}
export default Page;
