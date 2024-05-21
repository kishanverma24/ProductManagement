import React from "react";
import { useEffect ,useState} from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const savedData = localStorage.getItem('user');
        return savedData ? JSON.parse(savedData) : null;
      });
    
      useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
      }, [user]);
    return(
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;