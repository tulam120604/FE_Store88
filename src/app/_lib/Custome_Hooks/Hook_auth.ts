import { useRouter } from "next/navigation";
import { Mutation_Auth } from "../Query_APIs/Auth/Auth_mutation";

export function useCustome_Hook_Auth({ mode }: any) {
  const routing = useRouter();
  const { my_form, isLoading, mutateAsync } = Mutation_Auth({
    action: mode === "Register" ? "REGISTER" : "LOGIN",
  });
  const { errors, isValidating } = my_form.formState;
  return {
    my_form,
    isLoading,
    mutateAsync,
    errors,
    isValidating,
    routing,
  };
}
