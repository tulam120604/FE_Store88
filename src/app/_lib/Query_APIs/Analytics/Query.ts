import { useQuery } from "@tanstack/react-query";
import {
  caculate_revenue,
  summary,
} from "../../Services/Service_Analytics/Caculate_revenue";
import { analytic_orders } from "../../Services/Service_Analytics/Analytic_order";

export function Query_caculate_revenue() {
  const { data, ...rest } = useQuery({
    queryKey: ["CACULATE_REVENUE"],
    queryFn: () => caculate_revenue(),
  });
  return { data, ...rest };
}

//count product, category, user,...
export function Query_summary() {
  const { data, ...rest } = useQuery({
    queryKey: ["SUMMARY"],
    queryFn: () => summary(),
  });
  return { data, ...rest };
}

export function Query_analytic_order(year: number | undefined) {
  const { data, ...rest } = useQuery({
    queryKey: ["ANALYTIC_ORDER", year],
    queryFn: () => analytic_orders(year),
  });
  return { data, ...rest };
}
