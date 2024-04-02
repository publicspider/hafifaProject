import { createContext, useEffect, useState } from "react";


export const TankContext = createContext({
    handleLogin: (
        _logged: boolean,
        _gdud: string,
        manager: string,
        _pernr: string
      ) => {},
      
  });