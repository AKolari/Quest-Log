const Quest = ({ quest_name, quest_description, editable, style }) => {
  if (!editable) {
    return (
      <div className=" text-white ">
        <h1>{quest_name}</h1>
        <p>{quest_description}</p>
      </div>
    ); //Hello this is steven!
  } else {
    return (
      <div className=" text-white ">
        <p>{quest_name}</p>
        <p>{quest_description}</p>
      </div>
    );
  }
};
export default Quest;
