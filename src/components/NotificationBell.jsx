import { Bell } from "lucide-react"
import { useEffect, useState } from "react"
import { getUnreadCount } from "../services/notificacoesService"

export default function NotificationBell(){
  const [count, setCount] = useState(0)
  async function loadCount(){
    const c = await getUnreadCount()
    setCount(c)
  }

  useEffect(()=>{
    loadCount()
    const interval = setInterval(loadCount, 30000)
    return ()=> clearInterval(interval)
  },[])

  return(
    <div className="relative">
      <Bell size={20}/>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
          {count}
        </span>
      )}
    </div>
  )
}