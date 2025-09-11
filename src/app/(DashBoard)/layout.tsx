import { redirect } from "next/navigation";
// import { requiredAuth } from "../util/requiredAuth";
import Layout_Admin from "./layoutDashboard";

const MiddlewareAuth = async ({ children }: { children: React.ReactNode }) => {
  // const user = await requiredAuth();
  // const roleAccount = ["admin_global", "admin_local", "seller"];

  // if (!roleAccount.includes(String(user?.role))) {
  //   redirect("/");
  // }
  return <Layout_Admin>{children}</Layout_Admin>;
};

export default MiddlewareAuth;
