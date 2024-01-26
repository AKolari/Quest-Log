"use client";
import useLogged from "@/hooks/useLogged";
import useUser from "@/hooks/useUser";
import { logout } from "@/utils/apiFunctions";


const Menu = ({MenuItemHandler})=>{
const {user, error, loaded}= useUser();





return (<div className="flex-col justify-center text-white " >


    {!user&&(<>
   <button onClick={()=>{MenuItemHandler("QuestFeed")}} >QUEST LOG</button>
   <button onClick={()=>{MenuItemHandler("Login")}} >Login</button>
   <button onClick={()=>{MenuItemHandler("Register")}} >Register</button>
   </>
   )}


{user&&(<>
   <button onClick={()=>{MenuItemHandler("QuestFeed")}} >QUEST LOG</button>
   <button onClick={()=>{
    MenuItemHandler("QuestFeed");
    logout();
    
    }} >Logout</button>
   
   </>
   )}

    




</div>)




















}

export default Menu;
