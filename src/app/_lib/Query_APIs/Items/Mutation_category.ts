import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { create_category } from "../../Services/Services_Items/Category";

type Actions = "ADD" | "EDIT" | "REMOVE";

export function Mutation_Category(action: Actions) {
  const queryClient = useQueryClient();
  const form_category = useForm();
  const { mutate, mutateAsync, data, error, ...rest } = useMutation({
    mutationFn: async (data) => {
      switch (action) {
        case "ADD":
          return await create_category(data);
        default:
          return;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Category_Key"],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["Category_Key"],
      });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const on_Submit_category: SubmitHandler<any> = async (data) => {
    return await mutateAsync(data);
  };
  return { on_Submit_category, data, error, form_category, ...rest };
}
