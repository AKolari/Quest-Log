"use client";
import useLogged from "@/hooks/useLogged";
import useUser from "@/hooks/useUser";
import { logout } from "@/utils/apiFunctions";
import { useState, useEffect } from "react";


const Menu = ({MenuItemHandler, currentMenuItem, user})=>{
//const {user, error, loaded}= useUser();





return (<div className=" flex h-1/2  flex-col justify-center items-center text-end pr-12 text-Silver  " >


<p className=" h-1/6  " ><button className={`   text-3xl ${currentMenuItem==="QuestFeed"? ' underline text-White-Smoke ': ''} hover:text-4xl`}  onClick={()=>{MenuItemHandler("QuestFeed")}} >QUEST LOG</button></p>
  

    {!user&&(< >
    <p><button className={`${currentMenuItem==="Login"? ' underline text-White-Smoke ': ''} hover:text-xl`}  onClick={()=>{MenuItemHandler("Login")}} >Login</button></p>
   <p><button className={`${currentMenuItem==="Register"? ' underline text-White-Smoke ': ''} hover:text-xl`}  onClick={()=>{MenuItemHandler("Register")}} >Register</button></p>
   </>
   )}


{user&&(<>
   <p className="hover:text-xl" >Welcome, {user.questMeta.username}</p>
   <button className="hover:text-xl"  onClick={()=>{
    MenuItemHandler("QuestFeed");
    logout();
    
    }} >Logout</button>
   
   </>
   )}

    




</div>)




















}

export default Menu;
