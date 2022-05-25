import { createContext, useContext, useMemo, useState } from "react";
import { State } from "../utils/types";

export interface User {
  token: string;
}

const initialUser: User = {
  token: "",
};
interface AppStateContextProps {
  userState: State<User>;
}

const AppStateContext = createContext<AppStateContextProps>({
  userState: [initialUser, () => {}],
});

interface AppStateProviderProps extends React.PropsWithChildren<{}> {}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const userState = useState<User>();

  const value = useMemo(() => ({ userState }), [userState]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

const useAppState = () => useContext(AppStateContext);

export default useAppState;
