"use client";
import useLogged from "@/hooks/useLogged";
import { notFound, useRouter } from "next/navigation";
import {
  getListById,
  getListQuests,
  addNewQuest,
  addNewList,
} from "@/utils/apiFunctions";
import Quest from "@/components/Quest";
import { useState } from "react";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
const CreateList = ({user}) => {
  //const { user, error, loaded, refreshUser } = useUser();
  const router = useRouter();

  //useLogged("in", "/");
  const [numOfQuests, setNumOfQuests] = useState(3);
  const [listTitle, setListTitle] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [newList, setNewList] = useState(undefined);
  const [questTitles, setQuestTitles] = useState(["", "", ""]);
  const [questDescriptions, setQuestDescriptions] = useState(["", "", ""]);
  const [currentPage, setCurrentPage]=useState(0);
  const [noTitle, setNoTitle]=useState(false);
  const [noQuests, setNoQuests]=useState(false);
  const [emptyQuest, setEmptyQuest]=useState(false);

  const addList = async (e) => {
    e.preventDefault();

    if(listTitle===""){
        setNoTitle(true);
        return;
    }
    if(questTitles.length===0){
      setNoQuests(true);
      return;
    }
    for(let i=0; i<questTitles.length; i++ ){
      if(questTitles[i]===""){
        setEmptyQuest(true);
        return;
      }
    }

    setNoTitle(false);
    setNoQuests(false);
    setEmptyQuest(false);

    const addedList = await addNewList(user.id, listTitle, listDescription);
    if (addedList.success == false) {
      console.log(addedList);
      return;
    } else {
      setNewList(addedList);
      console.log(addedList.data.id);
      for (let i = 0; i < numOfQuests; i++) {
        const addedQuest = await addNewQuest(
          addedList.data.id,
          i,
          questTitles[i],
          questDescriptions[i]
        );

        if (addedQuest.success == false) {
          console.log(addedQuest);
          return;
        }
      }
      router.replace("/login");
    }
  };

  const updateQuestTitles = (e, i) => {
    e.preventDefault();
    const tempArray = [...questTitles];

    tempArray[i] = e.target.value;
    setQuestTitles(tempArray);
  };

  const updateQuestDescriptions = (e, i) => {
    e.preventDefault();
    const tempArray = [...questDescriptions];

    tempArray[i] = e.target.value;
    setQuestDescriptions(tempArray);
  };

  const updateNumOfQuests = ( index=-1) => {
    if(index!=-1){
      setNumOfQuests(numOfQuests - 1);
      const tempTitleArray = [...questTitles];
      console.log(tempTitleArray);
      const tempDescriptionArray = [...questDescriptions];
      console.log(tempDescriptionArray);
      tempTitleArray.splice(index, 1)
      tempDescriptionArray.splice(index, 1)
      console.log(tempTitleArray);
      console.log(tempDescriptionArray);
      setQuestTitles(tempTitleArray);
      setQuestDescriptions(tempDescriptionArray);
      return;
    }

   // if (change == 1) {
      if (numOfQuests == 100) {
        return;
      } else {
        setNumOfQuests(numOfQuests + 1);
        const tempTitleArray = [...questTitles];
        console.log(tempTitleArray);
        const tempDescriptionArray = [...questDescriptions];
        console.log(tempDescriptionArray);
        tempTitleArray.push(" ");
        tempDescriptionArray.push(" ");
        console.log(tempTitleArray);
        console.log(tempDescriptionArray);
        setQuestTitles(tempTitleArray);
        setQuestDescriptions(tempDescriptionArray);
      }
    //}
   /* if (change == 0) {
      if (numOfQuests == 1) {
        return;
      } else {
        setNumOfQuests(numOfQuests - 1);
        const tempTitleArray = [...questTitles];
        console.log(tempTitleArray);
        const tempDescriptionArray = [...questDescriptions];
        console.log(tempDescriptionArray);
        tempTitleArray.pop();
        tempDescriptionArray.pop();
        console.log(tempTitleArray);
        console.log(tempDescriptionArray);
        setQuestTitles(tempTitleArray);
        setQuestDescriptions(tempDescriptionArray);
      }
    }*/
  };

 /* if (!loaded) {
    return <>
    <div role="status" className=" col-span-5 flex justify-center items-center " >
        <svg aria-hidden="true" className=" w-40  h-40 text-White-Smoke animate-spin dark:text-White-Smokel  fill-black " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
    </>
  } else {*/
    return (
      <div className="flex flex-col items-center h-full w-full  " >
        <h1 className="text-White-Smoke underline text-5xl animate-pulse text-center" >Begin Your New Adventure!</h1>

        <form className=" text-center "  onSubmit={addList}>
          {currentPage===0&&<>
          <p className="my-5 text-xl ">
            <label htmlFor="title" className="block">
              What Shall We Call Your Adventure, for Generations to Come?
            </label>
            <input
              id="title"
              className=" border-2 border-black w-9/12  px-2 my-8 bg-Gunmetal"
              value={listTitle}
              onChange={(e) => {
                setListTitle(e.target.value);
              }}
              required
              type="text"
            />
          </p>
          
          <p className="my-5 text-xl" >
            <label htmlFor="description" className="block">
              Tell Us the Story of Your Great Adventure!
            </label>
            <textarea
            
            rows={12}
            cols={100}
              className="border-2 resize-none border-black w-full px-2 my-8 bg-Gunmetal"
              id="description"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              type="text"
            />
          </p>
          </>}
        {currentPage===1&& <>
          <p className="my-5 text-xl" >
            <label className="block">
              What Perilious Quests Will You Undertake?
            </label>
            </p>
          <div className="" >
        {questTitles.map((quest, i) => {
            return (
            
              <div key={i} className="my-5 grid grid-cols-12 ">
                <div className=" col-span-11" >
                <label htmlFor={`title${i}`} className="block text-lg">
                  Quest Title 
                </label>
                <input
                  id={`title${i}`}
                  className=" border-2 border-black px-2 w-full bg-Gunmetal"
                  value={questTitles[i] || " "}
                  onChange={(e) => {
                    updateQuestTitles(e, i);
                  }}
                  required
                  type="text"
                />
                </div>
                {numOfQuests!=1&&<button className=" col-span-1  text-gray-500 hover:text-red-900 hover:animate-pulse " onClick={(e)=>{
                  e.preventDefault();
                  e.stopPropagation();
                  updateNumOfQuests(i);
                }}> X </button>}
                {/*<label
                  htmlFor={`description${i}`}
                  className="inline-block w-[75px]"
                >
                  Quest Description
                </label>
                <input
                  className="border border-2 border-black px-2 bg-amber-600"
                  id={`description${i}`}
                  value={questDescriptions[i] || " "}
                  onChange={(e) => {
                    updateQuestDescriptions(e, i);
                  }}
                  type="text"
                />
                */}
              </div>
            );
          })}
          </div>
          </> 
          }

{currentPage===1&&<>{numOfQuests != 100 && (
          <button
            onClick={() => {
              updateNumOfQuests();
            }}
          >
            Add Quest
          </button>
        )}
        {/*numOfQuests != 1 && (
          <button
            onClick={() => {
              updateNumOfQuests();
            }}
          >
            Remove Quest
          </button>
          )*/}
        </>}

          <p className="text-center">
            <input type="submit" className="button small" />
          </p>
        </form>

        

        <div className=" w-full flex justify-around items-center " >
          <button className="text-5xl" onClick={()=>{
              if(currentPage===0)
                return;
              setCurrentPage(currentPage-1);
              
            }} >
             &#x2190;
            </button>

            <button className="text-5xl" onClick={()=>{
              if(currentPage===1)
                return;
              setCurrentPage(currentPage+1);
              
            }} >
              &#x2192;
            </button>


        </div>

            


      </div>
    );
  //}
};
export default CreateList;

