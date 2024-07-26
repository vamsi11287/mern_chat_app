import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import networkCall from "../../config/NetworkCall";
import { endPoints } from "../../config/config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export interface CounterState {
  mode: string;
  createdNewMessage: boolean;
  users: {
    _id: string;
    name: string;
    email: string;
    __v: number;
  }[];
  isUsers: boolean;
  receiver: string;
  chatData: {
    _id: string;
    userA: string;
    userB: string;
    contents: {
      sender: string;
      receiver: string;
      message: string;
      _id: string;
      timestamp: string;
    }[];
  };
}

const initialState: CounterState = {
  mode: "light",
  users: [],
  isUsers: false,
  createdNewMessage: false,
  receiver: "",
  chatData: {
    _id: "",
    userA: "",
    userB: "",
    contents: [],
  },
};

export const allUsers = createAsyncThunk("users", async () => {
  const token = Cookies.get("token");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get("http://localhost:8081/user/allusers", options);

    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const getChatData = createAsyncThunk(
  "getChat",
  async (receiver: string) => {
    const token = Cookies.get("token");
    const sender = Cookies.get("loginUser");
    const data = {
      userA: sender,
      userB: receiver,
    };
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8081/message/",
        data,
        options
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getConversation = createAsyncThunk(
  "getConversationChat",
  async (data: {
    userA: string | undefined;
    userB: string;
    sender: string | undefined;
    receiver: string;
    message: string;
  }) => {
    const token = Cookies.get("token");
    const loginUser = Cookies.get("loginUser");
    data.userA = loginUser;
    data.sender = loginUser;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8081/message/user",
        data,
        options
      );
      
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginHandler = createAsyncThunk(
  "login",
  async (
    data: { name: string; password: string },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const response = await networkCall(
      endPoints.LOGIN,
      "POST",
      JSON.stringify(data)
    );

    if (response) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue("Something went wrong!");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      if (action.payload) {
        state.mode = "light";
      } else {
        state.mode = "dark";
      }
    },
    receiverName: (state, action) => {
      state.receiver = action.payload;
    },
    messageArrived: (state, action) => {
      state.createdNewMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state) => {
        state.isUsers = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUsers = false;
      })
      .addCase(allUsers.rejected, (state) => {
        state.isUsers = true;
      });

    builder
      .addCase(getChatData.pending, (state) => {
        state.isUsers = true;
      })
      .addCase(getChatData.fulfilled, (state, action) => {
        state.isUsers = false;
        state.chatData = action.payload;
        state.createdNewMessage = true;
        
      })
      .addCase(getChatData.rejected, (state) => {
        state.isUsers = true;
      });

    builder
      .addCase(getConversation.pending, (state) => {
        state.createdNewMessage = true;
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.createdNewMessage = action.payload;
        
      })
      .addCase(getConversation.rejected, (state) => {
        state.createdNewMessage = true;
      });
  },
});

export const { changeMode, receiverName,messageArrived } = chatSlice.actions;

export default chatSlice.reducer;
