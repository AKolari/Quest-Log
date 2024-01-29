"use client"
import Register from "@/components/Register";
import Router from "next/navigation";

function Page() {
  const router = useRouter();
  useEffect(()=>{
    
    router.push('/');
  }, [router])
}
export default Page;
