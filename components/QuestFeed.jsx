"use client"

import Link from "next/link";
import ProfilePartial from "./ProfilePartial";


const QuestFeed =({profiles})=>{

    if(!profiles){
        return <p>Loading...</p>
      }

    if(profiles.error){
        return <>ERROR</>
    }

    if(profiles.data.length===0){
        return <p>No users have signed up yet</p>;
    }
    
    return<> {profiles.data.map(({ username, id }) => {

        
        return (
            
            <div key={id} className="border-white border-dotted border-2 p-2 m-5 grid grid-cols-2 self-center justify-items-center ">
               
              <Link
        
                href={`/user/${username}`}
                className=" m-4 p-6 h-32 w-48 button small text-center text-white  self-center bg-blue-600 border-white border-4 text-3xl border-double "
              >
                {username}
              </Link>
             { <ProfilePartial id={id} username={username}></ProfilePartial>}
            </div>
          
        )
      })}

</>


}
export default QuestFeed;