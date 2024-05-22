import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Loading } from "@/components/Loading";
import { validateAccessToken } from "@/config/auth";

export const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function main() {
      const isValidToken = await validateAccessToken();

      if (isValidToken) {
        setLoading(false);

        return;
      }

      toast.error("Página com acesso restrito");
      navigate("/");
    }
    main();
  }, []);

  return loading ? <Loading fullPage /> : <>{children}</>;
};
