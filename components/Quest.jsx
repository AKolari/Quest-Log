"use client"

import { useState } from "react";
import { editQuestById } from "@/utils/apiFunctions";

const Quest = ({ id, name, description, order, editable, completion }) => {


const [loading, setLoading]=useState(false);
const [completionState, setCompletionState]=useState(completion)



  const updateQuest = async (
    id,
    name,
    description,
    order,
    completion_status
  ) => {
    setLoading(true);
    if (completion_status == false) {
      const updateResponse = await editQuestById(
        id,
        order,
        name,
        description,
        true
      );
      console.log(updateResponse);
    } else {
      const updateResponse = await editQuestById(
        id,
        order,
        name,
        description,
        false
      );
      console.log(updateResponse);
    }
    setLoading(false);
  };
  return (
    <div className="text-white">
     
     
     
      <h1 className= {`  ${completionState? "line-through":""}   w-[220px] px-2 h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block `}>
        {name}
      </h1>

      <button
                            onClick={() => {
                              setCompletionState(!completionState)
                              updateQuest(
                                id,
                                name,
                                description,
                                order,
                                completion
                              );
                              
                            }}
                          >
                            Complete?
                          </button>
      
      
      {/*<p className="h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block w-[220px] px-2">
        {quest_description}
  </p>*/}




    </div>
  );
};
export default Quest;
