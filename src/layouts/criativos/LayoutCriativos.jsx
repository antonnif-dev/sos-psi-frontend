import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Settings, UserPen } from "lucide-react";
import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";
import { useSegment } from "../../hooks/useSegment";

function LayoutCriativos({ children }) {
    const [menuAberto, setMenuAberto] = useState(true);

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
        <div className="flex h-screen bg-gradient-to-br from-[#0a0a0f] via-[#111827] to-[#1f2937] text-white overflow-hidden relative">

            {/* CONTEÚDO PRINCIPAL */}
            <div className="flex flex-col flex-1 min-w-0 pr-32 md:pr-72">

                {/* MAIN */}
                <main className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-16 py-8 pb-40">

                    {/* CONTEÚDO */}
                    <section>
                        {children}
                    </section>

                </main>

                {/* MENU INFERIOR */}
                <nav className="fixed bottom-0 left-0 right-0 md:right-72 z-50 px-4 pb-4">
                    <div className="md:max-w-none md:mx-0 bg-black/60 backdrop-blur-2xl border border-cyan-400/10 rounded-[2rem] shadow-2xl px-6 py-4">

                        <div className="flex justify-around items-center flex-wrap gap-4">

                            {menu.map((item) => {
                                if (item.roles && !item.roles.includes(roleUsuario)) {
                                    return null;
                                }
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="group flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-300 transition"
                                    >
                                        <span className="text-sm md:text-base font-semibold tracking-wide uppercase group-hover:scale-105 transition">
                                            {item.label}
                                        </span>
                                        <div className="w-8 h-[2px] bg-transparent group-hover:bg-cyan-300 transition"></div>
                                    </Link>
                                );
                            })}

                            {/* PERFIL */}
                            <Link
                                to="/meu-perfil"
                                className="group flex flex-col items-center gap-2 text-gray-400 hover:text-fuchsia-400 transition"
                            >
                                <UserPen size={20} />
                                <span className="text-xs uppercase font-semibold">
                                    Perfil
                                </span>
                            </Link>



                        </div>

                    </div>
                </nav>

            </div>


            <aside className="fixed right-0 top-0 h-full flex flex-col w-32 md:w-72 bg-black/40 backdrop-blur-xl border-l border-cyan-400/10 shadow-2xl z-40">

                {/* AÇÕES */}
                <div className="p-3 md:p-8 pt-24 md:pt-10 border-b border-cyan-400/10 flex flex-col md:flex-row items-center md:justify-around gap-4">
                    <LogoutButton />
                    <NotificationBell />
                    {/* CONFIG */}
                    {roleUsuario === "admin" && (
                        <Link
                            to="/configuracoes"
                            className="group flex flex-col items-center gap-2 text-gray-400 hover:text-fuchsia-400 transition"
                        >
                            <Settings size={20} />
                            <span className="text-xs uppercase font-semibold">
                                Config
                            </span>
                        </Link>
                    )}
                </div>

                {/* SAUDAÇÃO */}
                <div className="flex flex-col justify-start px-3 md:px-8 py-4 md:py-8 text-center md:text-left gap-16">
                    <p className="text-[10px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.25em] text-cyan-300 mb-3 break-words">
                        Dashboard criativo
                    </p>

                    <h3 className="text-sm md:text-3xl font-bold mb-3 leading-tight break-words">
                        {getSaudacao()},<br />
                        {tenant.usuario?.nome}
                    </h3>

                    <p className="text-xs md:text-base text-gray-400 break-words leading-relaxed">
                        Crie, organize e entregue experiências visuais memoráveis.
                    </p>
                </div>

                <div className="p-3 md:p-8 border-b border-cyan-400/10 text-center md:text-left">

                    <div className="w-14 h-14 md:w-20 md:h-20 mx-auto md:mx-0 rounded-[2rem] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-purple-600 flex items-center justify-center text-4xl shadow-xl mb-6">
                        🎬
                    </div>

                    <h2 className="text-sm md:text-2xl font-bold text-white mb-2 break-words">
                        {tenant.nome}
                    </h2>

                    <p className="text-xs md:text-base text-gray-400 leading-relaxed break-words">
                        Estúdio criativo, fotografia e produção visual.
                    </p>

                </div>

                <div className="pb-24 md:pb-20 text-center text-xs md:text-base px-2">
                    <h2>desenvolvido por Antonni Dev</h2>
                </div>

            </aside>

        </div>
    );

}

export default LayoutCriativos;