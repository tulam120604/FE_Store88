import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requiredAuth() {
  const token = cookies().get("access_token")?.value;
  if (!token) {
    redirect("/");
  }
  try {
    const res = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
    return res?.payload;
  } catch {
    redirect("/");
  }
}
