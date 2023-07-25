const Quest = ({ quest_name, quest_description, editable }) => {
  //if (editable ) {
  return (
    <div>
      <h1 className="h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block w-[220px] px-2">
        {quest_name}
      </h1>
      <p className="h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block w-[220px] px-2">
        {quest_description}
      </p>
    </div>
  ); //Hello this is steven!
  //}
  /*else {
    return (
      <div>
        <input type="text" id="quest_name" value={quest_name}></input>
        <input
          type="text"
          id="quest_description"
          value={quest_description}
          onChange={() => {}}
          className="h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block w-[220px] px-2"
        ></input>
      </div>
    );
  }*/
};
export default Quest;
