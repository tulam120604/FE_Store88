import {
  create_product,
  update_product_dashboard,
  hidden_or_restore_product,
} from "../../Services/Services_Items/Product";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaValidateFormProduct } from "@/src/app/util/validate";

type Action = "ADD" | "EDIT" | "HIDDEN_OR_RESTORE";

export function Mutation_Items({ action }: { action: Action }) {
  // create form
  const my_form = useForm({
    resolver: yupResolver(schemaValidateFormProduct),
  });

  const query_client = useQueryClient();
  const { mutateAsync, ...rest } = useMutation({
    // retry: 3,
    mutationFn: async (dataClient: any) => {
      switch (action) {
        case "ADD":
          return await create_product(dataClient);
        case "EDIT":
          return await update_product_dashboard(dataClient);
        case "HIDDEN_OR_RESTORE":
          return await hidden_or_restore_product(dataClient);
        default:
          return;
      }
    },
    onSuccess: () => {
      query_client.invalidateQueries({
        queryKey: ["Product_Key"],
      });
    },
    onSettled: () => {
      query_client.invalidateQueries({
        queryKey: ["Product_Key"],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    mutateAsync,
    my_form,
    ...rest,
  };
}
