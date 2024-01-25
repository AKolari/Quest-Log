"use client";
import useLogged from "@/hooks/useLogged";
import { notFound, useRouter } from "next/navigation";
import {
  getListById,
  getListQuests,
  addNewQuest,
  addNewList,
  editListById,
  editQuestById,
} from "@/utils/apiFunctions";

import { useState } from "react";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";

const EditList = ({ list_id }) => {
  const { user, error, loaded, refreshUser } = useUser();
  const router = useRouter();

  useLogged("in", "/");
  const [numOfQuests, setNumOfQuests] = useState(3);
  const [listTitle, setListTitle] = useState("");
  const [localId, setLocalId] = useState("");
  const [listId, setListId] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [newList, setNewList] = useState(undefined);
  const [questTitles, setQuestTitles] = useState(["", "", ""]);
  const [questDescriptions, setQuestDescriptions] = useState(["", "", ""]);
  const [questOrders, setQuestOrders] = useState(["", "", ""]);
  const [questIds, setQuestIds] = useState(["", "", ""]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setRefresh(false);
      const { data, error: dataError } = await getListById(list_id);

      if (dataError) {
        return <p>ERROR</p>;
      }
      if (!data) {
        notFound();
      }

      console.log(data);
      setLocalId(data.user_id);
      setListTitle(data.title);
      setListDescription(data.description);
      setListId(data.id);

      const { questData, questError } = await getListQuests(list_id);
      if (questError) {
        setQuestStateError(true);
      }
      const tempNameArray = [];
      const tempDescriptionArray = [];
      const tempOrderArray = [];
      const tempIdArray = [];
      for (let i = 0; i < questData.length; i++) {
        tempNameArray[i] = questData[i].name;
        tempDescriptionArray[i] = questData[i].description;
        tempOrderArray[i] = questData[i].order;
        tempIdArray[i] = questData[i].id;
      }

      setQuestTitles([...tempNameArray]);
      setQuestDescriptions([...tempDescriptionArray]);
      setQuestOrders([...tempOrderArray]);
      setQuestIds([...tempIdArray]);
      setNumOfQuests(questData.length);

      setLoading(false);
    };

    getData();
  }, [list_id, refresh]);

  const addList = async (e) => {
    e.preventDefault();

    const addedList = await editListById(listId, listTitle, listDescription);
    if (addedList.success == false) {
      console.log(addedList);
      return;
    } else {
      setNewList(addedList);
      console.log(addedList.data);
      for (let i = 0; i < numOfQuests; i++) {
        if (questIds[i]) {
          const addedQuest = await editQuestById(
            questIds[i],
            questOrders[i],
            questTitles[i],
            questDescriptions[i]
          );

          if (addedQuest.success == false) {
            console.log(questIds[i]);
            console.log(questOrders[i]);
            console.log(questTitles[i]);
            console.log(questDescriptions[i]);
            console.log(addedQuest);
            return;
          }
        } else {
          const addedQuest = await addNewQuest(
            listId,
            questOrders[i],
            questTitles[i],
            questDescriptions[i]
          );
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

  const updateNumOfQuests = (change) => {
    if (change == 1) {
      if (numOfQuests == 100) {
        return;
      } else {
        setNumOfQuests(numOfQuests + 1);
        const tempTitleArray = [...questTitles];
        console.log(tempTitleArray);
        const tempDescriptionArray = [...questDescriptions];
        console.log(tempDescriptionArray);
        tempTitleArray.push(" ");
        tempDescriptionArray.push(" ");
        console.log(tempTitleArray);
        console.log(tempDescriptionArray);
        setQuestTitles(tempTitleArray);
        setQuestDescriptions(tempDescriptionArray);

        const tempOrderArray = [...questOrders];
        tempOrderArray.push(questOrders[numOfQuests - 1] + 1);
        setQuestOrders(tempOrderArray);
      }
    }
    if (change == 0) {
      if (numOfQuests == 1) {
        return;
      } else {
        setNumOfQuests(numOfQuests - 1);
        const tempTitleArray = [...questTitles];
        console.log(tempTitleArray);
        const tempDescriptionArray = [...questDescriptions];
        console.log(tempDescriptionArray);
        tempTitleArray.pop();
        tempDescriptionArray.pop();
        console.log(tempTitleArray);
        console.log(tempDescriptionArray);
        setQuestTitles(tempTitleArray);
        setQuestDescriptions(tempDescriptionArray);
      }
    }
  };

  if (loading || !loaded) {
    return <div>Loading</div>;
  } else {
    if (user) {
      if (user.id !== localId) {
        router.replace(`/`);
        return;
      } else {
        return (
          <div className="text-white bg-black">
            <div className=" border-white border-2 flex justify-center">
              <p className="text-4xl text-center py-6 ">Edit List:</p>
            </div>

            <div className="border-2 border-white flex justify-center">
              <form onSubmit={addList}>
                <div className="m-5 p-3">
                  <div className="my-5 border-white border-2 bg-blue-600 ">
                    <label
                      htmlFor="title"
                      className=" m-3 inline-block w-[75px]"
                    >
                      List Title
                    </label>
                    <input
                      id="title"
                      className=" border-2 border-black px-2 bg-amber-600"
                      value={listTitle}
                      onChange={(e) => {
                        setListTitle(e.target.value);
                      }}
                      required
                      type="text"
                    />
                  </div>
                </div>
                <div className="border-white border-2 bg-blue-600">
                  <div className="my-5">
                    <label
                      htmlFor="description"
                      className="inline-block w-[75px] m-3"
                    >
                      List Description
                    </label>
                    <input
                      className="border border-2 border-black px-2 bg-amber-600"
                      id="description"
                      value={listDescription}
                      onChange={(e) => setListDescription(e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                {questTitles.map((quest, i) => {
                  return (
                    <div key={i} className="my-5">
                      <div className="border-2 border-white bg-blue-600">
                        <label
                          htmlFor={`title${i}`}
                          className="inline-block w-[75px]"
                        >
                          Quest Title
                        </label>
                        <input
                          id={`title${i}`}
                          className="border border-2 border-black px-2 bg-amber-600"
                          value={questTitles[i] || " "}
                          onChange={(e) => {
                            updateQuestTitles(e, i);
                          }}
                          required
                          type="text"
                        />
                      </div>
                      <div className="mt-5 border-2 border-white bg-blue-600">
                        <label
                          htmlFor={`description${i}`}
                          className="inline-block w-[75px] m-2"
                        >
                          Quest Description
                        </label>
                        <input
                          className="border border-2 border-black px-2 bg-amber-600"
                          id={`description${i}`}
                          value={questDescriptions[i] || " "}
                          onChange={(e) => {
                            updateQuestDescriptions(e, i);
                          }}
                          type="text"
                        />
                      </div>

                      <div className="mt-5 mr-5">
                        <button
                          onClick={(e) => {
                            //e.preventDefault();

                            updateOrder(i, "up");
                            //setRefresh(true);
                          }}
                        >
                          MOVE UP
                        </button>

                        <button
                          onClick={(e) => {
                            //e.preventDefault();
                            updateOrder(i);
                            //setRefresh(true);
                          }}
                        >
                          MOVE DOWN
                        </button>
                      </div>
                    </div>
                  );
                })}

                <p className="text-center">
                  <input
                    type="submit"
                    className="button small border-white bg-blue-600 border-2 m-4 py-2 px-4"
                  />
                </p>
              </form>
            </div>

            {numOfQuests != 100 && (
              <button
                onClick={() => {
                  updateNumOfQuests(1);
                }}
                className="border-white bg-blue-600 border-2 m-4"
              >
                Add Quest
              </button>
            )}
            {/*numOfQuests != 1 && (
            <button
              onClick={() => {
                updateNumOfQuests(0);
              }}
            >
              Remove Quest
            </button>
            )NO TIME TO ADD REMOVAL*/}
          </div>
        );
      }
    }
  }
};
export default EditList;