/*"use client";
import useLogged from "@/hooks/useLogged";
import { notFound, useRouter } from "next/navigation";
import {
  getListById,
  getListQuests,
  addNewQuest,
  addNewList,
} from "@/utils/apiFunctions";
import Quest from "@/components/Quest";
import { useState } from "react";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
const CreateList = () => {
  const { user, error, loaded, refreshUser } = useUser();
  const router = useRouter();

  useLogged("in", "/");
  const [numOfQuests, setNumOfQuests] = useState(3);
  const [listTitle, setListTitle] = useState(" ");
  const [listDescription, setListDescription] = useState(" ");
  const [newList, setNewList] = useState(undefined);
  const [questTitles, setQuestTitles] = useState(["", "", ""]);
  const [questDescriptions, setQuestDescriptions] = useState(["", "", ""]);

  const [questName, setQuestName] = useState(" ");
  const [questDescription, setQuestDescription] = useState(" ");

  const updateNumOfQuests = (change) => {
    if (change == 1) {
      if (numOfQuests == 10) {
        return;
      } else {
        setNumOfQuests(numOfQuests + 1);
        //const tempTitleArray = [...questTitles];
        //const tempDescriptionArray = [...questDescriptions];
        // tempTitleArray.push(" ");
        //tempDescriptionArray.push(" ");
        //setQuestTitles(tempTitleArray);
        //setQuestDescription(tempDescriptionArray);
      }
    }
    if (change == 0) {
      if (numOfQuests == 1) {
        return;
      } else {
        setNumOfQuests(numOfQuests - 1);
        //const tempTitleArray = [...questTitles];
        //const tempDescriptionArray = [...questDescriptions];
        //tempTitleArray.pop();
        //tempDescriptionArray.pop();
        //setQuestTitles(tempTitleArray);
        //setQuestDescription(tempDescriptionArray);
      }
    }
  };

  const addList = async (e) => {
    e.preventDefault();

    const addedList = await addNewList(user.id, listTitle, listDescription);
    if (addedList.success == false) {
      console.log(addedList);
      return;
    } else {
      setNewList(addedList);
      console.log(addedList.data.id);
      for (let i = 0; i < numOfQuests; i++) {
        const addedQuest = await addNewQuest(
          addedList.data.id,
          i,
          questTitles[i],
          questDescriptions[i]
        );

        if (addedQuest.success == false) {
          console.log(addedQuest);
          return;
        }
      }
      router.replace("/");
    }
  };

  const updateQuestTitles = (e, i) => {
    e.preventDefault();
    const tempArray = [...questTitles];

    tempArray[i] = e.target.value;
    setQuestTitles(tempArray);
  };

  const updateQuestDescriptions = (e, i) => {
    e.preventDefault();
    const tempArray = [...questDescriptions];

    tempArray[i] = e.target.value;
    setQuestDescriptions(tempArray);
  };

  const addQuest = async (e) => {
    e.preventDefault();

    const order = questDataState.length + 1;

    const addedQuest = await addNewQuest(
      list_id,
      order,
      questName,
      questDescription
    );

    if (addedQuest.success == false) {
      console.log(addedQuest);
      return;
    }

    setQuestName(" ");
    setQuestDescription(" ");
    setLoading(true);
    //await refreshUser();
  };

  if (!loaded) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <p>Add New List:</p>

        <form onSubmit={addList}>
          <p className="my-5">
            <label htmlFor="title" className="inline-block w-[75px]">
              List Title
            </label>
            <input
              id="title"
              className="border border-2 border-black px-2"
              value={listTitle}
              onChange={(e) => {
                setListTitle(e.target.value);
              }}
              required
              type="text"
            />
          </p>
          <p className="my-5">
            <label htmlFor="description" className="inline-block w-[75px]">
              List Description
            </label>
            <input
              className="border border-2 border-black px-2"
              id="description"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              type="text"
            />
          </p>
          {questTitles.map((quest, i) => {
            return (
              <p key={i} className="my-5">
                <label htmlFor={`title${i}`} className="inline-block w-[75px]">
                  Quest Title
                </label>
                <input
                  id={`title${i}`}
                  className="border border-2 border-black px-2"
                  value={questTitles[i]}
                  onChange={(e) => {
                    updateQuestTitles(e, i);
                  }}
                  required
                  type="text"
                />
                <label
                  htmlFor={`description${i}`}
                  className="inline-block w-[75px]"
                >
                  Quest Description
                </label>
                <input
                  className="border border-2 border-black px-2"
                  id={`description${i}`}
                  value={questDescription[i]}
                  onChange={(e) => {
                    updateQuestDescriptions(e, i);
                  }}
                  type="text"
                />
              </p>
            );
          })}

          <p className="text-center">
            <input type="submit" className="button small" />
          </p>
        </form>

        {numOfQuests != 10 && (
          <button
            onClick={() => {
              updateNumOfQuests(1);
            }}
          >
            Add Quest
          </button>
        )}
        {numOfQuests != 1 && (
          <button
            onClick={() => {
              updateNumOfQuests(0);
            }}
          >
            Remove Quest
          </button>
        )}
      </div>
    );
  }
};
export default CreateList;
*/
