const Quest = ({ quest_name, quest_description, editable }) => {
  return (
    <div className="text-white">
      <h1 className="h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block w-[220px] px-2">
        {quest_name}
      </h1>
      <p className="h3 border-2 border-double border-stone-400 bg-amber-600 border-black ml-5 inline-block w-[220px] px-2">
        {quest_description}
      </p>
    </div>
  );
};
export default Quest;
