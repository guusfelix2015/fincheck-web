import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import toast from "react-hot-toast";
import { PageLoader } from "../../view/components/PageLoader";

export interface AuthContextValue {
  signedIn: boolean
  signin: (accessToken: string) => void
  signout: () => void
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)
    return !!storedAccessToken
  })

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)
    setSignedIn(true)
  }, [])


  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
  })

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    setSignedIn(false)
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou! Por favor, realize o login novamente.')
      signout()
    }
  }, [isError, signout]);

  if (isFetching) {
    return <PageLoader />
  }

  return (
    <AuthContext.Provider value={{ signedIn: isSuccess && signedIn, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

