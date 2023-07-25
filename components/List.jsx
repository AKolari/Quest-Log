"use client";
import { notFound, useRouter } from "next/navigation";
import { getListById, getListQuests } from "@/utils/apiFunctions";
import Quest from "@/components/Quest";
import { useState } from "react";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";

const List = ({ list_id, editable }) => {
  const { user, error, loaded } = useUser();
  const router = useRouter();

  const [listData, setListData] = useState(undefined);
  const [questDataState, setQuestDataState] = useState([]);
  const [questStateError, setQuestStateError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
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
  }, [list_id]);

  if (loading) {
    return <div>Loading</div>;
  } else {
    if (user) {
      if (user.id === listData.user_id) {
        router.replace(
          `/user/${user.questMeta.username}/list/${listData.id}/edit`
        );
      }
    } else {
    }
    return (
      <div>
        <h1>{listData.title}</h1>
        {user?.id === listData.user_id && <button></button>}
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
      </div>
    );
  }
};
export default List;
