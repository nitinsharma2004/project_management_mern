import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const initialUserState = useSelector((state)=>state.user.currentUser)
   console.log(initialUserState);
  const [authUser, setAuthUser] = useState(
    initialUserState ? initialUserState : undefined
  );
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
