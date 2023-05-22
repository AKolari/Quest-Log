import { getListQuests, getUserLists } from "@/utils/apiFunctions";

const ProfilePartial = async ({ username, id }) => {
  console.log(id);
  const { listData, listError } = await getUserLists(id);

  if (listError) {
    console.log(listError);
    return (
      <p>
        The forces of darkness have intervened, and hidden {username}&#39;s
        adventures from our gaze.
      </p>
    );
  }
  if (listData.length == 0) {
    return (
      <p>
        {username} has taken a break from questing for now, and has no new
        adventures to share.
      </p>
    );
  }
  console.log(listData[0]);
  const { questData, questError } = await getListQuests(listData[0].id);

  if (questError) {
    return (
      <p>
        The forces of darkness have intervened, and hidden this quest from you
      </p>
    );
  }
  if (questData.length == 0) {
    return (
      <p>{username} has yet to undertake any quests on their adventure.</p>
    );
  }
  console.log(questData);

  return (
    <div>
      <p>USERNAME: {username}</p>
      <p>LIST TITLE: {listData.title}</p>
      <p>LIST Description: {listData.description}</p>

      {questData
        .slice(0, 3)
        .map(({ id, name, description, completion_status }) => {
          return (
            <div key={id}>
              <p>QUEST NAME: {name}</p>

              {completion_status && <p>QUEST Complete</p>}
              {!completion_status && <p>QUEST NOT Complete</p>}
            </div>
          );
        })}
    </div>
  );
};

export default ProfilePartial;
