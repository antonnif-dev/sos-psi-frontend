import { Link } from "react-router-dom";
import { HeartPulse, UserPen }
    from "lucide-react";

function DemoDashboardLayout({
    children
}) {

    const menu = [
        {
            label: "Dashboard",
            path: "/demo/dashboard"
        },
        {
            label: "Pacientes",
            path: "/demo/pacientes"
        },
        {
            label: "Agenda",
            path: "/demo/agenda"
        },
        {
            label: "Financeiro",
            path: "/demo/financeiro"
        },
        {
            label: "Mural",
            path: "/demo/mural"
        },
        {
            label: "Mapa",
            path: "/demo/mapa-evolucao"
        },
        {
            label: "Prontuário",
            path: "/demo/prontuario"
        }
    ];

    const getSaudacao = () => {

        const hora =
            new Date().getHours();

        if (hora < 12) return "Bom dia";
        if (hora < 18) return "Boa tarde";

        return "Boa noite";
    };

    return (

        <div className="
   flex flex-col
   h-screen
   bg-gradient-to-br
   from-[#f3f8f7]
   via-[#edf7fb]
   to-[#ffffff]
   text-slate-700
  ">

            {/* TOPBAR */}

            <header className="
    h-24
    bg-white/90
    backdrop-blur-md
    border-b
    border-cyan-100
    shadow-sm
    flex
    items-center
    justify-between
    px-6
    md:px-10
   ">

                <div className="
     flex
     items-center
     gap-4
    ">

                    <div className="
      w-14
      h-14
      rounded-full
      bg-gradient-to-br
      from-cyan-500
      via-teal-400
      to-emerald-400
      flex
      items-center
      justify-center
      text-white
      shadow-lg
     ">
                        <HeartPulse size={26} />
                    </div>

                    <div>

                        <h1 className="
       text-lg
       md:text-xl
       font-bold
       text-cyan-900
      ">
                            SOS Organização
                        </h1>

                        <p className="
       text-sm
       text-cyan-600
      ">
                            Demonstração interativa
                        </p>

                    </div>

                </div>

                <div className="
     hidden
     md:block
     text-center
    ">

                    <p className="
      font-semibold
      text-cyan-800
     ">
                        {getSaudacao()},
                        Psicólogo Demo
                    </p>

                    <p className="
      text-sm
      text-slate-500
     ">
                        Explore todas as funções
                    </p>

                </div>

            </header>

            {/* MAIN */}

            <main className="
    flex-1
    overflow-y-auto
    px-4
    md:px-10
    py-8
    pb-36
   ">

                {children}

            </main>

            {/* MENU */}

            <nav className="
    fixed
    bottom-0
    left-0
    right-0
    z-50
    px-2
    pb-2
   ">

                <div className="
     max-w-6xl
     mx-auto
     bg-white/95
     backdrop-blur-xl
     border
     border-cyan-100
     rounded-3xl
     shadow-2xl
     px-4
     py-4
    ">

                    <div className="
      flex
      justify-center
      items-center
      flex-wrap
      gap-3
      lg:gap-4
     ">

                        {menu.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="
         flex
         flex-col
         items-center
         justify-center
         min-w-[75px]
         gap-1
         text-slate-600
         hover:text-cyan-700
         transition
        "
                            >

                                <span className="
         text-xs
         md:text-sm
         font-medium
         text-center
        ">
                                    {item.label}
                                </span>

                            </Link>
                        ))}

                        <Link
                            to="/"
                            className="
        flex
        flex-col
        items-center
        justify-center
        min-w-[75px]
        gap-1
        text-slate-600
        hover:text-cyan-700
        transition
       "
                        >

                            <UserPen size={20} />

                            <span className="
        text-xs
        font-medium
       ">
                                Sair Demo
                            </span>

                        </Link>

                    </div>

                </div>

            </nav>

        </div>

    );

}

export default DemoDashboardLayout;