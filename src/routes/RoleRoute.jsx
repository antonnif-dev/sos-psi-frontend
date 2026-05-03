// RoleRoute.jsx
import { Navigate } from "react-router-dom";

function RoleRoute({ allowedRoles = [], children }) {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("ROLE ROUTE DEBUG");
    console.log("user:", user);
    console.log("role atual:", user?.role);
    console.log("allowedRoles:", allowedRoles);

    if (!user) {
        console.log("Usuário não encontrado.");
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        console.log("Acesso negado pelo RoleRoute.");
        return <Navigate to="/dashboard" replace />;
    }

    console.log("RoleRoute liberado.");
    return children;
}

export default RoleRoute;