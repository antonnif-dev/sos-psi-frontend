import { createContext,useState } from "react";

export const TenantContext = createContext();

export function TenantProvider({children}){

 const [tenant,setTenant] = useState(null);

 return(

  <TenantContext.Provider
   value={{
    tenant,
    setTenant
   }}
  >

   {children}

  </TenantContext.Provider>

 );

}