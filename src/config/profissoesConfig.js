//páginas exclusivas
export const profissoesConfig = {
    //saude
    psicologo: {
        menuExtra: [
            { label: "Prontuário", path: "/prontuario" },
            { label: "Mapa de Evolução", path: "/mapa-evolucao" }
        ],
        paginas: {
            prontuario: true,
            mapaEvolucao: true,
            prescricoes: false
        }
    },
    //profissional
    advogado: {
        menuExtra: [
            { label: "Prescrições", path: "/prescricoes" }
        ],
        paginas: {
            prontuario: false,
            mapaEvolucao: false,
            prescricoes: true
        }
    }
};