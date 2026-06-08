import {
    LayoutDashboard,
    CalendarDays,
    Users,
    ClipboardList,
    FileText,
    CircleDollarSign,
    Activity,
    Stethoscope,
    InfinityIcon,
    FileMinus,
    Presentation,
    UserPen,
    RefreshCcw,
    AlarmClock,
    NotebookPen,
    ShieldPlus,
} from "lucide-react";

export const segmentConfig = {
    // psicólogo, terapeuta, nutricionista, fisioterapeuta, fonoaudiólogos
    saude: {
        theme: {
            sidebar: "bg-purple-900",
            topbar: "bg-white",
            background: "bg-purple-50",
            primaryText: "text-yellow-200"
        },

        labels: {
            pacientes: "Pacientes",
            paciente: "Paciente",
            agenda: "Agenda",
            sessoes: "Sessões",
            sessao: "Sessão",
            prontuario: "Prontuário",
            documentos: "Documentos",
            mural: "Mural",
            financeiro: "Financeiro",
            prescricoes: "Prescrições",
            notificacoes: "Notificações",
            observacoes: "Anamneses",
            observacao: "Anamnese",
            anamnese: "Anamnese",
            anamneses: "Anamneses",
        },

        menu: [
            { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
            { label: "Pacientes", path: "/pacientes", icon: Users },
            { label: "Agenda", path: "/agenda", icon: CalendarDays },
            { label: "Sessões", path: "/sessoes", icon: ClipboardList },
            {
                label: "Prontuário",
                path: "/prontuario",
                icon: FileText,
                roles: ["admin", "psicologo"]
            },
            {
                label: "Anamnese",
                path: "/anamnese",
                icon: Activity,
                roles: ["admin", "psicologo"],
                profissoes: ["psicologo", "advogado"]
            },
            { label: "Documentos", path: "/documentos", icon: FileMinus },
            { label: "Mapa da Evolucao", path: "/mapa-evolucao", icon: RefreshCcw },
            {
                label: "Prescrições",
                path: "/prescricoes",
                icon: Stethoscope,
                roles: ["admin", "medico"],
                profissoes: ["medico"]
            },
            { label: "Financeiro", path: "/financeiro", icon: CircleDollarSign },
            { label: "Mural", path: "/mural", icon: Presentation },
            { label: "Perfil", path: "/meu-perfil", icon: UserPen },
        ]
    },

    // advogado, contador, consultor
    profissionais: {
        theme: {
            sidebar: "bg-gray-900",
            topbar: "bg-gray-800",
            background: "bg-gray-100",
            primaryText: "text-black"
        },

        labels: {
            pacientes: "Clientes",
            paciente: "Cliente",
            agenda: "Agenda",
            sessoes: "Atendimentos",
            sessao: "Atendimento",
            prontuario: "Caso",
            documentos: "Documentos",
            financeiro: "Financeiro",
            prescricoes: "Modelos Jurídicos",
            notificacoes: "Notificações",
            observacoes: "Observações",
            observacao: "Observação",
            anamnese: "Observação",
            anamneses: "Observações",
        },

        menu: [
            { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
            { label: "Agenda", path: "/agenda", icon: CalendarDays },
            { label: "Clientes", path: "/pacientes", icon: Users },
            { label: "Atendimentos", path: "/sessoes", icon: ClipboardList },
            { label: "Financeiro", path: "/financeiro", icon: CircleDollarSign },
            { label: "Documentos", path: "/documentos", icon: FileMinus },
            { label: "Processos", path: "/processos", icon: ShieldPlus },
            { label: "Prazos", path: "/prazos", icon: AlarmClock },
            { label: "Relatórios", path: "/anamnese", icon: NotebookPen },
        ]
    },

    // personal trainee, instrutor de pilates, intrutor de ioga, couches
    estetica: {
        theme: {
            sidebar: "bg-emerald-700",
            topbar: "bg-white",
            background: "bg-emerald-50",
            primaryText: "text-emerald-900",
            buttonPrimary: "bg-emerald-600 text-white",
        },
        //completar
        labels: {
            pacientes: "Clientes",
            paciente: "Cliente",
            agenda: "Agenda",
            sessoes: "Atendimentos",
            sessao: "Atendimento",
            prontuario: "Caso",
            documentos: "Documentos",
            financeiro: "Financeiro",
            prescricoes: "Modelos Jurídicos",
            notificacoes: "Notificações",
            observacoes: "Observações",
            observacao: "Observação",
        },

        menu: [
            { label: "Dashboard", path: "/dashboard" },
            { label: "Agenda", path: "/agenda" },
            { label: "Clientes", path: "/pacientes" },
            { label: "Atendimentos", path: "/sessoes" },
            { label: "Financeiro", path: "/financeiro" },
            { label: "Documentos", path: "/documentos" },
            { label: "Avaliação Física", path: "/avaliacao-fisica" },
            { label: "Treinos", path: "/treinos" },
            { label: "Progresso", path: "/progresso" },
        ]
    },

    //professor de música, professor de aula particular, professor de concurso
    educacao: {
        theme: {
            sidebar: "bg-indigo-800",
            topbar: "bg-white",
            background: "bg-indigo-50",
            primaryText: "text-indigo-900",
            buttonPrimary: "bg-indigo-600 text-white",
        },
        //completar
        labels: {
            pacientes: "Clientes",
            paciente: "Cliente",
            agenda: "Agenda",
            sessoes: "Atendimentos",
            sessao: "Atendimento",
            prontuario: "Caso",
            documentos: "Documentos",
            financeiro: "Financeiro",
            prescricoes: "Modelos Jurídicos",
            notificacoes: "Notificações"
        },

        menu: [
            { label: "Dashboard", path: "/dashboard" },
            { label: "Agenda", path: "/agenda" },
            { label: "Clientes", path: "/pacientes" },
            { label: "Atendimentos", path: "/sessoes" },
            { label: "Financeiro", path: "/financeiro" },
            { label: "Documentos", path: "/documentos" },
            { label: "Desempenho", path: "/desempenho" },
            { label: "Planos de aula", path: "/planos-aula" },
            { label: "Tarefas", path: "/tarefas" },
        ]
    },

    // esteticista, design de sobrancelha, lash designer, massoterapeuta
    beleza: {
        theme: {
            sidebar: "bg-pink-700",
            topbar: "bg-white",
            background: "bg-pink-50",
            primaryText: "text-pink-800",
            buttonPrimary: "bg-pink-600 text-white",
        },
        //completar
        labels: {
            pacientes: "Clientes",
            paciente: "Cliente",
            agenda: "Agenda",
            sessoes: "Atendimentos",
            sessao: "Atendimento",
            prontuario: "Caso",
            documentos: "Documentos",
            financeiro: "Financeiro",
            prescricoes: "Modelos Jurídicos",
            notificacoes: "Notificações",
            observacoes: "Observações",
            observacao: "Observação",
        },

        menu: [
            { label: "Dashboard", path: "/dashboard" },
            { label: "Agenda", path: "/agenda" },
            { label: "Clientes", path: "/pacientes" },
            { label: "Atendimentos", path: "/sessoes" },
            { label: "Financeiro", path: "/financeiro" },
            { label: "Documentos", path: "/documentos" },
            { label: "Anamnese Estética", path: "/anamnese-estetica" },
            { label: "Antes e Depois", path: "/antes-depois" },
            { label: "Procedimentos", path: "/procedimentos" },

            //modelo com role para admin e advogado
            {
                label: "Prescrições",
                path: "/prescricoes",
                roles: ["admin", "advogado"]
            }
        ]
    },

    // fotógrafos, videomaker
    criativo: {
        theme: {
            sidebar: "bg-orange-600",
            topbar: "bg-white",
            background: "bg-orange-50",
            primaryText: "text-orange-900",
            buttonPrimary: "bg-orange-500 text-white",
        },
        //completar
        labels: {
            pacientes: "Clientes",
            paciente: "Cliente",
            agenda: "Agenda",
            sessoes: "Atendimentos",
            sessao: "Atendimento",
            prontuario: "Caso",
            documentos: "Documentos",
            financeiro: "Financeiro",
            prescricoes: "Modelos Jurídicos",
            notificacoes: "Notificações",
            observacoes: "Observações",
            observacao: "Observação",
        },

        menu: [
            { label: "Dashboard", path: "/dashboard" },
            { label: "Agenda", path: "/agenda" },
            { label: "Clientes", path: "/pacientes" },
            { label: "Atendimentos", path: "/sessoes" },
            { label: "Financeiro", path: "/financeiro" },
            { label: "Documentos", path: "/documentos" },
            { label: "Briefing", path: "/briefing" },
            { label: "Portfólio", path: "/portfolio" },
            { label: "Projetos", path: "/projetos" },
        ]
    },

    default: {
        labels: {
            pacientes: "Pacientes",
            paciente: "Paciente"
        }
    },
};