import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { db, auth } from "../services/firebase";
import {
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    addDoc
} from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { criarUsuario } from "../services/meuPerfilService";

export default function MeuPerfil() {
    const { user: authUser } = useAuth(); // usuário logado do Firebase Auth

    const [tenantId, setTenantId] = useState(null);
    const [perfil, setPerfil] = useState({
        nome: "",
        email: "",
        telefone: "",
        profissionalId: "",
        role: ""
    });

    const [novoUsuario, setNovoUsuario] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        profissionalId: "",
        especialidade: "",
        corAgenda: "#6366f1",
        role: "psicologo"
    });

    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");

    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(""); // role do usuário

    const isAdmin = role === "admin";

    // --- Carregar perfil e role ---
    useEffect(() => {
        async function carregarPerfil() {
            if (!authUser) return;

            const tenantsSnapshot = await getDocs(collection(db, "tenants"));

            for (const tenantDoc of tenantsSnapshot.docs) {
                const userRef = doc(db, "tenants", tenantDoc.id, "usuarios", authUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setTenantId(tenantDoc.id);
                    const data = userSnap.data();
                    setPerfil({
                        nome: data.nome || "",
                        email: data.email || "",
                        telefone: data.telefone || "",
                        profissionalId: data.profissionalId || "",
                        role: data.role || ""
                    });
                    setRole(data.role || "user"); // define role
                    break;
                }
            }
            setLoading(false);
        }

        carregarPerfil();
    }, [authUser]);

    // --- Alterar campos ---
    function handleChange(e) {
        setPerfil({ ...perfil, [e.target.name]: e.target.value });
    }

    function handleNovoUsuarioChange(e) {
        const { name, value } = e.target;
        setNovoUsuario(prev => ({ ...prev, [name]: value }));
    }

    // --- Salvar perfil ---
    async function salvarPerfil() {
        if (!tenantId) return;

        const ref = doc(db, "tenants", tenantId, "usuarios", authUser.uid);
        await updateDoc(ref, {
            nome: perfil.nome,
            email: perfil.email,
            telefone: perfil.telefone,
            profissionalId: perfil.profissionalId,
            role: perfil.role
        });
        alert("Perfil atualizado com sucesso!");
    }

    // --- Alterar senha ---
    async function alterarSenha() {
        if (!senhaAtual || !novaSenha) {
            alert("Preencha a senha atual e a nova senha");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(authUser.email, senhaAtual);
            await reauthenticateWithCredential(authUser, credential);
            await updatePassword(authUser, novaSenha);
            setSenhaAtual("");
            setNovaSenha("");
            alert("Senha alterada com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao alterar senha: " + err.message);
        }
    }

    // --- Criar usuário (apenas admin) ---
    async function criarNovoUsuario() {
        try {
            await criarUsuario({
                ...novoUsuario,
                tenantId
            });

            alert("Usuário criado com sucesso");

            setNovoUsuario({
                nome: "",
                email: "",
                senha: "",
                role: "psicologo"
            });

        } catch (err) {
            console.error(err);
            alert("Erro ao criar usuário");
        }
    }

    if (loading) return <p>Carregando...</p>;

    return (
        <div className="space-y-8 max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold">Meu Perfil</h1>

            {/* --- Perfil --- */}
            <div className="bg-white p-6 rounded shadow flex flex-col gap-4">
                <h2 className="font-semibold text-lg">Informações Pessoais</h2>

                <input
                    name="nome"
                    value={perfil.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    className="border p-2 rounded"
                />
                <input
                    name="email"
                    value={perfil.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded"
                />
                <input
                    name="telefone"
                    value={perfil.telefone}
                    onChange={handleChange}
                    placeholder="Telefone"
                    className="border p-2 rounded"
                />
                <input
                    name="profissionalId"
                    value={perfil.profissionalId || ""}
                    onChange={handleChange}
                    placeholder="Registro Profissional"
                    className="border p-2 rounded"
                />

                <button
                    onClick={salvarPerfil}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Salvar Perfil
                </button>
            </div>

            {/* --- Alterar senha --- */}
            <div className="bg-white p-6 rounded shadow flex flex-col gap-4">
                <h2 className="font-semibold text-lg">Alterar Senha</h2>

                <input
                    type="password"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                    placeholder="Senha atual"
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Nova senha"
                    className="border p-2 rounded"
                />

                <button
                    onClick={alterarSenha}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Alterar Senha
                </button>
            </div>

            {/* --- Criar usuário (admin) --- */}
            {isAdmin && (
                <div className="bg-white p-6 rounded shadow flex flex-col gap-4">
                    <h2 className="font-semibold text-lg">Criar Novo Usuário</h2>

                    <input
                        name="nome"
                        value={novoUsuario.nome}
                        onChange={handleNovoUsuarioChange}
                        placeholder="Nome"
                        className="border p-2 rounded"
                    />
                    <input
                        name="email"
                        value={novoUsuario.email}
                        onChange={handleNovoUsuarioChange}
                        placeholder="Email"
                        className="border p-2 rounded"
                    />
                    <input
                        type="password"
                        name="senha"
                        value={novoUsuario.senha}
                        onChange={handleNovoUsuarioChange}
                        placeholder="Senha"
                        className="border p-2 rounded"
                    />
                    <input
                        name="telefone"
                        value={novoUsuario.telefone}
                        onChange={handleNovoUsuarioChange}
                        placeholder="Telefone"
                        className="border p-2 rounded"
                    />
                    {isAdmin && (
                        <select
                            name="role"
                            value={novoUsuario.role}
                            onChange={handleNovoUsuarioChange}
                            className="border p-2 rounded"
                        >
                            <option value="psicologo">Psicólogo</option>
                            <option value="secretaria">Secretaria</option>
                            <option value="admin">Administrador</option>
                        </select>
                    )}
                    <input
                        name="especialidade"
                        value={novoUsuario.especialidade}
                        onChange={handleNovoUsuarioChange}
                        placeholder="Especialidade"
                        className="border p-2 rounded"
                    />
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium">
                            Cor da agenda
                        </label>

                        <input
                            type="color"
                            name="corAgenda"
                            value={novoUsuario.corAgenda}
                            onChange={handleNovoUsuarioChange}
                            className="w-14 h-10 border rounded cursor-pointer"
                        />

                        <span className="text-sm text-gray-500">
                            {novoUsuario.corAgenda}
                        </span>
                    </div>
                    <button
                        onClick={criarNovoUsuario}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Criar Usuário
                    </button>
                </div>
            )}
        </div>
    );
}