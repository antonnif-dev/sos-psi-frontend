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
        },

        menu: [
            { label: "Dashboard", path: "/dashboard" },
            { label: "Agenda", path: "/agenda" },
            { label: "Pacientes", path: "/pacientes" },
            { label: "Sessões", path: "/sessoes" },
            { label: "Financeiro", path: "/financeiro" },
            { label: "Documentos", path: "/documentos" },
            { label: "Mapa da Evolucao", path: "/mapa-evolucao" },
            { label: "Mural", path: "/mural" },
            {
                label: "Prontuário",
                path: "/prontuario",
                roles: ["admin", "psicologo"]
            },
            {
                label: "Prescrições",
                path: "/prescricoes",
                roles: ["admin", "medico"],
                profissoes: ["medico"]
            },
            {
                label: "Anamnese",
                path: "/anamnese",
                roles: ["admin", "psicologo"],
                profissoes: ["psicologo"]
            },
            /*
            {
                label: "Prescrições",
                path: "/prescricoes",
                profissao: ["medico"]
            },*/
        ]
    },

    // advogado, contador, consultor
    profissionais: {
        theme: {
            sidebar: "bg-gray-900",
            topbar: "bg-gray-800 text-white",
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
        },

        menu: [
            { label: "Dashboard", path: "/dashboard" },
            { label: "Agenda", path: "/agenda" },
            { label: "Clientes", path: "/pacientes" },
            { label: "Atendimentos", path: "/sessoes" },
            { label: "Financeiro", path: "/financeiro" },
            { label: "Documentos", path: "/documentos" },
            { label: "Prazos", path: "/prazos" },
            { label: "Processos", path: "/processos" },
            { label: "Relatórios", path: "/relatorios" },
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