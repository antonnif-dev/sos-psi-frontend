import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Sair
    </button>
  );
}