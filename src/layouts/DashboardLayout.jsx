import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Settings } from "lucide-react";
import { buscarTenant } from "../services/tenantService";
import { auth, db } from "../services/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import NotificationBell from "../components/NotificationBell"

function DashboardLayout({ children }) {
    const [menuAberto, setMenuAberto] = useState(true);
    const [tenantNome, setTenantNome] = useState("Carregando...");
    const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (!user) return;
                const uid = user.uid;
                const tenantsSnapshot = await getDocs(collection(db, "tenants"));
                for (const tenantDoc of tenantsSnapshot.docs) {
                    const tenantId = tenantDoc.id;
                    const userRef = doc(db, "tenants", tenantId, "usuarios", uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const tenantData = tenantDoc.data();
                        const userData = userSnap.data();

                        setTenantNome(tenantData.nome);
                        setNomeUsuario(userData.nome);

                        break;
                    }
                }
            } catch (error) {
                console.error("ERRO AO BUSCAR TENANT:", error);
            }
        });
        return () => unsubscribe();
    }, []);

    const getSaudacao = () => {
        const hora = new Date().getHours();

        if (hora < 12) return "Bom dia";
        if (hora < 18) return "Boa tarde";
        return "Boa noite";
    };

    return (
        <div className="flex h-screen relative">

            <aside
                className={`
                    bg-gray-900 text-white transition-all duration-300 overflow-hidden
                    ${menuAberto ? "w-36 md:w-56 p-5" : "w-0 p-0"} `}
            >
                <h2 className="text-xl font-bold mt-5 mb-20">
                    {tenantNome}
                </h2>
                <nav className="flex flex-col gap-4">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/pacientes">Pacientes</Link>
                    <Link to="/agenda">Agenda</Link>
                    <Link to="/sessoes">Sessões realizadas</Link>
                    <Link to="/financeiro">Financeiro</Link>
                    <Link to="/documentos">Documentos</Link>
                    <Link to="/prontuario">Prontuário</Link>
                    <Link to="/mapa-evolucao">Mapa de Evolução</Link>
                    <Link to="/prescricao">Prescrição</Link>
                    <Link to="/configuracoes" className="flex justify-center mt-5"><Settings size={20} /></Link>
                </nav>
            </aside>
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="absolute top-1/2 -translate-y-1/2 bg-gray-900 text-white p-1 rounded-r-md shadow transition-all"
                style={{ left: menuAberto ? "clamp(9rem, 20vw, 14rem)" : "0px" }}
            >
                {menuAberto ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </button>
            <div className="flex flex-col flex-1">

                {/* TOPBAR */}
                <div className="h-16 bg-white border-b shadow-sm grid grid-cols-3 items-center px-6">

                    {/* ESQUERDA */}
                    <div className="font-semibold">
                        {tenantNome}
                    </div>

                    {/* CENTRO */}
                    <div className="text-center font-medium">
                        {getSaudacao()}, {nomeUsuario}
                    </div>

                    {/* DIREITA */}
                    <div className="flex justify-end items-center gap-4">
                        <NotificationBell />
                        <div className="w-px h-6 bg-gray-300"></div>
                        <LogoutButton />
                    </div>

                </div>

                {/* CONTEÚDO */}
                <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}

export default DashboardLayout;