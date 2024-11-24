import React, { createContext, useContext, useState } from 'react';
import { invoke } from '@forge/bridge';
import { checkObjectEmpty } from '../common/helper';
import { useAppContext } from './AppContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { setCurrentPage, changePage, setChangePage } = useAppContext();
  const [isConnected, setIsConnected] = useState(false);

  const handleLogout = async () => {
    return await invoke("logout");
  };

  const checkAuthStatus = async (mappings = []) => {
    try {
      const authenticated = await invoke("getToken");
      console.log(authenticated, "authenticated");
      setIsConnected(!checkObjectEmpty(authenticated));
      if (!checkObjectEmpty(authenticated) && mappings?.length === 0) {
        setCurrentPage({
          page: "Dashboard",
          id: 2,
        });
      }
      if (!checkObjectEmpty(authenticated) && mappings?.length > 0) {
        setCurrentPage({
          page: "Dashboard",
          id: 2,
        });
      }
      if (checkObjectEmpty(authenticated)) {
        setCurrentPage({
          page: "landing",
          id: 1,
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleConnect = async () => {
    await invoke("setToken", { token: "pr6HvcHBa3yHhye7Cy-GYdOdiVtrEPynsHpwsALBf0KtJahwKMLVA1moQW_SGvWWTUT6CGC2Y_S9W_lozhVDS8VQ" });
    setChangePage(!changePage);
  };

  const value = {
    isConnected,
    handleLogout,
    checkAuthStatus,
    handleConnect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
