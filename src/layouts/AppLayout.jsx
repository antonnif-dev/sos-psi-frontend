import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import MobileMenu from "../components/MobileMenu";

export default function AppLayout({ children }) {

const [open, setOpen] = useState(false);

return ( <div className="min-h-screen bg-gray-50 flex">
  {/* Sidebar desktop */}
  <div className="hidden md:flex md:w-64 md:flex-shrink-0">
    <Sidebar />
  </div>

  {/* Área principal */}
  <div className="flex flex-1 flex-col">

    {/* Header */}
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">

      <div className="flex items-center justify-between px-4 py-3 md:px-6">

        {/* Botão menu mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </button>

        {/* Título */}
        <h1 className="text-lg font-semibold text-gray-700">
          Painel
        </h1>

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
        </div>

      </div>

    </header>

    {/* Conteúdo */}
    <main className="flex-1 w-full px-4 py-6 md:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">
        {children}
      </div>

    </main>

  </div>

  {/* Menu mobile */}
  <MobileMenu open={open} setOpen={setOpen} />

</div>

);
}
