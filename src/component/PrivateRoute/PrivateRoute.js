"use client";
import Loader from "@/common/Loader";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

const PrivateRoute = ({ children, lang }) => {
  const { isLoading, user } = useAuth();
  if (isLoading) {
    return <Loader />;
  }
  if (
    !user?.accessToken ||
    !user?.accessToken.length ||
    !user?.accessToken.length > 0
  ) {
    redirect(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
  } else {
    return <div>{children}</div>;
  }
};

export default PrivateRoute;
