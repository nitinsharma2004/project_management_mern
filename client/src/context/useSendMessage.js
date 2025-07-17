import React, { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";
import {API} from "../api/index.js";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        `/message/send/${selectedConversation._id}`,{message},{
          credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
        
      );
      setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;
