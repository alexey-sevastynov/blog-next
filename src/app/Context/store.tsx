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
  isDeletePostConfirmationDialogOpen: boolean;
  setIsDeletePostConfirmationDialogOpen: Dispatch<SetStateAction<boolean>>;
  idPostDelete: string;
  setIdPostDelete: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  isLogoutConfirmationDialogOpen: false,
  setIsLogoutConfirmationDialogOpen: (): boolean => false,
  isDeletePostConfirmationDialogOpen: false,
  setIsDeletePostConfirmationDialogOpen: (): boolean => false,
  idPostDelete: "",
  setIdPostDelete: (): string => "",
});

export const GlobalContextProvider = ({ children }: any) => {
  const [isLogoutConfirmationDialogOpen, setIsLogoutConfirmationDialogOpen] =
    useState(false);
  const [
    isDeletePostConfirmationDialogOpen,
    setIsDeletePostConfirmationDialogOpen,
  ] = useState(false);
  const [idPostDelete, setIdPostDelete] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        isLogoutConfirmationDialogOpen,
        setIsLogoutConfirmationDialogOpen,
        isDeletePostConfirmationDialogOpen,
        setIsDeletePostConfirmationDialogOpen,
        idPostDelete,
        setIdPostDelete,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
