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
                        setTenantNome(tenantData.nome);
                        break;
                    }
                }
            } catch (error) {
                console.error("ERRO AO BUSCAR TENANT:", error);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex h-screen relative">

            <aside
                className={`
        bg-gray-900 text-white transition-all duration-300 overflow-hidden
        ${menuAberto ? "w-36 p-5" : "w-0 p-0"} `}
            >
                <h2 className="text-xl font-bold mt-5 mb-20">
                    {tenantNome}
                </h2>
                <nav className="flex flex-col gap-4">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/pacientes">Pacientes</Link>
                    <Link to="/agenda">Agenda</Link>
                    <Link to="/financeiro">Financeiro</Link>
                    <Link to="/documentos">Documentos</Link>
                    <Link to="/prontuario">Prontuário</Link>
                    <Link to="/mapa-evolucao">Mapa de Evolução</Link>
                    <Link to="/prescricao">Prescrição</Link>
                    <Link to="/configuracoes" className="flex justify-center mt-5"><Settings size={20} /></Link>

                    <div className="flex justify-center mt-5">
                        <NotificationBell />
                    </div>

                </nav>
                <div className="flex justify-center mt-10">
                    <LogoutButton />
                </div>
            </aside>
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="absolute top-1/2 -translate-y-1/2 bg-gray-900 text-white p-1 rounded-r-md shadow transition-all"
                style={{ left: menuAberto ? "103px" : "0px" }}
            >
                {menuAberto ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </button>
            <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;