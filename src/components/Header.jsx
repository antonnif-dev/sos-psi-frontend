import { useAuth } from "../hooks/useAuth";

function Header(){

 const {user} = useAuth();

 return(

  <header className="bg-white shadow p-4 flex justify-between">

   <h1 className="font-bold">
    Painel
   </h1>

   <div>
    {user?.email}
   </div>

  </header>

 );

}

export default Header;