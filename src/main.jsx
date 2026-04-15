import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { TenantProvider } from "./context/TenantContext";
import { SegmentProvider } from "./context/SegmentContext";

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <SegmentProvider>
            <TenantProvider>
                <App />
            </TenantProvider>
        </SegmentProvider>
    </AuthProvider>
);