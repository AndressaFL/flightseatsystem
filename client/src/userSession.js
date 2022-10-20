import { createContext, useReducer } from "react";
import { InitialUserState, UserContext } from "./userContext";
import UserReducer from "./userReducer";

function UserSession({ children }) {
    const [state, dispatch] = useReducer(UserReducer, InitialUserState);
    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
}

export default UserSession;