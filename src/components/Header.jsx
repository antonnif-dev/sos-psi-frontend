import { useAuth } from "../hooks/useAuth";
import NotificationBell from "./NotificationBell"

function Header(){

 const {user} = useAuth();

 return(

  <header className="bg-black shadow p-4 flex justify-between">

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