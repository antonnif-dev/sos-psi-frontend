import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Settings, UserPen } from "lucide-react";
import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";

function LayoutPsicologia({ children }) {
    const [menuAberto, setMenuAberto] = useState(true);

    const tenant = useTenant();

    if (!tenant) return null;

    const config =
        segmentConfig[tenant.segmento] || segmentConfig.psicologia;

    const roleUsuario = tenant.usuario?.role;

    const getSaudacao = () => {
        const hora = new Date().getHours();
        if (hora < 12) return "Bom dia";
        if (hora < 18) return "Boa tarde";
        return "Boa noite";
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-[#f7f4ff] via-[#eef8f3] to-white">

            {/* TOPBAR */}
            <header className="h-24 bg-white/90 backdrop-blur-md border-b border-violet-100 shadow-sm flex items-center justify-between px-6 md:px-10">

                {/* IDENTIDADE */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-emerald-300 flex items-center justify-center text-white text-xl font-bold shadow-md">
                        {tenant.nome?.charAt(0)}
                    </div>

                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-violet-900">
                            {tenant.nome}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Gestão terapêutica
                        </p>
                    </div>
                </div>

                {/* SAUDAÇÃO */}
                <div className="hidden md:block text-center">
                    <p className="font-semibold text-violet-800">
                        {getSaudacao()}, {tenant.usuario?.nome}
                    </p>
                    <p className="text-sm text-gray-500">
                        Cuidado e organização profissional
                    </p>
                </div>

                {/* AÇÕES */}
                <div className="flex items-center gap-3">
                    <NotificationBell />
                    <div className="w-px h-6 bg-gray-300"></div>
                    <LogoutButton />
                </div>

            </header>

            {/* MAIN */}
            <main className="flex-1 overflow-y-auto px-4 md:px-10 py-8 pb-36">

                {/* HERO */}
                <section className="mb-8">
                    <div className="relative overflow-hidden rounded-3xl bg-white border border-violet-100 shadow-md p-8">

                        <div className="absolute top-0 right-0 w-40 h-40 bg-violet-100 rounded-full blur-3xl opacity-40"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-40"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-violet-900 mb-3">
                                Seu espaço profissional
                            </h2>

                            <p className="text-gray-600 max-w-2xl">
                                Gerencie pacientes, sessões, agenda e evolução clínica
                                em um ambiente acolhedor, moderno e pensado para psicologia.
                            </p>
                        </div>

                    </div>
                </section>

                {/* CONTEÚDO */}
                <section>
                    {children}
                </section>

            </main>

            {/* MURAL */}
            <div className="pb-28">
                <MuralGlobal tenantNome={tenant.nome} />
            </div>

            {/* MENU INFERIOR */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 px-2 pb-4">
                <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border border-violet-100 rounded-3xl shadow-2xl px-4 py-4">

                    <div className="flex justify-around items-center flex-wrap gap-4">

                        {config.menu.map((item) => {
                            if (item.roles && !item.roles.includes(roleUsuario)) {
                                return null;
                            }

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="flex flex-col items-center gap-1 text-gray-600 hover:text-violet-700 transition"
                                >
                                    <span className="text-xs md:text-sm font-medium text-center">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* PERFIL */}
                        <Link
                            to="/meu-perfil"
                            className="flex flex-col items-center gap-1 text-gray-600 hover:text-violet-700 transition"
                        >
                            <UserPen size={20} />
                            <span className="text-xs font-medium">
                                Perfil
                            </span>
                        </Link>

                        {/* CONFIG */}
                        {roleUsuario === "admin" && (
                            <Link
                                to="/configuracoes"
                                className="flex flex-col items-center gap-1 text-gray-600 hover:text-violet-700 transition"
                            >
                                <Settings size={20} />
                                <span className="text-xs font-medium">
                                    Config
                                </span>
                            </Link>
                        )}

                    </div>

                </div>
            </nav>

        </div>
    );
}

export default LayoutPsicologia;