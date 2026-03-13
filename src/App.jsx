import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Agenda from "./pages/Agenda";
import Financeiro from "./pages/Financeiro";
import Documentos from "./pages/Documentos";
import Prontuario from "./pages/Prontuario";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/pacientes"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <Pacientes />
                            </DashboardLayout>
                        </PrivateRoute>
                    }
                />
                <Route path="/agenda"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Agenda />
                        </DashboardLayout>
                    </PrivateRoute>} />

                <Route path="/financeiro"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Financeiro />
                        </DashboardLayout>
                    </PrivateRoute>} />

                <Route path="/documentos"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Documentos />
                        </DashboardLayout>
                    </PrivateRoute>} />

                <Route path="/prontuario"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Prontuario />
                        </DashboardLayout>
                    </PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;