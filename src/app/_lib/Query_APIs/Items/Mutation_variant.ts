import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  create_variant,
  remove_variant,
  update_variant,
} from "../../Services/Services_Items/Variant";

export function Mutation_variant(action: "CREATE" | "UPDATE" | "REMOVE") {
  const query_client = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (data) => {
      switch (action) {
        case "CREATE":
          return await create_variant(data);
        case "UPDATE":
          return await update_variant(data);
        case "REMOVE":
          return await remove_variant(data);
        default:
          return;
      }
    },
    onSuccess: () => {
      query_client.invalidateQueries({
        queryKey: ["Variant_key"],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    mutateAsync,
    ...rest,
  };
}
