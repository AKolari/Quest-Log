"use client"

import { useState } from "react"
import { useEffect } from "react"
import Link from "next/link"
import ProfilePartial from "./ProfilePartial"
import Menu from "./Menu"
import Quest from "./Quest"
import QuestFeed from "./QuestFeed"
import Login from "./Login"
import Register from "./Register"
import useUser from "@/hooks/useUser"



const HomeComponent = ({userProfiles})=>{

  


const [HomeItem, SetHomeItem] = useState("QuestFeed");


function MenuItemHandler(item){
  
    if(HomeItem===item){
        SetHomeItem("QuestFeed");
    }
    else{
        SetHomeItem(item)
        
    }
    

}




return <>
<div className="flex  flex-col items-center justify-between col-span-4 text-white  ">
      

     
      {HomeItem==="QuestFeed"&&<QuestFeed profiles={userProfiles} />}
      {HomeItem==="Login"&&<Login/>}
      {HomeItem==="Register"&&<Register/>}
  

      
    </div>
   <Menu MenuItemHandler={MenuItemHandler} />

</>


}

export default HomeComponent;