import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

// Safely access localStorage in environments like CRA
let storedUser = null;
try {
  const userFromStorage = localStorage.getItem("user");
  storedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
} catch (error) {
  console.error("Error reading user from localStorage:", error);
}

const INITIAL_STATE = {
  user: storedUser,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(state.user));
    } catch (error) {
      console.error("Error storing user in localStorage:", error);
    }
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
