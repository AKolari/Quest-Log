import { getListQuests, getUserLists } from "@/utils/apiFunctions";

const ProfilePartial = async ({ username, id }) => {
  const { listData, listError } = await getUserLists(id);

  if (listError) {
    console.log(listError);
    return (
      <p className="border-white bg-blue-600 p-4 mr-8 border-2 text-white text-center self-center">
        The forces of darkness have intervened, and hidden {username}&#39;s
        adventures from our gaze.
      </p>
    );
  }
  if (listData.length == 0) {
    return (
      <p className="border-white bg-blue-600 p-4 mr-8 border-2 text-white text-center self-center">
        {username} has taken a break from questing for now, and has no new
        adventures to share.
      </p>
    );
  }
  console.log(listData[0]);
  const { questData, questError } = await getListQuests(listData[0].id);

  if (questError) {
    return (
      <p className="border-white bg-blue-600 p-4 mr-10 border-2 text-white text-center self-center">
        The forces of darkness have intervened, and hidden this quest from you
      </p>
    );
  }
  if (questData.length == 0) {
    return (
      <p className="border-white bg-blue-600 p-4 mr-10 border-2 text-white text-center self-center">
        {username} has yet to undertake any quests on their adventure.
      </p>
    );
  }
  console.log("Gaming");
  console.log(questData);
  console.log(listData);

  return (
    <div className="m-6  bg-blue-600">
      <div className=" px-10 py-8 my- border-white border-2 grid grid-flow-row ">
        <p className="text-white"> {listData[0].title}</p>
        <p className="text-white pb-6">{listData[0].description}</p>

        {questData
          .slice(0, 3)
          .map(({ id, name, description, completion_status }) => {
            return (
              <div key={id}>
                <p className="text-white"> {name}</p>

                {completion_status && (
                  <p className="text-amber-400">QUEST Complete</p>
                )}
                {!completion_status && (
                  <p className="text-red-700">QUEST NOT Complete</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProfilePartial;
