import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, Settings, UserPen } from "lucide-react";
import NotificationBell from "../../components/NotificationBell";
import MuralGlobal from "../../components/MuralGlobal";

import { useTenant } from "../../hooks/useTenant";
import { segmentConfig } from "../../config/segmentConfig";

function LayoutEstetica({ children }) {
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
        <div className="flex flex-col h-screen bg-gradient-to-br from-[#fff7fb] via-[#fdeef4] to-[#fdfdfd] text-[#4b5563] relative overflow-hidden">

            {/* MENU SUPERIOR DESKTOP */}
            <header className="hidden md:flex h-24 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm items-center justify-between px-8 lg:px-14">

                {/* MARCA */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-300 via-rose-400 to-fuchsia-400 flex items-center justify-center text-white text-2xl shadow-lg">
                        ✨
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-rose-700">
                            {tenant.nome}
                        </h1>
                        <p className="text-sm text-rose-400">
                            Estética & Bem-estar
                        </p>
                    </div>
                </div>

                {/* MENU */}
                <nav className="flex items-center gap-6">
                    {config.menu.map((item) => {
                        if (item.roles && !item.roles.includes(roleUsuario)) {
                            return null;
                        }

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-sm font-medium text-gray-600 hover:text-rose-600 transition"
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <Link
                        to="/meu-perfil"
                        className="text-gray-600 hover:text-rose-600 transition"
                    >
                        <UserPen size={20} />
                    </Link>

                    {roleUsuario === "admin" && (
                        <Link
                            to="/configuracoes"
                            className="text-gray-600 hover:text-rose-600 transition"
                        >
                            <Settings size={20} />
                        </Link>
                    )}
                </nav>

            </header>

            {/* MENU MOBILE */}
            <div className="md:hidden">
                <button
                    onClick={() => setMenuAberto(!menuAberto)}
                    className="fixed top-5 right-5 z-50 bg-white text-rose-500 p-3 rounded-full shadow-lg border border-rose-100"
                >
                    {menuAberto ? (
                        <PanelLeftClose size={22} />
                    ) : (
                        <PanelLeftOpen size={22} />
                    )}
                </button>

                <aside
                    className={`
                    fixed top-0 right-0 h-full w-72 bg-white text-gray-700 z-40
                    transition-transform duration-300 shadow-2xl border-l border-rose-100
                    ${menuAberto ? "translate-x-0" : "translate-x-full"}
                `}
                >
                    <div className="p-8 mt-10 border-b border-rose-100">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-300 via-rose-400 to-fuchsia-400 flex items-center justify-center text-white text-2xl mb-4 shadow-md">
                            ✨
                        </div>

                        <h2 className="text-xl font-bold text-rose-700">
                            {tenant.nome}
                        </h2>

                        <p className="text-sm text-rose-400 mt-1">
                            Estética corporal
                        </p>
                    </div>

                    <nav className="flex flex-col gap-3 p-6">
                        {config.menu.map((item) => {
                            if (item.roles && !item.roles.includes(roleUsuario)) {
                                return null;
                            }

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="px-5 py-4 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition font-medium"
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        <Link
                            to="/meu-perfil"
                            className="px-5 py-4 rounded-2xl hover:bg-rose-50 flex items-center gap-3"
                        >
                            <UserPen size={18} />
                            Perfil
                        </Link>

                        {roleUsuario === "admin" && (
                            <Link
                                to="/configuracoes"
                                className="px-5 py-4 rounded-2xl hover:bg-rose-50 flex items-center gap-3"
                            >
                                <Settings size={18} />
                                Configurações
                            </Link>
                        )}
                    </nav>
                </aside>
            </div>

            {/* MAIN */}
            <main className="flex-1 overflow-y-auto px-4 md:px-10 lg:px-16 py-8 pb-40">

                {/* HERO */}
                <section className="mb-10">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-rose-100 shadow-xl">

                        {/* DECORAÇÃO */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-40"></div>
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-fuchsia-100 rounded-full blur-3xl opacity-30"></div>

                        <div className="relative z-10 p-8 md:p-12">
                            <p className="uppercase tracking-[0.25em] text-sm text-rose-500 font-semibold mb-3">
                                Cuidado, beleza e transformação
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold text-rose-700 mb-4 leading-tight">
                                Gestão moderna para estética corporal e bem-estar
                            </h2>

                            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                                Organize clientes, procedimentos, agenda e evolução estética
                                em uma experiência sofisticada, acolhedora e visualmente refinada.
                            </p>
                        </div>

                    </div>
                </section>

                {/* CONTEÚDO */}
                <section>
                    {children}
                </section>

            </main>

            {/* RODAPÉ COM SAUDAÇÃO */}
            <footer className="h-24 bg-white/95 backdrop-blur-md border-t border-rose-100 shadow-inner flex items-center justify-between px-6 md:px-10">

                {/* SAUDAÇÃO */}
                <div>
                    <h2 className="font-bold text-rose-700 text-lg">
                        {tenant.nome}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {getSaudacao()}, {tenant.usuario?.nome}
                    </p>
                </div>

                {/* AÇÕES */}
                <div className="flex items-center gap-4">
                    <NotificationBell />
                    <div className="w-px h-6 bg-rose-200"></div>
                    <LogoutButton />
                </div>

            </footer>

            {/* MURAL */}
            <MuralGlobal tenantNome={tenant.nome} />

        </div>
    );

}

export default LayoutEstetica;