"use client"

import Login from "@/components/Login";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  router.push('/');
}
export default Page;
