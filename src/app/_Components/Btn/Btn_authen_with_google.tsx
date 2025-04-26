/* eslint-disable @next/next/no-img-element */
"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/Shadcn/button";
import { Mutation_Auth } from "../../_lib/Query_APIs/Auth/Auth_mutation";
import Loading_Spin from "../Loadings/Loading_Spin";
import { useRouter } from "next/navigation";

export default function Btn_auth_with_google({ action }: { action: string }) {
  const router = useRouter();
  const { mutateAsync, isLoading } = Mutation_Auth({
    action: "AUTHENTICATE_WITH_GOOGLE",
  });
  const submit = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const result = await mutateAsync(tokenResponse);
        // ví dụ redirect
        if (result.status === 201) {
          router.push("/dang-nhap");
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("❌ Error:", err);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return (
    <>
      <Button
        className="bg-transparent hover:opacity-80 text-gray-800 cursor-pointer rounded 
                  hover:bg-transparent font-normal border shadow-none flex gap-x-2"
        type="button"
        onClick={() => submit()}
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="google logo"
          style={{ width: "20px", height: "20px" }}
        />
        {isLoading ? (
          <Loading_Spin />
        ) : (
          <>
            {action === "signup" && "Đăng kí bằng google"}
            {action === "signin" && "Đăng nhập bằng google"}
          </>
        )}
      </Button>
    </>
  );
}
