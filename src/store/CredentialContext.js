import { createContext } from "react";

export const CredentialContext = createContext({
  storedCredentials:null,
  setStoredCredentials:()=>{}
  
}) 