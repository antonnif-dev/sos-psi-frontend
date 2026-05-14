import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { Settings, UserPen, HeartPulse } from "lucide-react";
import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { useSegment } from "../../hooks/useSegment";
import { segmentConfig } from "../../config/segmentConfig";

function LayoutPsicologia({ children }) {
    const tenant = useTenant();
    const {
        labels,
        menu,
        theme
    } = useSegment();

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
        <div className="flex flex-col h-screen bg-gradient-to-br from-[#f3f8f7] via-[#edf7fb] to-[#ffffff] text-slate-700">

            {/* TOPBAR */}
            <header className="h-24 bg-white/90 backdrop-blur-md border-b border-cyan-100 shadow-sm flex items-center justify-between px-6 md:px-10">

                {/* IDENTIDADE */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 via-teal-400 to-emerald-400 flex items-center justify-center text-white shadow-lg">
                        <HeartPulse size={26} />
                    </div>

                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-cyan-900">
                            {tenant.nome}
                        </h1>
                        <p className="text-sm text-cyan-600">
                            Saúde, cuidado e gestão clínica
                        </p>
                    </div>
                </div>

                {/* SAUDAÇÃO */}
                <div className="hidden md:block text-center">
                    <p className="font-semibold text-cyan-800">
                        {getSaudacao()}, {tenant.usuario?.nome}
                    </p>
                    <p className="text-sm text-slate-500">
                        Cuidado humano com excelência profissional
                    </p>
                </div>

                {/* AÇÕES */}
                <div className="flex items-center gap-4">
                    {roleUsuario === "admin" && (
                        <Link
                            to="/configuracoes"
                            className="flex flex-col items-center gap-1 text-slate-600 hover:text-cyan-700 transition"
                        >
                            <Settings size={20} />
                            <span className="text-xs font-medium">
                                Config
                            </span>
                        </Link>
                    )}
                    <NotificationBell />
                    <div className="w-px h-6 bg-slate-300"></div>
                    <LogoutButton />
                </div>

            </header>

            {/* MAIN */}
            <main className="flex-1 overflow-y-auto px-4 md:px-10 py-8 pb-36">

                {/* CONTEÚDO */}
                <section>
                    {children}
                </section>

            </main>

            {/* MENU INFERIOR */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 px-1 md:px-15 py-1">
                <div className="bg-cyan-500 backdrop-blur-xl border border-cyan-100 rounded-3xl shadow-2xl px-4 py-4">

                    <div className="flex justify-center md:justify-around items-center flex-wrap md:flex-nowrap rounded-2xl gap-1 lg:gap-4">

                        {menu.map((item) => {
                            if (item.roles && !item.roles.includes(roleUsuario)) {
                                return null;
                            }

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="flex flex-col items-center justify-center min-w-[75px] gap-1 md:gap-5 text-slate-600 hover:text-cyan-700 transition"
                                >
                                    <span className="text-xs md:text-2xl font-medium text-center">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* PERFIL */}
                        <Link
                            to="/meu-perfil"
                            className="flex flex-col items-center justify-center min-w-[75px] gap-1 text-slate-600 hover:text-cyan-700 transition"
                        >
                            <UserPen size={20} />
                            <span className="text-xs font-medium">
                                Perfil
                            </span>
                        </Link>

                    </div>

                </div>
            </nav>

        </div>
    );
}

export default LayoutPsicologia;