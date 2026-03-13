import api from "./api";

export async function listarPacientes() {
 const res = await api.get("/pacientes");
 return res.data;
}

export async function criarPaciente(data) {
 const res = await api.post("/pacientes", data);
 return res.data;
}

export async function editarPaciente(id, data){
 const res = await api.put(`/pacientes/${id}`, data);
 return res.data;
}

export async function deletarPaciente(id){
 const res = await api.delete(`/pacientes/${id}`);
 return res.data;
}