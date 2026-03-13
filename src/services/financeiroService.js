import api from "./api";

export async function listarPagamentos(){
 const res = await api.get("/financeiro");
 return res.data;
}

export async function criarPagamento(data){
 const res = await api.post("/financeiro",data);
 return res.data;
}

export async function editarPagamento(id,data){
 const res = await api.put(`/financeiro/${id}`,data);
 return res.data;
}

export async function deletarPagamento(id){
 const res = await api.delete(`/financeiro/${id}`);
 return res.data;
}