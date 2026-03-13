import api from "./api";

export async function uploadDocumento(formData){
 const res = await api.post("/documentos",formData,{
  headers:{ "Content-Type":"multipart/form-data" }
 });
 return res.data;
}

export async function listarDocumentos(){
 const res = await api.get("/documentos");
 return res.data;
}

export async function deletarDocumento(id){
 const res = await api.delete(`/documentos/${id}`);
 return res.data;
}