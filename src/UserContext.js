import React, {createContext, useState} from "react";

const UserContext = createContext();

export function UserContextProvider ({children}) {
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    // const [loginPw, setLoginPw] = useState("");
    const [register, setRegister] = useState(false);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

    return (
        <UserContext.Provider value={{userInfo: { userEmail, setUserEmail, 
                                                 email, setEmail, 
                                                login, setLogin }}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;