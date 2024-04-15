import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const login = (user) => {
    if (user) {
      localStorage.setItem("token", JSON.stringify(user));
      setUser(user);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    setIsLoading(true);
    const userInfo = localStorage.getItem("token");
    setUser(userInfo ? JSON.parse(userInfo) : null);
    setIsLoading(false);
  }, []);

  return { user, login, logout, isLoading };
};

export default useAuth;
