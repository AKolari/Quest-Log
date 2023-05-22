"use client";
import Quest from "@/components/Quest";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { useEffect } from "react";

import {
  editQuestById,
  getListQuests,
  getQuestByQuestId,
  getUserById,
  getUserByUsername,
  getUserLists,
  logout,
} from "@/utils/apiFunctions";
import { notFound } from "next/navigation";

export const revalidate = 30;

const Profile = ({ username }) => {
  const { user, error: userError, loaded } = useUser();

  const [userStateData, setUserStateData] = useState(undefined);
  const [listStateData, setListStateData] = useState([]);
  const [questStateData, setQuestStateData] = useState([]);
  const [questStateError, setQuestStateError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const { data: userData, error: userError } = await getUserByUsername(
        username
      );
      if (userError) {
        return <p>ERROR</p>;
      }
      if (!userData) {
        notFound();
      }
      setUserStateData(userData);

      const { listData, listError } = await getUserLists(userData.id);

      if (listError) {
        return <p>ERROR</p>;
      }
      if (!listData) {
        notFound();
      }
      setListStateData(listData);

      let questList = [[]];
      for (let i = 0; i < listData.length; i++) {
        const { questData, questError } = await getListQuests(listData[i].id);
        if (questError) {
          return <p>ERROR</p>;
        }
        if (!questData) {
          notFound();
        }

        questList.push(...questData);
      }
      setQuestStateData(questList);
      console.log(questList);

      setLoading(false);
    };
    getData();
  }, [username]);

  const updateQuest = async (
    id,
    name,
    description,
    order,
    completion_status
  ) => {
    if (completion_status === false) {
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
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
      {JSON.stringify(userStateData)}

      {listStateData.map(({ id, title, description }) => {
        return (
          <div key={id}>
            <h1>LIST TITLE: {title}</h1>
            <h2>LIST Description: {description}</h2>
            {questStateData
              .filter((quest) => {
                return quest.list_id === id;
              })
              .map(({ id, name, description, order, completion_status }) => {
                if (user.id === userStateData.id) {
                  return (
                    <>
                      <Quest
                        key={id}
                        quest_name={name}
                        quest_description={description}
                        editable
                      />
                      <button
                        onClick={() => {
                          updateQuest(
                            id,
                            name,
                            description,
                            order,
                            completion_status
                          );
                        }}
                      >
                        Complete?
                      </button>
                    </>
                  );
                } else {
                  return (
                    <Quest
                      key={id}
                      quest_name={name}
                      quest_description={description}
                    />
                  );
                }
              })}
          </div>
        );
      })}
    </div>
  );

  /*
  const { user, error: userError, loaded } = useUser();

  const { data, error } = await getUserByUsername(username);

  if (error) {
    console.log("Error");
    return <p>ERROR:USER NOT FOUND</p>;
  }
  if (!data) {
    console.log("NOT FOUND");
    notFound();
  }

  const { listData, listError } = await getUserLists(data.id);

  return (
    <div>
      <button onClick={logout}>Logout</button>
      {JSON.stringify(data)}
      {!listError &&
        listData.map(async ({ id, title, description }) => {
          const { questData, questError } = await getListQuests(id);

          return (
            <div key={id}>
              <h1>{title}</h1>
              <p>{description}</p>
              {!questError &&
                questData.map(({ id, name, description }) => {
                  return (
                    <Quest
                      key={id}
                      quest_name={name}
                      quest_description={description}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );


  */
};
export default Profile;
