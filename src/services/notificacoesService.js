import api from "./api"

export async function getNotificacoes(){
  const res = await api.get("/notificacoes")
  return res.data
}

export const getUnreadCount = async () => {
  const { data } = await api.get("/notificacoes/unread-count")
  return data.count
}

export const markAsRead = async (id) => {
  await api.patch(`/notificacoes/${id}/read`)
}