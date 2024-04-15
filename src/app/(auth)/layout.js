// import Navbar from "@/component/Navbar/Navbar";
import PublicRoute from "@/component/PublicRoute/PublicRoute";

const AuthLayout = ({ children, params }) => {
  return (
    <>
      <PublicRoute>
        {/* <Navbar /> */}
        {children}
      </PublicRoute>
    </>
  );
};

export default AuthLayout;
