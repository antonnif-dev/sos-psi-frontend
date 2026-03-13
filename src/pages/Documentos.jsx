import { useState, useEffect } from "react";
import Card from "../components/Card";
import { uploadDocumento, listarDocumentos, deletarDocumento } from "../services/documentosService";

function Documentos() {
    const [arquivo, setArquivo] = useState(null);
    const [docs, setDocs] = useState([]);

    async function carregar() {
        const dados = await listarDocumentos();
        setDocs(dados);
    }
    useEffect(() => {
        carregar();
    }, []);

    async function handleUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", arquivo);
        await uploadDocumento(formData);
        setArquivo(null);
        carregar();
    }

    async function remover(id) {
        if (!confirm("Excluir documento?")) return;
        await deletarDocumento(id);
        carregar();
    }

    return (

        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Documentos
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Gerencie arquivos e documentos do consultório
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Total de documentos
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {docs.length}
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Último arquivo enviado
                    </p>

                    <p className="text-lg font-medium text-gray-800 mt-2">
                        {docs.length > 0 ? docs[docs.length - 1].nome : "—"}
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Status
                    </p>

                    <p className="text-lg font-medium text-green-600 mt-2">
                        Sistema ativo
                    </p>

                </div>

            </div>

            <Card>

                <div className="mb-4">

                    <h2 className="text-lg font-semibold text-gray-800">
                        Enviar documento
                    </h2>

                    <p className="text-sm text-gray-500">
                        Faça upload de arquivos importantes
                    </p>

                </div>

                <form
                    onSubmit={handleUpload}
                    className="flex flex-col md:flex-row gap-3 items-start md:items-center"
                >
                    <input
                        type="file"
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        onChange={(e) => setArquivo(e.target.files[0])}
                    />
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"

                    > Enviar documento </button>
                </form>

            </Card>

            <div>

                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Biblioteca de documentos
                </h2>

                {docs.length === 0 && (

                    <Card>

                        <p className="text-gray-500 text-sm">
                            Nenhum documento enviado ainda.
                        </p>

                    </Card>

                )}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {docs.map(d => (

                        <div
                            key={d.id}
                            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                        >

                            <p className="text-sm text-gray-500 mb-1">
                                Documento
                            </p>

                            <a
                                href={d.url}
                                target="_blank"
                                className="text-indigo-600 font-medium break-words hover:underline"

                            >

                                {d.nome} </a>

                            <button onClick={() => remover(d.id)} className="text-red-600 text-sm mx-10 hover:underline"> Excluir
                            </button>

                        </div>


                    ))}

                </div>

            </div>

        </div>

    );

}

export default Documentos;
