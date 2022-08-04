import { createContext } from "react";
import { useProvideAuth } from "../hooks";
const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  loading: true,
  updateUser: () => {},
  updateUserFriends: () => {},
  fetchFriends: () => {},
};

export const AuthContext = createContext(initialState);
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
