function DemoDashboard() {

    return (

        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    Dashboard Demo
                </h1>

                <p className="text-slate-500">
                    Explore o sistema livremente.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">

                <div className="bg-white rounded-2xl p-6 shadow">
                    <h2 className="text-lg font-semibold">
                        Pacientes
                    </h2>

                    <p className="text-3xl font-bold mt-3">
                        24
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow">
                    <h2 className="text-lg font-semibold">
                        Sessões Hoje
                    </h2>

                    <p className="text-3xl font-bold mt-3">
                        8
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow">
                    <h2 className="text-lg font-semibold">
                        Faturamento
                    </h2>

                    <p className="text-3xl font-bold mt-3">
                        R$ 4.250
                    </p>
                </div>

            </div>

        </div>

    );

}

export default DemoDashboard;