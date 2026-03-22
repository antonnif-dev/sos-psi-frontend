import api from "./api"

export const getNotificacoes = async () => {
  const { data } = await api.get("/notificacoes")
  return data
}

export const getUnreadCount = async () => {
  const { data } = await api.get("/notificacoes/unread-count")
  return data.count
}

export const markAsRead = async (id) => {
  await api.patch(`/notificacoes/${id}/read`)
}