"use client"
import Register from "@/components/Register";
import {useRouter} from "next/navigation";
import { useEffect } from "react";

function Page() {
  const router = useRouter();
  useEffect(()=>{
    
    router.push('/');
  }, [router])
}
export default Page;
