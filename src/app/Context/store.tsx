"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ContextProps {
  isLogoutConfirmationDialogOpen: boolean;
  setIsLogoutConfirmationDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  isLogoutConfirmationDialogOpen: false,
  setIsLogoutConfirmationDialogOpen: (): boolean => true,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [isLogoutConfirmationDialogOpen, setIsLogoutConfirmationDialogOpen] =
    useState(false);

  return (
    <GlobalContext.Provider
      value={{
        isLogoutConfirmationDialogOpen,
        setIsLogoutConfirmationDialogOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
