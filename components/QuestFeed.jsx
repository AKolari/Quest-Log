"use client"

import Link from "next/link";
import ProfilePartial from "./ProfilePartial";
import { useState, useEffect } from "react";


const QuestFeed =({profiles})=>{

  const [timer, setTimer]=useState()
  const [targetIndex, setTargetIndex]=useState(0)

    if(!profiles){
        return <p>Loading...</p>
      }

    if(profiles.error){
        return <>ERROR</>
    }

    if(profiles.data.length===0){
        return <p>No users have signed up yet</p>;
    }
    
    return<div className="grid grid-cols-2 grid-rows-4 md:grid-cols-2 lg:grid-cols-4  " > {profiles.data.map(({ username, id }) => {

        
        return (
            
            <div key={id} /*className="border-white border-dotted border-2 p-2 m-5 grid grid-cols-2 self-center justify-items-center " */>
               
             
             { <ProfilePartial id={id} username={username}></ProfilePartial>}
            </div>
          
        )
      })}

</div>


}
export default QuestFeed;