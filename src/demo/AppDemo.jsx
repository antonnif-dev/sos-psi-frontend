import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import DemoDashboard from "./pages/DemoDashboard";
import DemoAgenda from "./pages/DemoAgenda";
import DemoFinanceiro from "./pages/DemoFinanceiro";
import DemoMapaEvolucao from "./pages/DemoMapaEvolucao";
import DemoMural from "./pages/DemoMural";
import DemoPacientes from "./pages/DemoPacientes.jsx";
import DemoProntuario from "./pages/DemoProntuario";

import DemoDashboardLayout
    from "./DemoDashboardLayout";

function AppDemo() {

    return (

        <Routes>

            {/* REDIRECIONA */}
            <Route
                path="/"
                element={<Navigate to="dashboard" />}
            />

            <Route
                path="dashboard"
                element={
                    <DemoDashboardLayout>
                        <DemoDashboard />
                    </DemoDashboardLayout>
                }
            />

            <Route
                path="pacientes"
                element={
                    <DemoDashboardLayout>
                        <DemoPacientes />
                    </DemoDashboardLayout>
                }
            />

            <Route
                path="agenda"
                element={
                    <DemoDashboardLayout>
                        <DemoAgenda />
                    </DemoDashboardLayout>
                }
            />

            <Route
                path="financeiro"
                element={
                    <DemoDashboardLayout>
                        <DemoFinanceiro />
                    </DemoDashboardLayout>
                }
            />

            <Route
                path="mapa-evolucao"
                element={
                    <DemoDashboardLayout>
                        <DemoMapaEvolucao />
                    </DemoDashboardLayout>
                }
            />

            <Route
                path="mural"
                element={
                    <DemoDashboardLayout>
                        <DemoMural />
                    </DemoDashboardLayout>
                }
            />

            <Route
                path="prontuario"
                element={
                    <DemoDashboardLayout>
                        <DemoProntuario />
                    </DemoDashboardLayout>
                }
            />

        </Routes>

    );

}

export default AppDemo;