import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen">
            <aside className="w-36 bg-gray-900 text-white p-5">
                <h2 className="text-xl font-bold mt-5 mb-20">
                    SOS Psicólogo
                </h2>
                <nav className="flex flex-col gap-4">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/pacientes">Pacientes</Link>
                    <Link to="/agenda">Agenda</Link>
                    <Link to="/financeiro">Financeiro</Link>
                    <Link to="/documentos">Documentos</Link>
                    <Link to="/prontuario">Prontuário</Link>
                    <Link to="/mapa-evolucao">Mapa de Evolução</Link>
                </nav>
                <div className="flex justify-center mt-20">
                    <LogoutButton />
                </div>
            </aside>
            <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;