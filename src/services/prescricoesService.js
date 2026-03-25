import api from "./api";

export async function buscarTemplate(sintoma) {
  const res = await api.get(`/prescricoes/templates?sintoma=${sintoma}`)
  return res.data
}

export async function listarPrescricoesPaciente(pacienteId) {
  const res = await api.get(`/prescricoes/paciente/${pacienteId}`);
  return res.data;
}

export async function deletarPrescricao(id) {
  await api.delete(`/prescricoes/${id}`);
}

export async function buscarMedicamentos(busca) {
  const res = await api.get(`/medicamentos?busca=${busca}`)
  return res.data
}

export async function salvarPrescricao(data) {
  console.log("enviando prescrição:", data)
  const res = await api.post("/prescricoes", data)
  return res.data
}

export async function assinarPrescricao(id, imagem) {
  const res = await api.post(
    `/prescricoes/${id}/assinar`,
    { imagem }
  )
  return res.data
}

export async function enviarParaAssinatura(id) {
  const res = await api.post(`/prescricoes/${id}/enviar-assinatura`)
  return res.data
}