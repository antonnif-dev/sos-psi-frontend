import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Settings, UserPen } from "lucide-react";
import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";

function LayoutEducacao({ children }) {
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
        <div className="flex h-screen bg-gradient-to-br from-[#f8fafc] via-[#eef4ff] to-[#f9f7ff] text-slate-800 overflow-hidden relative">

            {/* MENU + PAINEL LATERAL */}
            <aside
                className={`
                fixed md:relative top-0 left-0 h-full z-50
                bg-white/95 backdrop-blur-xl border-r border-blue-100 shadow-2xl
                transition-all duration-300 flex flex-col
                ${menuAberto ? "w-80 translate-x-0" : "w-0 md:w-24 -translate-x-full md:translate-x-0 overflow-hidden"}
            `}
            >

                {/* HEADER */}
                <div className="p-6 md:p-8 border-b border-blue-100">

                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 flex items-center justify-center text-white text-3xl shadow-lg mb-5">
                        📚
                    </div>

                    {menuAberto && (
                        <>
                            <h2 className="text-2xl font-bold text-blue-700">
                                {tenant.nome}
                            </h2>

                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                Plataforma educacional para gestão, ensino e desenvolvimento acadêmico.
                            </p>
                        </>
                    )}

                </div>

                {/* SAUDAÇÃO */}
                <div className="p-6 md:p-8 border-b border-blue-100">

                    {menuAberto ? (
                        <>
                            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-indigo-500 mb-3">
                                Ambiente educacional
                            </p>

                            <h3 className="text-2xl font-bold text-slate-800 leading-tight mb-3">
                                {getSaudacao()},<br />
                                {tenant.usuario?.nome}
                            </h3>

                            <p className="text-sm text-slate-500">
                                Inspire, organize e acompanhe sua jornada educacional.
                            </p>
                        </>
                    ) : (
                        <div className="flex justify-center text-2xl">
                            👩‍🏫
                        </div>
                    )}

                </div>

                {/* MENU */}
                <nav className="flex-1 p-4 md:p-6 flex flex-col gap-3 overflow-y-auto">

                    {config.menu.map((item) => {
                        if (item.roles && !item.roles.includes(roleUsuario)) {
                            return null;
                        }

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                rounded-2xl transition-all font-medium
                                hover:bg-blue-50 hover:text-blue-700
                                ${menuAberto
                                        ? "px-5 py-4"
                                        : "flex justify-center items-center py-4"
                                    }
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
                        rounded-2xl transition-all hover:bg-indigo-50 hover:text-indigo-700
                        ${menuAberto
                                ? "px-5 py-4 flex items-center gap-3"
                                : "flex justify-center py-4"
                            }
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
                            rounded-2xl transition-all hover:bg-indigo-50 hover:text-indigo-700
                            ${menuAberto
                                    ? "px-5 py-4 flex items-center gap-3"
                                    : "flex justify-center py-4"
                                }
                        `}
                        >
                            <Settings size={18} />
                            {menuAberto && "Configurações"}
                        </Link>
                    )}

                </nav>

                {/* RODAPÉ */}
                <div className="p-6 border-t border-blue-100 flex items-center justify-between">
                    <NotificationBell />
                    <LogoutButton />
                </div>

            </aside>

            {/* BOTÃO MOBILE */}
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="md:hidden fixed top-5 left-5 z-[60] bg-white text-blue-600 p-3 rounded-full shadow-lg border border-blue-100"
            >
                {menuAberto ? (
                    <PanelLeftClose size={22} />
                ) : (
                    <PanelLeftOpen size={22} />
                )}
            </button>

            {/* BOTÃO DESKTOP MINIMIZAR */}
            <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="hidden md:flex absolute top-1/2 left-[calc(theme(space.24))] -translate-y-1/2 z-40 bg-blue-600 text-white p-2 rounded-r-xl shadow-lg"
            >
                {menuAberto ? (
                    <PanelLeftClose size={18} />
                ) : (
                    <PanelLeftOpen size={18} />
                )}
            </button>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="flex flex-col flex-1 min-w-0">

                <main className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-16 py-8 pb-28">

                    {/* HERO */}
                    <section className="mb-10">
                        <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-blue-100 shadow-xl">

                            {/* DECORAÇÃO */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
                            <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-30"></div>

                            <div className="relative z-10 p-8 md:p-14">

                                <p className="uppercase tracking-[0.35em] text-sm text-indigo-500 font-semibold mb-4">
                                    Educação • Ensino • Desenvolvimento
                                </p>

                                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                    Gestão educacional moderna para professores e instituições
                                </h1>

                                <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                                    Organize alunos, conteúdos, avaliações, agendas e projetos
                                    em uma plataforma visualmente acolhedora e projetada
                                    para excelência educacional.
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
                <MuralGlobal tenantNome={tenant.nome} />

            </div>

        </div>
    );

}

export default LayoutEducacao;