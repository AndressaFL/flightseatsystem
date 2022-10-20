import { createContext, useReducer } from "react";

export const InitialUserState = {
    name: null,
    email: null
};

export const UserContext = createContext(InitialUserState);