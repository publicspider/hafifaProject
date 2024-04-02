import { createContext } from "react";

export let CarCtx = createContext({
    isLogged : false, 
    handleLogin: (
      _logged: boolean,
      _gdud: string,
      manager: string,
      _pernr: string
    ) => {},
    handleLogOut: () => {},
  });