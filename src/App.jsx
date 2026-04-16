import { BrowserRouter, Routes, Route } from "react-router-dom";
import SegmentRoute from "./routes/SegmentRoute";
import ProfissaoRoute from "./routes/ProfissaoRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Agenda from "./pages/Agenda";
import Financeiro from "./pages/Financeiro";
import Documentos from "./pages/Documentos";
import Prontuario from "./pages/Prontuario";
import MapaEvolucao from "./pages/MapaEvolucao";
import Prescrição from "./pages/Prescricao";
import Configuracoes from "./pages/Configuracoes";
import PacientePerfil from "./pages/PacientePerfil";
import Notificacoes from "./pages/Notificacoes";
import SessoesRealizadas from "./pages/SessoesRealizadas";
import MeuPerfil from "./pages/MeuPerfil";

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
                <Route path="/sessoes"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <SessoesRealizadas />
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
                {/* 
                <Route path="/prontuario"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <Prontuario />
                            </DashboardLayout>
                        </PrivateRoute>} />
*/}

                {/* Prontuário exibido apenas para psicólogos e nutricionista*/}
                <Route
                    path="/prontuario"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["saude"]}>
                                <ProfissaoRoute allowedProfissoes={["psicologo", "nutricionista"]}>
                                    <DashboardLayout>
                                        <Prontuario />
                                    </DashboardLayout>
                                </ProfissaoRoute>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />
                <Route path="/mapa-evolucao"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <MapaEvolucao />
                            </DashboardLayout>
                        </PrivateRoute>} />

                <Route path="/prescricoes"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <Prescrição />
                            </DashboardLayout>
                        </PrivateRoute>} />

                {/* Exemplo de prescrição so para juridico
                <Route
                    path="/prescricoes"
                    element={
                        <SegmentRoute allowedSegments={["profissionais"]}>
    <ProfissaoRoute allowedProfissoes={["advogado"]}>
        <Prontuario />
    </ProfissaoRoute>
</SegmentRoute>
                        </PrivateRoute>
                    }
                />
                */}
                <Route path="/configuracoes"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <Configuracoes />
                            </DashboardLayout>
                        </PrivateRoute>} />
                <Route path="/meu-perfil"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <MeuPerfil />
                            </DashboardLayout>
                        </PrivateRoute>} />
                <Route path="/notificacoes"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <Notificacoes />
                            </DashboardLayout>
                        </PrivateRoute>} />
                <Route path="/pacientes/:id"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <PacientePerfil />
                            </DashboardLayout>
                        </PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;