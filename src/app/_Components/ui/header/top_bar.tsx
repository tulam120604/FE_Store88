import Link from "next/link";
import { ThemeToggle } from "../toggleTheme";
import Btn_logout from "../../Btn/Btn_logout";

export default function TopBar({ props }: any) {
  const { data, isLoading } = props;


  return (
    <div
      className="hidden z-[20000] lg:block bg-gray-100 dark:bg-gray-800 text-sm 
      text-gray-700 dark:text-gray-200 border-b px-4 relative"
    >
      <div className="max-w-[1440px] w-[95vw] mx-auto flex justify-between items-center py-2 px-3">
        {/* left */}
        <div className="flex space-x-4 items-center">
          {!isLoading && data?._id && (
            <Link
              className="hover:text-blue-500 duration-200"
              href="/thong-tin-tai-khoan/dang-ki-ban-hang"
            >
              Kênh người bán
            </Link>
          )}

          <span className="hidden sm:inline">
            Cần hỗ trợ ? Liên hệ:{" "}
            <a className="text-blue-500" href="tel:+0020500">
              +9999999999
            </a>
          </span>
        </div>

        {/* right */}
        <div className="flex items-center space-x-4 *:duration-200">
          {/* Nếu chưa loading thì mới render user info / đăng nhập */}
          {!isLoading && (
            <>
              {data?._id ? (
                <>
                  <Link
                    className="hover:text-blue-500"
                    href="/thong-tin-tai-khoan/don-hang"
                  >
                    Đơn hàng
                  </Link>
                  <Link
                    className="hover:text-blue-500"
                    href="/thong-tin-tai-khoan/san-pham-yeu-thich"
                  >
                    Yêu thích
                  </Link>
                  <div className="group relative">
                    <Link
                      className="hover:text-blue-500"
                      href={
                        data?.user_name
                          ? "/thong-tin-tai-khoan/thong-tin"
                          : "/tai-khoan"
                      }
                    >
                      {data?.user_name.length > 15
                        ? data?.user_name.slice(0, 15) + "..."
                        : data?.user_name}
                    </Link>

                    {data?.user_name && <Btn_logout />}
                  </div>
                </>
              ) : (
                <Link className="hover:text-blue-500" href={"/tai-khoan"}>
                  Đăng nhập
                </Link>
              )}
            </>
          )}

          {/* Theme toggle  */}
          <div className="*:p-0 *:w-5 *:h-5">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
