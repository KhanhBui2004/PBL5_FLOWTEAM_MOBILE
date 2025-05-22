import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   //   const login = (newToken) => setToken(newToken);
//   const login = (token) => {
//     setToken(token);
//   };
//   const logout = () => setToken(null);

//   return (
//     <UserContext.Provider value={{ token, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

export const useUser = () => useContext(UserContext);
