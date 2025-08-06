import { useAuthStore } from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { login } from "../api";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";

export function useSignIn() {
  const navigate = useNavigate();

  const { setToken } = useAuthStore();
  return useMutation({
    mutationFn: (user) => login(user),
    onSuccess: (data) => {
      setToken(data);

      toast.success("Acceso concedido");
      navigate("/admin");
    },
    onError: (error) => {
      const errorMessage = error.message;
      if (isAxiosError(error) && error.response) {
        toast.error(error.message || "Error del servidor");
      } else {
        toast.error(errorMessage);
      }
    },
  });
}
