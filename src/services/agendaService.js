import api from "./api";

export async function listarConsultas(){
 const res = await api.get("/agenda");
 return res.data;
}

export async function criarConsulta(data){
 const res = await api.post("/agenda",data);
 return res.data;
}

export async function editarConsulta(id,data){
 const res = await api.put(`/agenda/${id}`,data);
 return res.data;
}

export async function deletarConsulta(id){
 const res = await api.delete(`/agenda/${id}`);
 return res.data;
}