"use client";

import { useState } from "react";
import { editQuestById } from "@/utils/apiFunctions";

const Quest = ({ id, name, description, order, editable, completion }) => {
  const [loading, setLoading] = useState(false);
  const [completionState, setCompletionState] = useState(completion);

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
      <button
        onClick={() => {
          setCompletionState(!completionState);
          updateQuest(id, name, description, order, completion);
        }}
      >
        <h1
          className={`  ${
            completionState ? "line-through" : ""
          }    border-black ml-5 inline-block `}
        >
          {name}
        </h1>
      </button>
    </div>
  );
};
export default Quest;
