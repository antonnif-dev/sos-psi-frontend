import { useEffect, useState } from "react"
import { getNotificacoes, markAsRead } from "../services/notificacoesService"

export default function NotificationDropdown(){
  const [notificacoes, setNotificacoes] = useState([])
  async function load(){
    const data = await getNotificacoes()
    setNotificacoes(data)
  }

  useEffect(()=>{
    load()
  },[])

  async function handleClick(n){
    if(!n.read){
      await markAsRead(n.id)
    }
    window.location.href = n.link
  }

  return(
    <div className="absolute left-40 top-20 w-80 bg-white shadow-lg rounded-lg z-50">
      {notificacoes.map(n => (
        <div
          key={n.id}
          onClick={()=>handleClick(n)}
          className={`p-3 border-b cursor-pointer ${
            !n.read ? "bg-blue-50 font-medium" : ""
          }`}
        >
          <p>{n.title}</p>
          <span className="text-xs text-gray-500">
            {n.message}
          </span>
        </div>
      ))}
    </div>
  )
}