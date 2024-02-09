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
  const [lowBreakPointToggle, setLowBreakPointToggle] = useState();

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
    return (
      <div
        role="status"
        className=" h-full col-span-5 flex justify-center items-center "
      >
        <svg
          aria-hidden="true"
          className=" w-40  h-40 text-White-Smoke animate-spin dark:text-White-Smokel  fill-black "
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen">
        <div className=" h-[10%] ">
          <Header></Header>
        </div>
        <div className="grid grid-cols-12 w-screen h-[90%] justify-center items-center ">
          <div className="flex flex-col-reverse justify-end text-center items-end col-span-4 sm:col-span-2  ">
            {listStateData.map(({ id, title, description, i }) => {
              return (
                <div
                  className=" w-full h-full justify-end items-end mr-4  "
                  key={id}
                >
                  <div
                    className={` ${
                      activeAdventureId === id ? " underline" : ""
                    } hover:text-xl text-xs md:text-base md:hover:text-base   w-full flex flex-col justify-end items-end mr-4 text-white text-end `}
                  >
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

          <div className="flex flex-col  text-center h-full  col-span-7 sm:col-span-9 mr-4  ">
            {listStateData.map(({ id, title, description, i }) => {
              return (
                <div className=" w-full justify-center items-center  " key={id}>
                  {activeAdventureId === id && (
                    <div className=" flex-col items-center justify-start text-xs md:text-base my-18  ">
                      <h1 className=" text-3xl my-8 ">{title}</h1>
                      <p className=" text-left my-4 ">{description}</p>
                    </div>
                  )}
                  {activeAdventureId === id && (
                    <div className=" grid grid-cols-10 items-baseline ">
                      <div className=" col-span-2 sm:col-span-4 bg-white h-1 " />
                      <h1 className="text-2xl col-span-4 sm:col-span-2">
                        Quests
                      </h1>

                      <div className=" col-span-2 sm:col-span-4 bg-white h-1 " />
                    </div>
                  )}
                  {activeAdventureId === id && (
                    <ul className="  list-disc my-8  text-xs md:text-base w-full ">
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
                                      editable={false}
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
                                    editable={false}
                                    completion={completion_status}
                                  />
                                </li>
                              );
                            }
                          }
                        )}
                    </ul>
                  )}

                  {username === user?.questMeta?.username &&
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
