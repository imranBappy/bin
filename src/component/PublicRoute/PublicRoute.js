"use client";
import Loader from "@/common/Loader";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const PublicRoute = ({ children, lang }) => {
  const { isLoading, user } = useAuth();
  if (isLoading) {
    return <Loader />;
  }
  if (
    !user?.accessToken ||
    !user?.accessToken.length ||
    !user?.accessToken.length > 0
  ) {
    return <div>{children}</div>;
  } else {
    redirect(`/`);
  }
};

export default PublicRoute;
