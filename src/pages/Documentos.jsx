import { useState, useEffect } from "react";
import Card from "../components/Card";
import { uploadDocumento, listarDocumentos, deletarDocumento } from "../services/documentosService";
import { useAuth } from "../hooks/useAuth";
import { db } from "../services/firebase";
import {
    collection,
    getDocs,
    doc,
    getDoc
} from "firebase/firestore";
import { formatarData, formatarHora } from "../utils/formatarData";

function Documentos() {
    const [arquivo, setArquivo] = useState(null);
    const [docs, setDocs] = useState([]);
    const [enviando, setEnviando] = useState(false);
    const [inputKey, setInputKey] = useState(Date.now());

    const { user: authUser } = useAuth();
    const [role, setRole] = useState("");
    const isAdmin = role === "admin";

    const [nomeDocumento, setNomeDocumento] = useState("");

    useEffect(() => {
        async function carregarRole() {
            if (!authUser) return;

            const tenantsSnapshot = await getDocs(collection(db, "tenants"));

            for (const tenantDoc of tenantsSnapshot.docs) {
                const userRef = doc(
                    db,
                    "tenants",
                    tenantDoc.id,
                    "usuarios",
                    authUser.uid
                );

                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();

                    setRole(data.role || "");

                    break;
                }
            }
        }

        carregarRole();
    }, [authUser]);

    async function carregar() {
        const dados = await listarDocumentos();
        setDocs(dados);
    }

    useEffect(() => {
        carregar();
    }, []);

    async function handleUpload(e) {

        e.preventDefault();

        if (!arquivo) return;

        try {

            setEnviando(true);

            const formData = new FormData();

            formData.append("file", arquivo);
            formData.append("nome", nomeDocumento);

            await uploadDocumento(formData);

            setArquivo(null);
            setNomeDocumento("");

            carregar();

        } catch (error) {

            console.log(error);

            alert("Erro ao enviar documento");

        } finally {

            setEnviando(false);
            setInputKey(Date.now());
        }

    }

    async function remover(id) {
        if (!confirm("Excluir documento?")) return;
        await deletarDocumento(id);
        carregar();
    }

    const docsOrdenados = [...docs].sort((a, b) => {

        const dataA = a.criadoEm?.seconds || 0;
        const dataB = b.criadoEm?.seconds || 0;

        return dataB - dataA;

    });

    return (

        <div className="space-y-8">
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
                        {docsOrdenados.length > 0
                            ? docsOrdenados[0].nome
                            : "—"}
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

                <div className="mb-6">

                    <div className="flex items-start justify-between gap-4 flex-col md:flex-row">

                        <div className="flex items-start gap-4">

                            <div className="
                w-12
                h-12
                rounded-xl
                bg-indigo-100
                flex
                items-center
                justify-center
                text-indigo-600
                text-xl
                font-bold
            ">
                                📄
                            </div>

                            <div>

                                <h2 className="text-lg font-semibold text-gray-800">
                                    Enviar documento
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Faça upload de arquivos importantes do consultório,
                                    prontuários, laudos, contratos e anexos.
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3">

                                    <span className="
                        text-xs
                        bg-gray-100
                        text-gray-600
                        px-2
                        py-1
                        rounded-full
                    ">
                                        PDF
                                    </span>

                                    <span className="
                        text-xs
                        bg-gray-100
                        text-gray-600
                        px-2
                        py-1
                        rounded-full
                    ">
                                        JPG
                                    </span>

                                    <span className="
                        text-xs
                        bg-gray-100
                        text-gray-600
                        px-2
                        py-1
                        rounded-full
                    ">
                                        PNG
                                    </span>

                                    <span className="
                        text-xs
                        bg-gray-100
                        text-gray-600
                        px-2
                        py-1
                        rounded-full
                    ">
                                        DOCX
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="
            bg-gray-50
            border
            border-gray-200
            rounded-xl
            px-4
            py-3
            min-w-[220px]
        ">

                            <p className="text-xs text-gray-500 mb-1">
                                Usuário conectado
                            </p>

                            <p className="text-sm font-medium text-gray-800">
                                {authUser?.displayName || authUser?.email || "Usuário"}
                            </p>

                            <div className="mt-3 text-xs text-gray-500">

                                <p>
                                    Limite recomendado:
                                </p>

                                <p className="font-medium text-gray-700">
                                    Até 10MB por arquivo
                                </p>

                            </div>

                        </div>

                    </div>

                    {arquivo && (

                        <div className="
            mt-4
            border
            border-indigo-200
            bg-indigo-50
            rounded-xl
            px-4
            py-3
        ">

                            <p className="text-sm text-indigo-700 font-medium">
                                Arquivo selecionado
                            </p>

                            <div className="mt-2 flex items-center justify-between gap-4">

                                <div>

                                    <p className="text-sm text-gray-800 break-all">
                                        {arquivo.name}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {(arquivo.size / 1024 / 1024).toFixed(2)} MB
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => setArquivo(null)}
                                    className="
                        text-red-600
                        text-sm
                        hover:underline
                    "
                                >
                                    Remover
                                </button>

                            </div>

                        </div>

                    )}

                </div>

                <form
                    onSubmit={handleUpload}
                    className="flex flex-col md:flex-row gap-3 items-start md:items-center"
                >
                    <div className="w-full md:flex-1">

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do documento
                        </label>

                        <input
                            type="text"
                            value={nomeDocumento}
                            onChange={(e) => setNomeDocumento(e.target.value)}
                            placeholder="Ex: Laudo Psicológico"
                            className="
            w-full
            border
            border-gray-300
            rounded-lg
            px-3
            py-2
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
        "
                        />

                    </div>
                    <input
                        key={inputKey}
                        type="file"
                        accept="
        .pdf,
        .doc,
        .docx,
        .png,
        .jpg,
        .jpeg
    "
                        className="
        border
        border-gray-300
        rounded-lg
        px-3
        py-2
        text-sm
        w-full
        md:w-auto
    "
                        onChange={(e) => setArquivo(e.target.files[0])}
                    />
                    <button
                        disabled={enviando}
                        className="
        bg-indigo-600
        hover:bg-indigo-700
        disabled:bg-indigo-300
        text-white
        px-4
        py-2
        rounded-lg
        text-sm
        font-medium
        transition
    "
                    >

                        {enviando
                            ? "Enviando..."
                            : "Enviar documento"}

                    </button>
                </form>

            </Card>

            {isAdmin && (
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
                        {docsOrdenados.map(d => (
                            <div
                                key={d.id}
                                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                            >

                                <div>

                                    <div className="flex items-start justify-between gap-3">

                                        <div className="flex-1">

                                            <p className="text-xs text-gray-400 mb-1">
                                                Documento
                                            </p>

                                            <a
                                                href={d.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-indigo-600 font-semibold break-words hover:underline"
                                            >
                                                {d.nome}
                                            </a>

                                        </div>

                                    </div>

                                    <div className="mt-4 space-y-2 text-sm">

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Enviado por
                                            </span>

                                            <span className="font-medium text-gray-700">
                                                {d.criadoPor?.nome || "Usuário"}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Data
                                            </span>

                                            <span className="text-gray-700">
                                                {formatarData(d.criadoEm)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Horário
                                            </span>

                                            <span className="text-gray-700">
                                                {formatarHora(d.criadoEm)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Tipo
                                            </span>

                                            <span className="text-gray-700">
                                                {d.tipo || "Arquivo"}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                <div className="mt-5 flex items-center justify-between">

                                    <a
                                        href={d.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-indigo-600 hover:underline"
                                    >
                                        Abrir
                                    </a>

                                    <button
                                        onClick={() => remover(d.id)}
                                        className="text-red-600 text-sm hover:underline"
                                    >
                                        Excluir
                                    </button>

                                </div>

                            </div>


                        ))}

                    </div>

                </div>
            )}
        </div>

    );

}

export default Documentos;
