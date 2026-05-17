import { useEffect, useState } from "react";
import api from "../services/api";
import { useTenant } from "../hooks/useTenant";

function Dashboard() {

    const [data, setData] = useState(null);
    const tenant = useTenant();

    useEffect(() => {
        async function load() {
            const res = await api.get("/dashboard");
            setData(res.data);
        }
        load();
    }, []);
    if (!data) {
        return (
            <p className="text-gray-500">
                Carregando...
            </p>
        );
    }

    return (

        <div className="space-y-8">

            <div>
                {tenant?.segmento === "saude" && (
                    <section className="mb-8">
                        <div className="rounded-[2.5rem] bg-white border border-cyan-100 shadow-xl p-8 md:p-12">

                            <div>
                                <p className="uppercase tracking-[0.25em] text-sm text-cyan-600 font-semibold mb-3">
                                    Humanização, equilíbrio e saúde integral
                                </p>

                                <h2 className="text-4xl md:text-5xl font-bold text-cyan-900 mb-4 leading-tight max-w-4xl">
                                    Plataforma moderna para psicologia,
                                    medicina e terapias integradas
                                </h2>

                                <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                                    Gerencie pacientes, prontuários, sessões,
                                    atendimentos, evolução clínica e agenda em
                                    um ambiente seguro, acolhedor e sofisticado.
                                </p>
                            </div>

                        </div>
                    </section>
                )}

                {tenant?.segmento === "profissionais" && (
                    <section className="">
                        <div className="overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl">
                            
                            <div className="z-10 p-4 md:p-12">
                                <p className="uppercase tracking-[0.25em] text-sm text-amber-600 font-semibold mb-3">
                                    Estratégia, autoridade e gestão profissional
                                </p>

                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight max-w-4xl">
                                    Plataforma premium para operações jurídicas
                                </h2>

                                <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                                    Gerencie clientes, processos, relatórios,
                                    documentos, finanças e atendimento com máxima
                                    organização, segurança e sofisticação.
                                </p>
                            </div>

                        </div>
                    </section>
                )}

                {tenant?.segmento === "estetica" && (
                    <section className="mb-10">
                        <div className="overflow-hidden rounded-[2.5rem] bg-white border border-emerald-100 shadow-xl">

                            <div className="z-10 p-8 md:p-12">
                                <p className="uppercase tracking-[0.25em] text-sm text-emerald-600 font-semibold mb-3">
                                    Movimento, saúde e evolução
                                </p>

                                <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4 leading-tight">
                                    Gestão inteligente para saúde, performance e transformação corporal
                                </h2>

                                <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                                    Organize alunos, sessões, treinos, evolução física e agenda profissional
                                    em uma plataforma moderna, funcional e inspiradora.
                                </p>
                            </div>

                        </div>
                    </section>
                )}

                {tenant?.segmento === "educacao" && (
                    <section className="mb-10">
                        <div className="overflow-hidden rounded-[2.5rem] bg-white border border-blue-100 shadow-xl">

                            <div className="z-10 p-8 md:p-14">

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
                )}

                {tenant?.segmento === "beleza" && (
                    <section className="mb-10">
                        <div className="overflow-hidden rounded-[2.5rem] bg-white border border-pink-100 shadow-xl">

                            <div className="z-10 p-8 md:p-14">

                                <p className="uppercase tracking-[0.35em] text-sm text-rose-500 font-semibold mb-4">
                                    Sofisticação para profissionais da beleza
                                </p>

                                <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                                    Gestão refinada para salões, manicure e estética facial
                                </h2>

                                <p className="text-lg text-rose-700/80 max-w-3xl leading-relaxed">
                                    Organize clientes, agendamentos, serviços, fidelização
                                    e crescimento do seu negócio com uma experiência visual
                                    luxuosa, feminina e moderna.
                                </p>

                            </div>

                        </div>
                    </section>
                )}

                {tenant?.segmento === "criativo" && (
                    <section className="mb-10">
                        <div className="overflow-hidden rounded-[2.5rem] bg-white/5 border border-cyan-400/10 shadow-2xl backdrop-blur-md">

                            <div className="z-10 p-8 md:p-14">

                                <p className="uppercase tracking-[0.35em] text-sm text-cyan-300 font-semibold mb-4">
                                    Produção • Imagem • Criatividade
                                </p>

                                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                                    Gestão criativa para profissionais visuais
                                </h1>

                                <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
                                    Organize projetos, clientes, sessões, produções e entregas
                                    com um painel ousado, moderno e pensado para criadores
                                    de imagem, vídeo e experiências visuais.
                                </p>

                            </div>

                        </div>
                    </section>
                )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Pacientes cadastrados
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {data.totalPacientes}
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Consultas realizadas
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {data.totalConsultas}
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Sessões registradas
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {data.totalProntuarios || 0}
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Documentos enviados
                    </p>

                    <p className="text-3xl font-semibold text-gray-800 mt-2">
                        {data.totalDocumentos || 0}
                    </p>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Atividade recente
                    </h2>

                    <p className="text-sm text-gray-500">
                        As informações mais recentes do sistema aparecerão aqui.
                    </p>

                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Status do sistema
                    </h2>

                    <p className="text-sm text-gray-600">
                        Todos os módulos estão operando normalmente.
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;