import { useRouter } from "next/navigation";
import supabase from "./supabase";

const logout = async () => {
  console.log("Logging Out")
  const { error } = await supabase.auth.signOut();
  
  return { success: !error, error };
};

const getLatestUsers = async (num) => {
  console.log("Getting Latest Users")
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(num);
  
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const addNewList = async (
  user_id,
  title = "New List",
  description = "list"
) => {
  console.log("Adding New List")
  const insertResponse = await supabase
    .from("list")
    .insert({
      user_id,
      title,
      description,
    })
    .select("id")
    .single();
  if (insertResponse.error) {
    return {
      success: false,
      error: insertResponse.error,
    };
  }
  console.log(insertResponse.data);
  return {
    success: true,
    message: "successfully added",
    data: insertResponse.data,
  };
};

const editListById = async (id, title, description) => {
  const editResponse = await supabase
    .from("list")
    .update({
      title: title,
      description: description,
    })
    .eq("id", id);
console.log("Edditing List")
  if (editResponse.error) {
    return {
      success: false,
      error: editResponse.error,
    };
  }
  return {
    success: true,
    message: "successfully added",
  };
};

const editQuestById = async (
  id,
  order,
  name,
  description,
  completion_status
) => {
  console.log("Edditing Quest")
  const editResponse = await supabase
    .from("quest")
    .update({
      order: order,
      name: name,
      description: description,
      completion_status: completion_status,
    })
    .eq("id", id);

  if (editResponse.error) {
    return {
      success: false,
      error: editResponse.error,
    };
  }

  return {
    success: true,
    message: "successfully added",
  };
};

const addNewQuest = async (
  list_id,
  order,
  name = "New Quest",
  description = "quest"
) => {
  console.log("Adding Quest")
  const insertResponse = await supabase.from("quest").insert({
    order,
    list_id,
    name,
    description,
  });

  if (insertResponse.error) {
    return {
      success: false,
      error: insertResponse.error,
    };
  }
  
  return {
    success: true,
    message: "successfully added",
    data: insertResponse.data,
  };
};

const getUserLists = async (user_id) => {
  console.log("Getting User Lists");
  const { data: listData, error: listError } = await supabase
    .from("list")
    .select("*")
    .eq("user_id", user_id);

  if (listError) {
    return {
      success: false,
      listError,
    };
  }

  return {
    success: true,
    listData,
  };
};

const getListById = async (id) => {
  console.log("Getting List ID");
  const { data, error } = await supabase
    .from("list")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const getListQuests = async (list_id) => {
  console.log("Getting Quests From ListId");
  const { data: questData, error: questError } = await supabase
    .from("quest")
    .select("*")
    .eq("list_id", list_id)
    .order("order", { ascending: true });

  if (questError) {
    return {
      success: false,
      questError,
    };
  }

  return {
    success: true,
    questData,
  };
};

const getQuestByQuestId = async (quest_id) => {
  console.log("Getting Quest With Quest ID");
  const { data: questData, error: questError } = await supabase
    .from("quest")
    .select("*")
    .eq("id", quest_id)
    .single();

  if (questError) {
    return {
      success: false,
      questError,
    };
  }

  return {
    success: true,
    questData,
  };
};

const getCurrentUser = async () => {
  console.log("Getting Current User");
  const session = await supabase.auth.getSession();

  if (session?.data?.session?.user) {
    const { data: questMeta, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", session.data.session.user.id)
      .single();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    const user = {
      ...session.data.session.user,
      questMeta,
    };

    return {
      success: true,
      data: user,
    };
  }
  return {
    success: false,
    data: null,
  };
};

const getUserByUsername = async (username) => {
  console.log("Getting User by Username");
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("username", username)
    .single();
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const getUserById = async (id) => {
  console.log("Getting User by Id");
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const registerUser = async (email, password, name, username) => {
  console.log("Registering User");
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("username", username);
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  if (data.length > 0) {
    return {
      success: false,
      message: "Username already exists",
    };
  }

  const authResponse = await supabase.auth.signUp({
    email,
    password,
  });

  if (authResponse.error) {
    return {
      success: false,
      message: authResponse.error.message,
    };
  }

  if (authResponse.data.user) {
    const addMetaResponse = await supabase
      .from("profile")
      .insert([{ id: authResponse.data.user.id, name, username }]);

    if (addMetaResponse.error) {
      return {
        success: false,
        message: addMetaResponse.error.message,
      };
    }
    return {
      success: true,
      message: "Registration successful, please wait a few moments...",
      ...addMetaResponse.data,
    };
  }

  return {
    success: false,
    message: "An unknown error has occurred",
  };
};

const loginUser = async (email, password) => {
  console.log("Logging In User");
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authResponse.error) {
    return {
      success: false,
      message: authResponse.error,
    };
  }

  if (authResponse.data.user) {
    const meta = await supabase
      .from("profile")
      .select("*")
      .eq("id", authResponse.data.user.id)
      .single();

    if (meta.error) {
      return {
        success: false,
        message: meta.error,
      };
    }
    return {
      ...authResponse,
      meta,
      message: "Successfully logged in, please wait to be redirected",
      success: true,
    };
  }

  return {
    success: false,
    error: {
      message: "An unknown error has occurred",
    },
  };
};

export {
  loginUser,
  registerUser,
  getCurrentUser,
  getUserByUsername,
  getUserLists,
  getListQuests,
  getQuestByQuestId,
  logout,
  getUserById,
  getListById,
  addNewQuest,
  addNewList,
  editQuestById,
  getLatestUsers,
  editListById,
};
