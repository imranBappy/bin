import Dashboard from "@/component/Dashboard";
import PrivateRoute from "@/component/PrivateRoute/PrivateRoute";
const DashboardLayout = ({ children, params }) => (
  <PrivateRoute lang={params.locale}>
    <Dashboard lang={params.locale}>{children}</Dashboard>
  </PrivateRoute>
);
export default DashboardLayout;
