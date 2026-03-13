import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

export const AuthContext = createContext();

export function useAuth(){
 return useContext(AuthContext);
}

export function AuthProvider({children}){

 const [user,setUser] = useState(null);
 const [loading,setLoading] = useState(true);

 useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth,(firebaseUser)=>{
   if(firebaseUser){
    setUser(firebaseUser);
   }else{
    setUser(null);
   }
   setLoading(false);
  });
  return ()=>unsubscribe();
 },[]);

 return(
  <AuthContext.Provider
   value={{
    user,
    setUser,
    loading
   }}
  >
   {children}
  </AuthContext.Provider>
 );
}