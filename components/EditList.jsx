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
      console.log(addedQuest);
      return;
    }
    console.log(addedQuest);
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
      console.log(user.id);
      console.log(listData.user_id);
      router.replace(`/`);
      return;
    } else {
      return (
        <div>
          <h1>{listData.title}</h1>

          <p>{listData.description}</p>
          {!questStateError &&
            questDataState.map(({ id, name, description }) => {
              return (
                <Quest
                  key={id}
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
