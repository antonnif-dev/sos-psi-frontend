import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import {
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
    UserPen,
    GraduationCap
} from "lucide-react";

import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";
import { useSegment } from "../../hooks/useSegment";

function LayoutEducacao({ children }) {
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
        <div className="flex h-screen bg-gradient-to-br from-[#f8fbff] via-[#eef4ff] to-[#fdfcff] text-slate-800 overflow-hidden relative">

            {/* MENU + PAINEL LATERAL */}
            <aside
                className={`
                fixed md:relative top-0 left-0 h-full z-50
                bg-white/95 backdrop-blur-xl border-r border-indigo-100 shadow-2xl
                transition-all duration-300 flex flex-col
                ${menuAberto
                        ? "w-44 md:52 lg:w-72 translate-x-0"
                        : "w-0 md:w-24 -translate-x-full md:translate-x-0 overflow-hidden"}
            `}
            >
                <div className="p-6 md:p-10 lg:p-14 border-b border-indigo-100 ">
                    {menuAberto ? (
                        <>
                            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-violet-500 mb-3">
                                Ensino, evolução e impacto
                            </p>

                            <h3 className="text-2xl font-bold text-slate-800 leading-tight mb-3">
                                {getSaudacao()},<br />
                                {tenant.usuario?.nome}
                            </h3>

                            <p className="text-sm text-slate-500">
                                Organize seu dia a dia.
                            </p>
                        </>
                    ) : (
                        <div className="flex justify-center text-indigo-600">
                            <GraduationCap size={26} />
                        </div>
                    )}

                </div>

                {/* MENU */}
                <nav className="flex-1 p-4 md:p-6 flex flex-col overflow-y-auto">

                    {menu.map((item) => {
                        if (item.roles && !item.roles.includes(roleUsuario)) {
                            return null;
                        }
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                rounded-2xl transition-all font-medium
                                hover:bg-indigo-50 hover:text-indigo-700
                                ${menuAberto
                                        ? "px-5 py-4"
                                        : "flex justify-center items-center py-4"}
                            `}
                            >
                                {menuAberto ? item.label : "•"}
                            </Link>
                        );
                    })}

                    {/* PERFIL */}
                    <Link
                        to="/meu-perfil"
                        className={`
                        rounded-2xl transition-all hover:bg-violet-50 hover:text-violet-700
                        ${menuAberto
                                ? "px-5 py-4 flex items-center gap-3"
                                : "flex justify-center py-4"}
                    `}
                    >
                        <UserPen size={18} />
                        {menuAberto && "Perfil"}
                    </Link>

                    {/* CONFIG */}
                    {roleUsuario === "admin" && (
                        <Link
                            to="/configuracoes"
                            className={`
                            rounded-2xl transition-all hover:bg-violet-50 hover:text-violet-700
                            ${menuAberto
                                    ? "px-5 py-4 flex items-center gap-3"
                                    : "flex justify-center py-4"}
                        `}
                        >
                            <Settings size={18} />
                            {menuAberto && "Configurações"}
                        </Link>
                    )}

                </nav>

            </aside>

            {/* BOTÃO MOBILE */}
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className={`
                md:hidden fixed top-16 z-[60] bg-white text-indigo-600 p-3 rounded-full shadow-lg border border-indigo-100 transition-all duration-300
                ${menuAberto ? "left-40" : "left-5"}
                `}
            >
                {menuAberto ? (
                    <PanelLeftClose size={22} />
                ) : (
                    <PanelLeftOpen size={22} />
                )}
            </button>

            {/* BOTÃO DESKTOP */}
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="hidden md:flex absolute top-1/2 left-[calc(theme(space.24))] -translate-y-1/2 z-40 bg-indigo-600 text-white p-2 rounded-r-xl shadow-lg"
            >
                {menuAberto ? (
                    <PanelLeftClose size={18} />
                ) : (
                    <PanelLeftOpen size={18} />
                )}
            </button>

            {/* CONTEÚDO PRINCIPAL */}
            <div
                className={`
    flex flex-col flex-1 min-w-0 transition-all duration-300
    ${menuAberto ? "ml-52 md:ml-0" : "ml-0"}
  `}
            >
                {/* HEADER DESKTOP */}
                <div className="relative z-40 flex items-center justify-between px-4 md:px-10 lg:px-16 py-4 md:py-6 border-b border-indigo-100 bg-white/95 backdrop-blur-xl">

                    <div className="flex gap-3 md:gap-4 items-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg">
                            <GraduationCap size={22} className="md:w-[30px] md:h-[30px]" />
                        </div>

                        <div>
                            <h2 className="text-lg md:text-2xl font-bold text-indigo-800">
                                {tenant.nome}
                            </h2>

                            <p className="hidden sm:block text-sm text-slate-500 mt-1 leading-relaxed">
                                Plataforma premium para professores, mentores,
                                educadores e desenvolvimento acadêmico.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                        <NotificationBell dropdownPosition="top" />
                        <div className="w-px h-6 bg-indigo-200"></div>
                        <LogoutButton />
                    </div>

                </div>

                {/* MAIN */}
                <main className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-16 py-10 md:py-8 pb-28">

                    {/* CONTEÚDO */}
                    <section>
                        {children}
                    </section>

                </main>

            </div>

        </div>
    );
}

export default LayoutEducacao;