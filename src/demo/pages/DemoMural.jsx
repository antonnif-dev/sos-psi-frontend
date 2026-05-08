import MuralGlobal from "../../components/MuralGlobal";

export default function DemoMural() {

    const mensagensMock = [

        {
            id: 1,
            autor: "Dra. Fernanda Lima",
            tenantNome: "Clínica Bem Viver",
            mensagem:
                "Alguém utiliza confirmação automática de sessões por WhatsApp?",
            createdAt: new Date()
        },

        {
            id: 2,
            autor: "Dr. Carlos Henrique",
            tenantNome: "Instituto Equilíbrio",
            mensagem:
                "Reduzimos faltas em quase 40% usando lembretes automáticos.",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 12
            )
        },

        {
            id: 3,
            autor: "Patrícia Alves",
            tenantNome: "Espaço Mente Leve",
            mensagem:
                "O mapa de evolução está ajudando bastante nas devolutivas clínicas.",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 35
            )
        },

        {
            id: 4,
            autor: "Ana Clara",
            tenantNome: "Centro Vida Psi",
            mensagem:
                "Vocês registram escalas emocionais em todas as sessões?",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 55
            )
        },

        {
            id: 5,
            autor: "João Pedro",
            tenantNome: "Clínica Horizonte",
            mensagem:
                "Começamos a utilizar prontuário digital compartilhado e a equipe adorou.",
            createdAt: new Date(
                Date.now() - 1000 * 60 * 90
            )
        }

    ];

    return (

        <div className="min-h-screen p-6 bg-gray-100">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-2xl font-bold mb-6">
                    Mural
                </h1>

                <MuralGlobal
                    tenantNome="SOS Organização"
                    expandidoPadrao={true}
                    mensagensMock={mensagensMock}
                />

            </div>

        </div>

    );

}