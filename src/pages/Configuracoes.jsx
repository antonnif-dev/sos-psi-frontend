import { useAuth } from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

function Configuracoes(){

 const {user} = useAuth();

 async function logout(){

  await signOut(auth);

 }

 return(

  <div>

   <h1 className="text-2xl font-bold mb-6">
    Configurações
   </h1>

   <div className="bg-white p-4 rounded shadow w-96">

    <p className="mb-3">
     Usuário: {user?.email}
    </p>

    <button
     onClick={logout}
     className="bg-red-500 text-white px-4 py-2"
    >
     Sair
    </button>

   </div>

  </div>

 );

}

export default Configuracoes;