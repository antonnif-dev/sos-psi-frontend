import { useEffect, useState } from "react";
import Card from "../../components/Card";

function CampoNumero({ label, value, setter, disabled }) {
    return (
        <input
            type="number"
            min="1"
            max="10"
            placeholder={label}
            value={value}
            disabled={disabled}
            onChange={(e) => setter(Number(e.target.value))}
            className={`border rounded p-2 ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
        />
    );
}

function DemoProntuario() {
    const [prontuarios, setProntuarios] = useState([]);
    const [paciente, setPaciente] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [editando, setEditando] = useState(null);
    const [visualizando, setVisualizando] = useState(false);

    const [sugestoes, setSugestoes] = useState([]);

    const [humor, setHumor] = useState("");
    const [ansiedade, setAnsiedade] = useState("");
    const [estresse, setEstresse] = useState("");
    const [irritabilidade, setIrritabilidade] = useState("");
    const [tristeza, setTristeza] = useState("");

    const [sono, setSono] = useState("");
    const [energia, setEnergia] = useState("");
    const [apetite, setApetite] = useState("");

    const [concentracao, setConcentracao] = useState("");
    const [pensamentosNegativos, setPensamentosNegativos] = useState("");
    const [ruminacao, setRuminacao] = useState("");

    const [produtividade, setProdutividade] = useState("");
    const [interacaoSocial, setInteracaoSocial] = useState("");
    const [motivacao, setMotivacao] = useState("");

    const pacientesMock = [

        {
            id: 1,
            nome: "Mariana Souza"
        },
        {
            id: 2,
            nome: "Carlos Henrique"
        },
        {
            id: 3,
            nome: "Fernanda Lima"
        },
        {
            id: 4,
            nome: "João Pedro"
        },
        {
            id: 5,
            nome: "Patrícia Alves"
        }

    ];

    function buscarPaciente(texto) {

        setPaciente(texto);

        if (!texto) {

            setSugestoes([]);

            return;
        }

        const filtrados =
            pacientesMock.filter((p) =>
                p.nome
                    .toLowerCase()
                    .includes(texto.toLowerCase())
            );

        setSugestoes(filtrados);

    }

    function limparCampos() {
        setPaciente("");
        setObservacoes("");

        setHumor("");
        setAnsiedade("");
        setEstresse("");
        setIrritabilidade("");
        setTristeza("");

        setSono("");
        setEnergia("");
        setApetite("");

        setConcentracao("");
        setPensamentosNegativos("");
        setRuminacao("");

        setProdutividade("");
        setInteracaoSocial("");
        setMotivacao("");

        setEditando(null);
        setVisualizando(false);
    }

    function visualizarProntuario(p) {
        setPaciente(p.paciente);
        setObservacoes(p.observacoes);

        setHumor(p.humor);
        setAnsiedade(p.ansiedade);
        setEstresse(p.estresse);
        setIrritabilidade(p.irritabilidade);
        setTristeza(p.tristeza);

        setSono(p.sono);
        setEnergia(p.energia);
        setApetite(p.apetite);

        setConcentracao(p.concentracao);
        setPensamentosNegativos(p.pensamentosNegativos);
        setRuminacao(p.ruminacao);

        setProdutividade(p.produtividade);
        setInteracaoSocial(p.interacaoSocial);
        setMotivacao(p.motivacao);

        setVisualizando(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function handleSubmit(e) {

        e.preventDefault();

        const novo = {

            id: Date.now(),

            paciente,

            observacoes,

            humor,
            ansiedade,
            estresse,
            irritabilidade,
            tristeza,

            sono,
            energia,
            apetite,

            concentracao,
            pensamentosNegativos,
            ruminacao,

            produtividade,
            interacaoSocial,
            motivacao,

            dataSessao: new Date()

        };

        setProntuarios([
            novo,
            ...prontuarios
        ]);

        limparCampos();

    }

    function remover(id) {

        const novaLista =
            prontuarios.filter((p) => p.id !== id);

        setProntuarios(novaLista);

    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800"> Prontuário
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Registre observações e histórico das sessões
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Sessões registradas
                    </p>
                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {prontuarios.length}
                    </p>
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Prontuário
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Registre observações e histórico das sessões
                </p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="relative">
                        <input
                            className="border rounded px-3 py-2 w-full"
                            placeholder="Paciente"
                            value={paciente}
                            onChange={(e) => {
                                setVisualizando(false);
                                buscarPaciente(e.target.value);
                            }}
                        />

                        {sugestoes.length > 0 && (
                            <div className="absolute bg-white border w-full mt-1 rounded shadow">
                                {sugestoes.map(s => (
                                    <div
                                        key={s.id}
                                        onClick={() => {
                                            setPaciente(s.nome);
                                            setSugestoes([]);
                                        }}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {s.nome}
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    <div className="grid md:grid-cols-3 gap-3">

                        <CampoNumero label="Humor (1-10)" value={humor} setter={setHumor} disabled={visualizando} />
                        <CampoNumero label="Ansiedade (1-10)" value={ansiedade} setter={setAnsiedade} disabled={visualizando} />
                        <CampoNumero label="Estresse (1-10)" value={estresse} setter={setEstresse} disabled={visualizando} />
                        <CampoNumero label="Irritabilidade (1-10)" value={irritabilidade} setter={setIrritabilidade} disabled={visualizando} />
                        <CampoNumero label="Tristeza (1-10)" value={tristeza} setter={setTristeza} disabled={visualizando} />

                        <CampoNumero label="Sono (1-10)" value={sono} setter={setSono} disabled={visualizando} />
                        <CampoNumero label="Energia (1-10)" value={energia} setter={setEnergia} disabled={visualizando} />
                        <CampoNumero label="Apetite (1-10)" value={apetite} setter={setApetite} disabled={visualizando} />

                        <CampoNumero label="Concentração (1-10)" value={concentracao} setter={setConcentracao} disabled={visualizando} />
                        <CampoNumero label="Pensamentos negativos (1-10)" value={pensamentosNegativos} setter={setPensamentosNegativos} disabled={visualizando} />
                        <CampoNumero label="Ruminação (1-10)" value={ruminacao} setter={setRuminacao} disabled={visualizando} />

                        <CampoNumero label="Produtividade (1-10)" value={produtividade} setter={setProdutividade} disabled={visualizando} />
                        <CampoNumero label="Interação social (1-10)" value={interacaoSocial} setter={setInteracaoSocial} disabled={visualizando} />
                        <CampoNumero label="Motivação (1-10)" value={motivacao} setter={setMotivacao} disabled={visualizando} />

                    </div>

                    <textarea
                        rows="4"
                        className="border rounded px-3 py-2"
                        placeholder="Observações da sessão"
                        value={observacoes}
                        disabled={visualizando}
                        onChange={(e) => setObservacoes(e.target.value)}
                    />

                    <div className="flex gap-3">
                        {!visualizando && (
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
                                Salvar sessão
                            </button>
                        )}

                        {visualizando && (
                            <button
                                type="button"
                                onClick={limparCampos}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Fechar
                            </button>
                        )}

                        {editando && (
                            <button
                                type="button"
                                onClick={limparCampos}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                        )}

                    </div>

                </form>

            </Card>

            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Histórico de sessões
                </h2>
                {prontuarios.length === 0 && (
                    <Card>
                        <p className="text-gray-500 text-sm">
                            Nenhum prontuário registrado ainda.
                        </p>
                    </Card>
                )}

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {prontuarios.map(p => (
                        <div
                            key={p.id}
                            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                        >
                            <p className="text-sm text-gray-500 mb-1">
                                Paciente
                            </p>
                            <p className="font-medium text-gray-800 mb-3">
                                {p.paciente}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                Data da sessão
                            </p>

                            <p className="text-sm text-gray-700 mb-3">
                                {p.dataSessao
                                    ? new Date(p.dataSessao).toLocaleString("pt-BR")
                                    : "Data não registrada"}
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                                Observações
                            </p>
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                {p.observacoes}
                            </p>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => visualizarProntuario(p)}
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    Visualizar
                                </button>
                                <button
                                    onClick={() => remover(p.id)}
                                    className="text-red-600 text-sm hover:underline"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default DemoProntuario;