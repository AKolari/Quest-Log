import Menu from "@/components/Menu";
import ProfilePartial from "@/components/ProfilePartial";
import { getLatestUsers } from "@/utils/apiFunctions";
import Image from "next/image";
import Link from "next/link";
import HomeComponent from "@/components/HomeComponent";
import useUser from "@/hooks/useUser";



export default async function Home() {
  const userProfiles = await getLatestUsers(12);
  //console.log(userProfiles.data);
  
  

  if (userProfiles.error) {
    return <>ERROR </>;
  }

  if (userProfiles.data.length === 0) {
    return <p>No users have signed up yet</p>;
  }

  return (<main className="grid grid-cols-5 min-h-screen justify-center items-center font-Testing " >
    <HomeComponent userProfiles={userProfiles}  />
    
    
    </main>
  );
}
