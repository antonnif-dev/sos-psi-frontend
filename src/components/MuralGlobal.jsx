import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    limit,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

function MuralGlobal({ tenantNome }) {

    const [maximizado, setMaximizado] = useState(false);
    const [aba, setAba] = useState("discussoes_clinicas");
    const [mensagens, setMensagens] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState("");

    const [naoLidas, setNaoLidas] = useState({});
    const [ultimaLeitura, setUltimaLeitura] = useState({});

    const abas = [
        { id: "discussoes_clinicas", nome: "Discussão clínica" },
        { id: "indicacao_livros", nome: "Livros" },
        { id: "duvidas_profissionais", nome: "Dúvidas" },
        { id: "conversas_gerais", nome: "Geral" }
    ];

    useEffect(() => {
        async function carregarLeitura() {
            const ref = doc(db, "mural_leituras", tenantNome);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setUltimaLeitura(snap.data());
            }
        }
        carregarLeitura();
    }, [tenantNome]);

    useEffect(() => {
        abas.forEach((a) => {
            const q = query(
                collection(db, "mural", a.id, "mensagens"),
                orderBy("data", "desc"),
                limit(50)
            );

            onSnapshot(q, (snapshot) => {
                let contador = 0;

                snapshot.forEach((doc) => {
                    const msg = doc.data();
                    const dataMsg = msg.data?.toDate?.();
                    const ultima = ultimaLeitura[a.id];
                    if (!ultima || dataMsg > new Date(ultima)) {
                        contador++;
                    }
                });

                setNaoLidas(prev => ({
                    ...prev,
                    [a.id]: contador
                }));
            });
        });
    }, [ultimaLeitura]);

    const mensagemSistema = {
        discussoes_clinicas: "Qual caso clínico recente te trouxe mais reflexão?",
        indicacao_livros: "Qual livro sobre psicologia você recomenda?",
        duvidas_profissionais: "Qual dúvida profissional você gostaria de discutir?",
        conversas_gerais: "Espaço aberto para conversas entre colegas."
    };

    // carregar mensagens da aba ativa
    useEffect(() => {

        const q = query(
            collection(db, "mural", aba, "mensagens"),
            orderBy("data", "asc"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {

            const lista = [];

            snapshot.forEach((doc) => {
                lista.push({ id: doc.id, ...doc.data() });
            });

            setMensagens(lista);

        });

        return () => unsubscribe();

    }, [aba]);



    // enviar mensagem
    const enviarMensagem = async () => {

        if (!novaMensagem.trim()) return;

        try {

            await addDoc(
                collection(db, "mural", aba, "mensagens"),
                {
                    tenantNome,
                    mensagem: novaMensagem,
                    data: serverTimestamp()
                }
            );

            setNovaMensagem("");

        } catch (erro) {

            console.error("Erro ao enviar mensagem:", erro);

        }

    };

    const abrirAba = async (id) => {
        setAba(id);
        const ref = doc(db, "mural_leituras", tenantNome);
        await setDoc(ref, {
            [id]: new Date()
        }, { merge: true });

        setNaoLidas(prev => ({
            ...prev,
            [id]: 0
        }));
    };

    return (
        <div
            className={`
  fixed bottom-0
  right-2
  bg-white border shadow-xl
  w-[70%] md:w-[500px]
  md:right-5
  transition-all
  ${maximizado ? "h-[70vh]" : "h-[90px]"}
  `}
        >

            {/* HEADER */}

            <div
                className="bg-gray-900 text-white px-3 py-2 flex justify-between items-center cursor-pointer"
                onDoubleClick={() => setMaximizado(!maximizado)}
            >

                <span className="text-sm font-semibold">
                    Comunidade de Psicólogos
                </span>

                <button
                    onClick={() => setMaximizado(!maximizado)}
                    className="text-xs bg-gray-700 px-2 py-1 rounded"
                >
                    {maximizado ? "—" : "⬆"}
                </button>

            </div>



            {/* ABAS */}

            <div className="flex text-xs border-b">
                {abas.map((a) => (

                    <button
                        key={a.id}
                        onClick={() => abrirAba(a.id)}
                        className={`
            flex-1 p-2 text-center
            ${aba === a.id ? "bg-gray-200 font-semibold" : ""}
            `}
                    >
                        {a.nome}

                        {naoLidas[a.id] > 0 && (
                            <span className="ml-1 bg-red-500 text-white text-[10px] px-1 rounded">
                                {naoLidas[a.id]}
                            </span>
                        )}
                    </button>
                ))}
            </div>



            {/* MENSAGENS */}

            {maximizado && (

                <>

                    <div className="flex-1 overflow-y-auto p-3 text-sm h-[calc(70vh-140px)]">

                        {/* mensagem sistema */}

                        <div className="bg-gray-100 p-2 rounded text-gray-600 mb-3 text-lg md:text-xl">
                            {mensagemSistema[aba]}
                        </div>


                        {mensagens.map((msg) => (

                            <div key={msg.id} className="mb-3">

                                <div className="text-xs text-gray-500">
                                    {msg.tenantNome} • {
                                        msg.data?.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                    }
                                </div>

                                <div>
                                    {msg.mensagem}
                                </div>

                            </div>

                        ))}

                    </div>



                    {/* INPUT */}

                    <div className="border-t p-2 flex gap-2">

                        <input
                            className="flex-1 border rounded p-2 text-sm"
                            placeholder="Escreva sua mensagem..."
                            value={novaMensagem}
                            onChange={(e) => setNovaMensagem(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") enviarMensagem();
                            }}
                        />

                        <button
                            onClick={enviarMensagem}
                            className="bg-gray-900 text-white px-3 rounded text-sm"
                        >
                            Enviar
                        </button>

                    </div>

                </>

            )}

        </div>
    );
}

export default MuralGlobal;