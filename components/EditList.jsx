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
import Quest from "@/components/Quest";
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

  const updateOrder = async (i, direction) => {
    const tempArray = [...questOrders];
    if (direction == "up") {
      if (i != 0) {
        let temp = tempArray[i];
        tempArray[i] = tempArray[i - 1];
        tempArray[i - 1] = temp;

        setQuestOrders(tempArray);
        /*
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

        if (questIds[i - 1]) {
          const addedQuest = await editQuestById(
            questIds[i - 1],
            questOrders[i - 1],
            questTitles[i - 1],
            questDescriptions[i - 1]
          );

          if (addedQuest.success == false) {
            console.log(questIds[i - 1]);
            console.log(questOrders[i - 1]);
            console.log(questTitles[i - 1]);
            console.log(questDescriptions[i - 1]);
            console.log(addedQuest);
            return;
          }
        } else {
          const addedQuest = await addNewQuest(
            listId,
            questOrders[i - 1],
            questTitles[i - 1],
            questDescriptions[i - 1]
          );
        }
        */
      }
    } else {
      if (i != numOfQuests - 1) {
        let temp = tempArray[i];
        tempArray[i] = tempArray[i + 1];
        tempArray[i + 1] = temp;
        setQuestOrders(tempArray);
        /*
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

        if (questIds[i + 1]) {
          const addedQuest = await editQuestById(
            questIds[i + 1],
            questOrders[i + 1],
            questTitles[i + 1],
            questDescriptions[i + 1]
          );

          if (addedQuest.success == false) {
            console.log(questIds[i + 1]);
            console.log(questOrders[i + 1]);
            console.log(questTitles[i + 1]);
            console.log(questDescriptions[i + 1]);
            console.log(addedQuest);
            return;
          }
        } else {
          const addedQuest = await addNewQuest(
            listId,
            questOrders[i - 1],
            questTitles[i - 1],
            questDescriptions[i - 1]
          );
        }*/
      }
    }
  };

  if (loading || !loaded) {
    return <div>Loading</div>;
  } else {
    if (user.id !== localId) {
      router.replace(`/`);
      return;
    } else {
      return (
        <div className="text-white bg-black">
          <div className=" border-white border-2 flex justify-center">
            <p className="text-4xl text-center py-6 ">Add New List:</p>
          </div>

          <div className="border-2 border-white flex justify-center">
            <form onSubmit={addList}>
              <div className="m-5 p-3">
                <p className="my-5 border-white border-2 bg-blue-600 ">
                  <label htmlFor="title" className=" m-3 inline-block w-[75px]">
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
              </div>
              <div className="border-white border-2 bg-blue-600">
                <p className="my-5">
                  <label
                    htmlFor="description"
                    className="inline-block w-[75px] m-3"
                  >
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
              </div>
              {questTitles.map((quest, i) => {
                return (
                  <p key={i} className="my-5">
                    <div className="border-2 border-white bg-blue-600">
                      <label
                        htmlFor={`title${i}`}
                        className="inline-block w-[75px]"
                      >
                        Quest Title
                      </label>
                      <input
                        id={`title${i}`}
                        className="border border-2 border-black px-2"
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
                        className="border border-2 border-black px-2"
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
                  </p>
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
};
export default EditList;

/*
"use client";
import { notFound, useRouter } from "next/navigation";
import { getListById, getListQuests, addNewQuest } from "@/utils/apiFunctions";
import Quest from "@/components/Quest";
import { useState } from "react";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";

const EditList = ({ list_id }) => {
  const { user, error, loaded, refreshUser } = useUser();
  const router = useRouter();

  const [listData, setListData] = useState(undefined);
  const [questDataState, setQuestDataState] = useState([]);
  const [questStateError, setQuestStateError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [questName, setQuestName] = useState("");
  const [questDescription, setQuestDescription] = useState("");


  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");

  const [questTitles, setQuestTitles] = useState(["", "", ""]);
  const [questDescriptions, setQuestDescriptions] = useState(["", "", ""]);



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
      setListData(data);
      console.log(data);

      const { questData, questError } = await getListQuests(list_id);
      if (questError) {
        setQuestStateError(true);
      }
      setQuestDataState(questData);

      setLoading(false);
    };

    getData();
  }, [list_id, refresh]);


 




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
      return;
    }

    setQuestName("");
    setQuestDescription("");
    setRefresh(true);
    setLoading(true);
    //refreshUser();
  };

  if (loading || !loaded) {
    return <div>Loading</div>;
  } else {
    if (user.id !== listData.user_id) {
      router.replace(`/`);
      return;
    } else {
      return (
        <div>
          <h1>{listData.title}</h1>

          <p>{listData.description}</p>
          {!questStateError &&
            questDataState.map(({ id, name, description }, i) => {
              return (
                <Quest
                  key={i}
                  quest_name={name}
                  quest_description={description}
                />
              );
            })}
          <p>Add New Quest:</p>

          <form onSubmit={addQuest}>
            <p className="h2">Add New Quest</p>
            <p className="my-5">
              <label htmlFor="name" className="inline-block w-[75px]">
                Quest Name
              </label>
              <input
                id="name"
                className="border border-2 border-black px-2"
                value={questName}
                onChange={(e) => setQuestName(e.target.value)}
                required
                type="text"
              />
            </p>
            <p className="my-5">
              <label htmlFor="description" className="inline-block w-[75px]">
                Description
              </label>
              <input
                className="border border-2 border-black px-2"
                id="description"
                value={questDescription}
                onChange={(e) => setQuestDescription(e.target.value)}
                required
                type="text"
              />
            </p>
            <p className="text-center">
              <input type="submit" className="button small" />
            </p>
          </form>
        </div>
      );
    }
  }
};
export default EditList;
*/
