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
import MapaEvolucao from "./pages/MapaEvolucao";
import Prescrição from "./pages/Prescricao";
import Configuracoes from "./pages/Configuracoes";
import PacientePerfil from "./pages/PacientePerfil";
import Notificacoes from "./pages/Notificacoes";
import SessoesRealizadas from "./pages/SessoesRealizadas";
import MeuPerfil from "./pages/MeuPerfil";
import MuralGlobal from "./pages/MuralGlobal";
import RoleRoute from "./routes/RoleRoute";

//demo
import AppDemo from "./demo/AppDemo";

//saude
import Anamnese from "./pages/saude/Anamnese";
import Prontuario from "./pages/saude/Prontuario";

//estetica
import AvaliacaoFisica from "./pages/estetica/AvaliacaoFisica";
import Treinos from "./pages/estetica/Treinos";
import Progresso from "./pages/estetica/Progresso";

//estetica
import Desempenho from "./pages/educacao/Desempenho";
import PlanosAula from "./pages/educacao/PlanosAula";
import Tarefas from "./pages/educacao/Tarefas";

//profissionais
import Prazos from "./pages/profissionais/Prazos";
import Processos from "./pages/profissionais/Processos";
import Relatorios from "./pages/profissionais/Relatorios";

//beleza
import AnamneseEstetica from "./pages/beleza/AnamneseEstetica";
import AntesDepois from "./pages/beleza/AntesDepois";
import Procedimentos from "./pages/beleza/Procedimentos";

//criativos
import Briefing from "./pages/criativo/Briefing";
import Portfolio from "./pages/criativo/Portfolio";
import Projetos from "./pages/criativo/Projetos";

function ProtectedPage({ segments, profissoes, roles, children }) {
    return (
        <PrivateRoute>
            <SegmentRoute allowedSegments={segments}>
                <ProfissaoRoute allowedProfissoes={profissoes}>
                    <RoleRoute allowedRoles={roles}>
                        <DashboardLayout>
                            {children}
                        </DashboardLayout>
                    </RoleRoute>
                </ProfissaoRoute>
            </SegmentRoute>
        </PrivateRoute>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ---------------------------- Páginas Gerais ---------------------------- */}
                <Route path="/" element={<Login />} />

                {/* --------------------------------- Demo --------------------------------- */}
                <Route
                    path="/demo/*"
                    element={<AppDemo />}
                />

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
                <Route path="/mural"
                    element={
                        <PrivateRoute>
                            <DashboardLayout>
                                <MuralGlobal />
                            </DashboardLayout>
                        </PrivateRoute>} />
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

                {/* ---------------------------- Segmento saude ---------------------------- */}
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
                <Route
                    path="/anamnese"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["saude"]}>
                                <ProfissaoRoute allowedProfissoes={["psicologo", "nutricionista"]}>
                                    <DashboardLayout>
                                        <Anamnese />
                                    </DashboardLayout>
                                </ProfissaoRoute>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/mapa-evolucao"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["saude"]}>
                                <DashboardLayout>
                                    <MapaEvolucao />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/prescricoes"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["saude"]}>
                                <ProfissaoRoute allowedProfissoes={["medico"]}>
                                    <DashboardLayout>
                                        <Prescrição />
                                    </DashboardLayout>
                                </ProfissaoRoute>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                {/* ---------------------------- Segmento profissionais ---------------------------- */}
                <Route
                    path="/prazos"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["profissionais"]}>
                                <DashboardLayout>
                                    <Prazos />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/processos"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["profissionais"]}>
                                <DashboardLayout>
                                    <Processos />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/relatorios"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["profissionais"]}>
                                <DashboardLayout>
                                    <Relatorios />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                {/* ---------------------------- Segmento estetica ---------------------------- */}
                <Route
                    path="/avaliacao-fisica"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["estetica"]}>
                                <DashboardLayout>
                                    <AvaliacaoFisica />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/treinos"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["estetica"]}>
                                <DashboardLayout>
                                    <Treinos />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/progresso"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["estetica"]}>
                                <DashboardLayout>
                                    <Progresso />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                {/* ---------------------------- Segmento educacao ---------------------------- */}

                <Route
                    path="/desempenho"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["educacao"]}>
                                <DashboardLayout>
                                    <Desempenho />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/planos-aula"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["educacao"]}>
                                <DashboardLayout>
                                    <PlanosAula />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/tarefas"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["educacao"]}>
                                <DashboardLayout>
                                    <Tarefas />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                {/* ---------------------------- Segmento beleza ---------------------------- */}
                <Route
                    path="/anamnese-estetica"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["beleza"]}>
                                <DashboardLayout>
                                    <AnamneseEstetica />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/antes-depois"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["beleza"]}>
                                <DashboardLayout>
                                    <AntesDepois />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/procedimentos"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["beleza"]}>
                                <DashboardLayout>
                                    <Procedimentos />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                {/* ---------------------------- Segmento criativos ---------------------------- */}
                <Route
                    path="/briefing"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["criativo"]}>
                                <DashboardLayout>
                                    <Briefing />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/portfolio"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["criativo"]}>
                                <DashboardLayout>
                                    <Portfolio />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/projetos"
                    element={
                        <PrivateRoute>
                            <SegmentRoute allowedSegments={["criativo"]}>
                                <DashboardLayout>
                                    <Projetos />
                                </DashboardLayout>
                            </SegmentRoute>
                        </PrivateRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;