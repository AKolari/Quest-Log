"use client"

import { useState, useEffect } from "react";
import { getListQuests, getUserLists } from "@/utils/apiFunctions";

const ProfilePartial = ({ username, id }) => {

const [loading, setLoading]=useState(false);
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

        if(!lists.listData){
          return
        }

        const quests = await getListQuests(lists.listData[0].id);
        console.log(lists.listData[0])
        setQuestData(quests.questData);
        setQuestError(quests.questError);



  



      }

      getData();

    }, [id, username])


  

  return (
    <div className="m-6  bg-blue-600">
      <div className=" px-10 py-8 my- border-white border-2 grid grid-flow-row ">

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
          .slice(0, 3)
          .map(({ id, name, description, completion_status }) => {
            return (
              <div key={id}>
                <p className="text-white"> {name}</p>

                {completion_status && (
                  <p className="text-amber-400">QUEST Complete</p>
                )}
                {!completion_status && (
                  <p className="text-red-700">QUEST NOT Complete</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProfilePartial;
