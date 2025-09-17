"use client";

import { useRouter } from "next/navigation";
import { Mutation_Auth } from "../../_lib/Query_APIs/Auth/Auth_mutation";
import { message } from "../ui/message";
import Loading_Overlay from "../Loadings/Loading_Overlay";

export default function Btn_logout() {
  const router = useRouter();
  const { mutateAsync, isLoading: logOutLoading } = Mutation_Auth({
    action: "LOGOUT",
  });

  const handleLogout = async () => {
    try {
      const result = await mutateAsync("");
      if (result?.error) {
        message.error(result?.message);
        return;
      }
      router.push("/");
    } catch (error) {
      message.error("Đăng xuất thất bại. Vui lòng thử lại!");
    }
  };
  return (
    <>
      {logOutLoading && (
      <Loading_Overlay/>
      )}

      {!logOutLoading && (
        <button
          onClick={handleLogout}
          className="absolute bg-white dark:bg-[#020817] scale-0 group-hover:scale-100
                  whitespace-nowrap -right-1/2 p-3 shadow rounded-lg hover:text-red-500 duration-200 
                  group-hover:top-full group-hover:right-0 top-0"
        >
          Đăng xuất
        </button>
      )}
    </>
  );
}
