import React, { createContext, useState } from "react";

// Tạo context
export const UserContext = createContext();

// Tạo provider
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // ban đầu chưa có id

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
