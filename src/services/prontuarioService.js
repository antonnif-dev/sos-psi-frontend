import api from "./api";

export async function listarProntuarios(){
 const res = await api.get("/prontuario");
 return res.data;
}

export async function criarProntuario(data){
 const res = await api.post("/prontuario",data);
 return res.data;
}

export async function editarProntuario(id,data){
 const res = await api.put(`/prontuario/${id}`,data);
 return res.data;
}

export async function deletarProntuario(id){
 const res = await api.delete(`/prontuario/${id}`);
 return res.data;
}