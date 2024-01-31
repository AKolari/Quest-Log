import { useRouter } from "next/navigation";
import supabase from "./supabase";

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  return { success: !error, error };
};

const getLatestUsers = async (num) => {
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
  console.log(insertResponse);
  return {
    success: true,
    message: "successfully added",
    data: insertResponse.data,
  };
};

const getUserLists = async (user_id) => {
  console.log("Gamer");
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
