// import { requiredAuth } from "../util/requiredAuth";
import { infor_user } from "../_lib/Services/Services_Auth/Auth";
import Layout_Admin from "./layoutDashboard";
// import { useAuthStore } from "../_lib/Zustand/Store";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

const verifyToken = async (token: string) => {
  try {
    const secret = await jwtVerify(
      String(token),
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
    return secret?.payload;
  } catch (error) {
    console.error("JWT verify error:", error);
    return null;
  }
};

const MiddlewareAuth = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore?.get("access_token")?.value || "";
  const user = await verifyToken(token);
  const roleAccount = ["admin_global", "admin_local", "seller"];

  if (!roleAccount.includes(String(user?.role))) {
    redirect("/");
  }
  return <Layout_Admin>{children}</Layout_Admin>;
};

export default MiddlewareAuth;
