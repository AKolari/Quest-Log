const Quest = ({ quest_name, quest_description, editable }) => {
  if (!editable) {
    return (
      <div>
        <h1>{quest_name}</h1>
        <p>{quest_description}</p>
      </div>
    ); //Hello this is steven!
    //testing new branch
  } else {
    return (
      <div>
        <input type="text" id="quest_name" value={quest_name}></input>
        <input
          type="text"
          id="quest_description"
          value={quest_description}
          onChange={() => {}}
        ></input>
      </div>
    );
  }
};
export default Quest;
