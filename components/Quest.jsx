const Quest = ({ quest_name, quest_description, editable }) => {
  if (!editable) {
    return (
      <div>
        <h1>{quest_name}</h1>
        <p>{quest_description}</p>
      </div>
    ); //Hello this is steven!
  } else {
    return (
      <div>
        <input
          type="text"
          id="quest_name"
          value={quest_name}
          className="h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block w-[220px] px-2"
        ></input>
        <input
          type="text"
          id="quest_description"
          value={quest_description}
          onChange={() => {}}
          className="h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block w-[220px] px-2"
        ></input>
      </div>
    );
  }
};
export default Quest;
