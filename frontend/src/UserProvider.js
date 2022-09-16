import { createContext } from "react";

const UserContext = createContext();

export function UserProvider(props) {
    return (
        <UserContext.Provider value={ props.userInfo }>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;