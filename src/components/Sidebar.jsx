import { NavLink } from "react-router-dom";
import {
LayoutDashboard,
Users,
Calendar,
FileText,
DollarSign
} from "lucide-react";

export default function Sidebar() {
const baseLink =
"flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition";
const activeLink = "bg-indigo-50 text-indigo-600";
const inactiveLink = "text-gray-600 hover:bg-gray-100";
const getClass = ({ isActive }) =>
`${baseLink} ${isActive ? activeLink : inactiveLink}`;

return ( <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
  {/* Logo */}
  <div className="h-16 flex items-center px-6 border-b border-gray-200">
    <h2 className="text-lg font-bold text-indigo-600">
      SOS Psi
    </h2>
  </div>

  {/* Navegação */}
  <nav className="flex flex-col gap-1 p-4">

    <NavLink className={getClass} to="/dashboard">
      <LayoutDashboard size={18} />
      Dashboard
    </NavLink>

    <NavLink className={getClass} to="/pacientes">
      <Users size={18} />
      Pacientes
    </NavLink>

    <NavLink className={getClass} to="/agenda">
      <Calendar size={18} />
      Agenda
    </NavLink>

    <NavLink className={getClass} to="/documentos">
      <FileText size={18} />
      Documentos
    </NavLink>

    <NavLink className={getClass} to="/financeiro">
      <DollarSign size={18} />
      Financeiro
    </NavLink>

    <NavLink className={getClass} to="/prontuario">
      <DollarSign size={18} />
      Prontuários
    </NavLink>
  </nav>
</aside>
);
}