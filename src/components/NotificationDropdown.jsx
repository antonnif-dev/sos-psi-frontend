import { useEffect, useState } from "react";
import { getNotificacoes, markAsRead } from "../services/notificacoesService";
import { useNavigate } from "react-router-dom";

export default function NotificationDropdown({ open, onClose }) {
  const [notificacoes, setNotificacoes] = useState([])
  const navigate = useNavigate()

  async function load() {
    const data = await getNotificacoes();
    console.log("NOTIFICACOES:", data);
    setNotificacoes(data);
  }

  useEffect(() => {
    if (open) {
      load()
    }
  }, [open])

  if (!open) return null

  async function handleClick(n) {
    if (!n.read) {
      await markAsRead(n.id)
    }
    navigate(n.link)
    onClose()
  }

  return (
    <div className="absolute left-full ml-2 top-12 w-80 bg-white shadow-lg rounded-lg z-50 text-black">
      {notificacoes.length === 0 && (
        <div className="p-4 text-sm text-gray-500">
          Nenhuma notificação
        </div>
      )}

      {notificacoes.map(n => (
        <div
          key={n.id}
          onClick={() => handleClick(n)}
          className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${!n.read ? "bg-blue-50" : ""
            }`}
        >
          <p className="text-lg font-semibold text-gray-900">
            {n.title}
          </p>

          <span className="text-lg text-gray-500">
            {n.message}
          </span>
        </div>
      ))}

    </div>
  )
}