"use client"

import { useState, useEffect } from "react";
import { getListQuests, getUserLists } from "@/utils/apiFunctions";
import Link from "next/link";

const ProfilePartial = ({ username, id }) => {

const [loading, setLoading]=useState(true);
const [listData, setListData]=useState();
const [listError, setListError]=useState(false);
const [questData, setQuestData]=useState();
const [questError, setQuestError]=useState(false)

    useEffect(()=>{
      async function getData(){
        setLoading(true);
        const lists = await getUserLists(id);
        setListData(lists.listData);
        setListError(lists.listError);

        if(!lists.listData || lists?.listData.length===0){
          setLoading(false);
          setQuestError(true);
          return
        }
        else{
          const quests = await getListQuests(lists.listData[0].id);
          console.log(lists.listData[0])
          setQuestData(quests.questData);
          setQuestError(quests.questError);
  
          setLoading(false);

        }

    



  



      }

      getData();

    }, [id, username])

if(loading){
  return <div role="status" className="  flex justify-center items-center " >
  <svg aria-hidden="true" class=" w-4  h-4 text-White-Smoke animate-spin dark:text-White-Smokel  fill-black " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  <span className="sr-only">Loading...</span>
</div>
}

if(questError){

  return  <div className=" animate-pulse text-white text-xs m-6 transition-opacity ease-in duration-700 opacity-100  md:text-base " >

  <Link className=" w-max " 

      href={`/user/${username}`}
     /* className=" m-4 p-6 h-32 w-48 button small text-center text-white  self-center bg-blue-600 border-white border-4 text-3xl border-double "*/
  >
    <span className=" font-extrabold   " >{username}&#x27;s </span>
    <span>Quests</span>
  </Link>
  
  
    <span > Have Been Hidden From Your Gaze</span>
  
   

  

  
</div>

}
  

  return (
    <div className="m-6 animate-pulse transition-opacity ease-in duration-700 opacity-100">
      {/*<div className=" px-10 py-8 my- border-white border-2 grid grid-flow-row ">

        {!listData&&(
          <p className="border-white bg-blue-600 p-4 mr-8 border-2 text-white text-center self-center">
          The forces of darkness have intervened, and hidden {username}&#39;s
          adventures from our gaze.
        </p>
        )}

        {!!listData&&listData.length===0&& <p className="border-white bg-blue-600 p-4 mr-8 border-2 text-white text-center self-center">
        {username} has taken a break from questing for now, and has no new
        adventures to share.
      </p>

        }


          {!!listData&&listData.length!=0&&(<>
        <p className="text-white"> {listData[0].title}</p>
        <p className="text-white pb-6">{listData[0].description}</p>
        </>
          )}


        {!!questData&&questData
          .slice(0, 1)
          .map(({ id, name, description, completion_status }) => {
            return (
              <div key={id} className=" text-white text-right " >

                <span className=" font-extrabold " >{username}</span>
                {completion_status && (
                  <span > Has Completed Their Quest</span>
                )}
                {!completion_status && (
                  <span > Continues Their Quest</span>
                )}

                <p className="text-white italic"> {name}</p>

                
              </div>
            );
          })}
        </div>*/}
          {!!questData&&questData
          .slice(0, 1)
          .map(({ id, name, description, completion_status }) => {
            return (
              <div key={id} className=" text-white text-xs  md:text-base " >

                <Link className=" w-max " 
        
                    href={`/user/${username}`}
                   /* className=" m-4 p-6 h-32 w-48 button small text-center text-white  self-center bg-blue-600 border-white border-4 text-3xl border-double "*/
                >
                  <p className=" font-extrabold   " >{username}</p>
                </Link>
                
                {completion_status && (
                  <span > Has Completed Their Quest</span>
                )}
                {!completion_status && (
                  <span > Continues Their Quest</span>
                )}

                <p className="text-white italic   "> {name}</p>

                
              </div>
            );
          })}
    </div>
  );
};

export default ProfilePartial;
