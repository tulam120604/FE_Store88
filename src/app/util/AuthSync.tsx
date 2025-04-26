"use client";

import { useEffect } from "react";
import { useAuthStore } from "../_lib/Zustand/Store";
import { Infor_user } from "../_lib/Query_APIs/Auth/Query_Auth";

const AuthSync = () => {
  const {
    setData,
    clearData,
    setLoading,
    setFetching,
    isHydrated,
    setHydrated,
  } = useAuthStore();
  const { data, isLoading, isFetching, isError } = Infor_user();
  useEffect(() => {
    // Đảm bảo rằng chỉ update khi ứng dụng đã hydrate xong
    if (!isHydrated) {
      setHydrated(true);
    }

    if (isLoading) {
      setLoading(true);
      clearData();
    } else {
      setLoading(false);
      setFetching(isFetching); // Cập nhật trạng thái isFetching từ React Query

      if (data?.status === 200) {
        setData(data?.data);
      } else if (isError) {
        clearData();
      } else {
        clearData();
      }
    }
  }, [
    data,
    isLoading,
    isFetching,
    isError,
    setData,
    clearData,
    setLoading,
    setFetching,
    setHydrated,
    isHydrated,
  ]);

  return null; // Component này chỉ dùng để sync trạng thái
};

export default AuthSync;
