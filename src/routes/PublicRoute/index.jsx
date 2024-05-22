import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "@/components/Loading";
import { validateAccessToken } from "@/config/auth";

export const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isValidToken = await validateAccessToken();
      setLoading(false);

      if (!isValidToken) return;

      navigate("/home");
    };

    checkAuth();
  }, []);

  return loading ? <Loading fullPage /> : <>{children}</>;
};
