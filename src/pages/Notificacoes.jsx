import { useEffect, useState } from "react"
import { getNotificacoes } from "../services/notificacoesService"

export default function Notificacoes(){
  const [notificacoes, setNotificacoes] = useState([])

  useEffect(()=>{
    async function load(){
      const data = await getNotificacoes()
      setNotificacoes(data)
    }
    load()
  },[])

  return(
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Notificações
      </h1>
      {notificacoes.map(n => (
        <div
          key={n.id}
          className={`p-4 border rounded mb-2 ${
            !n.read ? "bg-blue-50" : ""
          }`}
        >
          <h2 className="font-medium">{n.title}</h2>
          <p className="text-sm text-gray-500">
            {n.message}
          </p>
        </div>
      ))}
    </div>
  )
}