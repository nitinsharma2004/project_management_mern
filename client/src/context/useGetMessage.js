import React, { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";
import {API} from "../api/index.js"; 
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await API.get(
            `/message/get/${selectedConversation._id}`,{
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          );
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;
