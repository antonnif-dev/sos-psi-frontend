import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { getUnreadCount } from "../services/notificacoesService"
import NotificationDropdown from "./NotificationDropdown"

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  async function loadCount() {
    const c = await getUnreadCount()
    setCount(c)
  }

  useEffect(() => {
    loadCount()
    const interval = setInterval(loadCount, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative"
      >
        <Bell size={20} />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {count}
          </span>
        )}
      </button>

      <NotificationDropdown
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}