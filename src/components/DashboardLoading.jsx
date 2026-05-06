function DashboardLoading() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">

            {/* fundo de energia */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-20 animate-pulse bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.08),_transparent_60%)]"></div>
            </div>

            {/* núcleo */}
            <div className="relative flex flex-col items-center gap-6">

                {/* anel externo girando */}
                <div className="relative w-24 h-24 flex items-center justify-center">

                    <div className="absolute inset-0 rounded-full border border-gray-300 animate-spin-slow"></div>

                    <div className="absolute inset-2 rounded-full border border-gray-400 opacity-40 animate-spin-reverse"></div>

                    {/* núcleo SOS */}
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-xl animate-pulse">
                        <span className="text-white text-xs tracking-widest font-bold">
                            SOS
                        </span>
                    </div>
                </div>

                {/* texto dinâmico */}
                <div className="text-center">
                    <p className="text-sm text-gray-600 tracking-wide animate-pulse">
                        Sincronizando sistema
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                        Inicializando ambiente seguro
                    </p>
                </div>

                {/* barra de energia */}
                <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-black animate-[loading_1.4s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </div>
    );
}

export default DashboardLoading;