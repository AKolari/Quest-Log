"use client";
import useLogged from "@/hooks/useLogged";
import { notFound, useRouter } from "next/navigation";
import {
  getListById,
  getListQuests,
  addNewQuest,
  addNewList,
} from "@/utils/apiFunctions";
import Quest from "@/components/Quest";
import { useState } from "react";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
const CreateList = () => {
  const { user, error, loaded, refreshUser } = useUser();
  const router = useRouter();

  useLogged("in", "/");
  const [numOfQuests, setNumOfQuests] = useState(3);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [newList, setNewList] = useState(undefined);
  const [questTitles, setQuestTitles] = useState(["", "", ""]);
  const [questDescriptions, setQuestDescriptions] = useState(["", "", ""]);

  const [questName, setQuestName] = useState("");
  const [questDescription, setQuestDescription] = useState("");

  const addList = async (e) => {
    e.preventDefault();

    const addedList = await addNewList(user.id, listTitle, listDescription);
    if (addedList.success == false) {
      console.log(addedList);
      return;
    } else {
      setNewList(addedList);
      console.log(addedList.data.id);
      for (let i = 0; i < numOfQuests; i++) {
        const addedQuest = await addNewQuest(
          addedList.data.id,
          i,
          questTitles[i],
          questDescriptions[i]
        );

        if (addedQuest.success == false) {
          console.log(addedQuest);
          return;
        }
      }
      router.replace("/");
    }
  };

  const updateQuestTitles = (e, i) => {
    e.preventDefault();
    const tempArray = [...questTitles];

    tempArray[i] = e.target.value;
    setQuestTitles(tempArray);
  };

  const updateQuestDescriptions = (e, i) => {
    e.preventDefault();
    const tempArray = [...questDescriptions];

    tempArray[i] = e.target.value;
    setQuestDescriptions(tempArray);
  };

  const addQuest = async (e) => {
    e.preventDefault();

    const order = questDataState.length + 1;

    const addedQuest = await addNewQuest(
      list_id,
      order,
      questName,
      questDescription
    );

    if (addedQuest.success == false) {
      console.log(addedQuest);
      return;
    }

    setQuestName("");
    setQuestDescription("");
    setLoading(true);
    //await refreshUser();
  };

  if (!loaded) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <p>Add New List:</p>

        <form onSubmit={addList}>
          <p className="my-5">
            <label htmlFor="title" className="inline-block w-[75px]">
              List Title
            </label>
            <input
              id="title"
              className="border border-2 border-black px-2"
              value={listTitle}
              onChange={(e) => {
                setListTitle(e.target.value);
              }}
              required
              type="text"
            />
          </p>
          <p className="my-5">
            <label htmlFor="description" className="inline-block w-[75px]">
              List Description
            </label>
            <input
              className="border border-2 border-black px-2"
              id="description"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              type="text"
            />
          </p>
          {questTitles.map((quest, i) => {
            return (
              <p key={i} className="my-5">
                <label htmlFor={`title${i}`} className="inline-block w-[75px]">
                  Quest Title
                </label>
                <input
                  id={`title${i}`}
                  className="border border-2 border-black px-2"
                  value={questTitles[i]}
                  onChange={(e) => {
                    updateQuestTitles(e, i);
                  }}
                  required
                  type="text"
                />
                <label
                  htmlFor={`description${i}`}
                  className="inline-block w-[75px]"
                >
                  Quest Description
                </label>
                <input
                  className="border border-2 border-black px-2"
                  id={`description${i}`}
                  value={questDescription[i]}
                  onChange={(e) => {
                    updateQuestDescriptions(e, i);
                  }}
                  type="text"
                />
              </p>
            );
          })}

          <p className="text-center">
            <input type="submit" className="button small" />
          </p>
        </form>
      </div>
    );
  }
};
export default CreateList;
