import api from "./api"

export async function buscarhMedicamentos(term){
  const res = await api.get(`/medicamentos/busca?q=${term}`)
  return res.data
}