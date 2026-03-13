import { NavLink } from "react-router-dom";
import {
LayoutDashboard,
Users,
Calendar,
FileText,
DollarSign,
X
} from "lucide-react";

export default function MobileMenu({ open, setOpen }) {

if (!open) return null;

const baseLink =
"flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition";

const activeLink =
"bg-indigo-50 text-indigo-600";

const inactiveLink =
"text-gray-700 hover:bg-gray-100";

const getClass = ({ isActive }) =>
`${baseLink} ${isActive ? activeLink : inactiveLink}`;

return ( <div className="fixed inset-0 z-50 flex">
  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/40"
    onClick={() => setOpen(false)}
  />
  {/* Menu */}
  <div className="relative w-64 h-full bg-white shadow-xl p-4">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-bold text-indigo-600">
        SOS Psi
      </h2>
      <button
        className="p-2 rounded-lg hover:bg-gray-100"
        onClick={() => setOpen(false)}
      >
        <X size={20} />
      </button>
    </div>
    {/* Links */}
    <nav className="flex flex-col gap-1">
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
        Prontuário
      </NavLink>
    </nav>
  </div>
</div>
);
}