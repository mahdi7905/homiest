import { createContext, useState } from "react";

export const DrawerContext = createContext();

const DrawerContextProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <DrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerContextProvider;
