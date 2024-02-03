"use client";
import Quest from "@/components/Quest";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Header from "./Header";

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
  const [activeAdventureId, setActiveAdventureId] = useState();

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
        setActiveAdventureId(listData[i].id);
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

  if (loading) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="h-screen w-screen">
        <div className=" h-[10%] ">
          <Header></Header>
        </div>
        <div className="grid grid-cols-12 w-screen h-[90%] justify-center items-center">
          <div className="flex flex-col-reverse justify-end text-center items-end col-span-2  ">
            {listStateData.map(({ id, title, description, i }) => {
              return (
                <div
                  className=" w-full h-full justify-end items-end mr-4  "
                  key={id}
                >
                  <div className="  w-full flex flex-col justify-end items-end mr-4 text-white text-end  ">
                    <button
                      onClick={() => {
                        setActiveAdventureId(id);
                      }}
                    >
                      {title}
                    </button>
                  </div>
                </div>
              );
            })}
            <h1 className=" text-2xl my-9 mr-4">{username}</h1>
          </div>

          <div className="col-span-1 h-full w-2  bg-white" />

          <div className="flex flex-col  text-center h-full  col-span-9 mr-4  ">
            {listStateData.map(({ id, title, description, i }) => {
              return (
                <div className=" w-full justify-center items-center  " key={id}>
                  {activeAdventureId === id && (
                    <div className=" flex-col items-center justify-start my-18  ">
                      <h1 className=" text-3xl my-8 ">{title}</h1>
                      <p className=" text-left my-4 ">{description}</p>
                    </div>
                  )}
                  {activeAdventureId === id && (
                    <div className=" grid grid-cols-10 items-baseline ">
                      <div className=" col-span-4 bg-white h-1 " />
                      <h1 className="text-2xl col-span-2">Quests</h1>

                      <div className=" col-span-4 bg-white h-1 " />
                    </div>
                  )}
                  {activeAdventureId === id && (
                    <ul className="  list-disc my-8   w-full ">
                      {questStateData
                        .filter((quest) => {
                          return quest.list_id === id;
                        })
                        .map(
                          ({
                            id,
                            name,
                            description,
                            order,
                            completion_status,
                          }) => {
                            if (user) {
                              if (user.id === userStateData.id) {
                                return (
                                  <li key={id} className=" text-left ">
                                    <Quest
                                      id={id}
                                      key={id}
                                      name={name}
                                      description={description}
                                      order={order}
                                      editable={true}
                                      completion={completion_status}
                                    />
                                  </li>
                                );
                              } else {
                                return (
                                  <li key={id} className=" text-left ">
                                    <Quest
                                      id={id}
                                      key={id}
                                      name={name}
                                      description={description}
                                      order={order}
                                      editable={true}
                                      completion={completion_status}
                                    />
                                  </li>
                                );
                              }
                            } else {
                              return (
                                <li key={id} className=" text-left ">
                                  <Quest
                                    id={id}
                                    key={id}
                                    name={name}
                                    description={description}
                                    order={order}
                                    editable={true}
                                    completion={completion_status}
                                  />
                                </li>
                              );
                            }
                          }
                        )}
                    </ul>
                  )}

                  {username === user?.questMeta.username &&
                    id === activeAdventureId && (
                      <Link
                        href={`/user/${username}/list/${activeAdventureId}/edit`}
                      >
                        <h1 className="text-white">EDIT LIST </h1>
                      </Link>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
export default Profile;

/*
"use client";
import Quest from "@/components/Quest";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

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

  if (loading) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="bg-black">
        <button onClick={logout}>Logout</button>
        {JSON.stringify(userStateData)}

        {listStateData.map(({ id, title, description }) => {
          return (
            <div key={id}>
              {console.log(id)}
              <div className="border-white bg-blue-600 p-4 mr-10 border-2 text-white text-center self-center">
                <h1>{title}</h1>
                <h2>{description}</h2>
              </div>
              {questStateData
                .filter((quest) => {
                  return quest.list_id === id;
                })
                .map(({ id, name, description, order, completion_status }) => {
                  if (user) {
                    if (user.id === userStateData.id) {
                      return (
                        <>
                          <div
                            key={id}
                            className="border-white bg-black-600 p-4 mr-10 border-2 text-white text-center self-center"
                          >
                            <Quest
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
                          </div>
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
              <Link href={`/user/${username}/list/${id}`}>
                <h1 className="text-white">VIEW LIST </h1>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
};
export default Profile;


*/
