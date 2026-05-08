export function listarMensagensMock() {

    return [

        {
            id: "1",
            autor: "Dra. Fernanda Lima",
            tenantNome: "Clínica Bem Viver",
            mensagem:
                "Alguém utiliza confirmação automática de sessões por WhatsApp?",
            createdAt: new Date()
        },

        {
            id: "2",
            autor: "Dr. Carlos Henrique",
            tenantNome: "Instituto Equilíbrio",
            mensagem:
                "Reduzimos faltas em quase 40% usando lembretes automáticos.",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 12
            )
        },

        {
            id: "3",
            autor: "Patrícia Alves",
            tenantNome: "Espaço Mente Leve",
            mensagem:
                "O mapa de evolução está ajudando bastante nas devolutivas clínicas.",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 35
            )
        },

        {
            id: "4",
            autor: "Ana Clara",
            tenantNome: "Centro Vida Psi",
            mensagem:
                "Vocês registram escalas emocionais em todas as sessões?",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 55
            )
        },

        {
            id: "5",
            autor: "João Pedro",
            tenantNome: "Clínica Horizonte",
            mensagem:
                "Começamos a utilizar prontuário digital compartilhado e a equipe adorou.",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 90
            )
        },

        {
            id: "6",
            autor: "Dra. Amanda Ribeiro",
            tenantNome: "Espaço Serenar",
            mensagem:
                "Estamos utilizando formulários pré-sessão e os pacientes aderiram muito bem.",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 120
            )
        },

        {
            id: "7",
            autor: "Ricardo Mendes",
            tenantNome: "Instituto Nova Mente",
            mensagem:
                "A agenda compartilhada entre profissionais melhorou bastante nossa organização.",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 180
            )
        }

    ];

}