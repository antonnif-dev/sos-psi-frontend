export default function ProtectedPage({ segments, profissoes, roles, children }) {
    return (
        <PrivateRoute>
            <SegmentRoute allowedSegments={segments}>
                <ProfissaoRoute allowedProfissoes={profissoes}>
                    <RoleRoute allowedRoles={roles}>
                        <DashboardLayout>
                            {children}
                        </DashboardLayout>
                    </RoleRoute>
                </ProfissaoRoute>
            </SegmentRoute>
        </PrivateRoute>
    );
}