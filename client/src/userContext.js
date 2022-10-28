/*Context is designed to share data that can be considered “global” 
for a tree of React components, such as the current authenticated user,*/
import { createContext, useReducer } from "react";

export const InitialUserState = {
    name: null,
    id: null
};

export const UserContext = createContext(InitialUserState);