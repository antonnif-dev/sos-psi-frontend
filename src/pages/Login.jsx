import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){

const {setUser} = useAuth();
const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

async function handleSubmit(e){

e.preventDefault();

const userCredential =
await signInWithEmailAndPassword(
auth,
email,
password
);

setUser(userCredential.user);

navigate("/dashboard");

}

return(

  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
   <form
    onSubmit={handleSubmit}
    className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm border border-gray-200"
   >
<h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
 Entrar no sistema
</h1>
<div className="flex flex-col gap-4">
 <input
  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
  placeholder="Email"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
 />
 <input
  type="password"
  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
  placeholder="Senha"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
 />
 <button
  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
 >
  Entrar
 </button>
</div>
   </form>
  </div>
);
}

export default Login;