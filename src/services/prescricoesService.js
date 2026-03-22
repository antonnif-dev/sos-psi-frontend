import api from "./api";

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