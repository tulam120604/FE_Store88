import { create } from "zustand";
import { IDataPayment } from "../../Types/Interface";

// store add to cart
interface IStoreAddToCart {
  isVisible: any;
  data: any[];
  isLoading: boolean;
  isError: boolean;
  setVisible: (value: any) => void;
  setData: (value: IDataPayment | null) => void;
  setLoading: (loading: any) => void;
  setError: (error: any) => void;
}

export const useStoreAddToCart = create<IStoreAddToCart>((set) => ({
  isVisible: undefined,
  data: [],
  isLoading: false,
  isError: false,
  setVisible: (value: any) => {
    set({ isVisible: value });
    setTimeout(() => set({ isVisible: undefined }), 1500);
  },
  setData: (values: any) => set({ data: values }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: boolean) => set({ isError: error }),
}));

// store and action status item order
interface IStoreStatusItemOrder {
  status: number;
  setStatus: (value: any) => void;
}

export const useStoreStatusItemOrder = create<IStoreStatusItemOrder>((set) => ({
  status: 0,
  setStatus: (value: any) => set({ status: value }),
}));

// store data infor user
interface IStoreDetailUser {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  isHydrated: boolean; 
  setData: (value: any) => void;
  setLoading: (loading: any) => void;
  setFetching: (loading: any) => void;
  setHydrated: (value: boolean) => void;
  clearData: () => void;
}
export const useAuthStore = create<IStoreDetailUser>((set) => ({
  data: undefined,
  isLoading: false,
  isFetching: false,
  isHydrated: false,
  setData: (value: any) => set({ data: value }),
  clearData: () => set({ data: undefined }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setFetching: (fetching: boolean) => set({ isFetching: fetching }),
  setHydrated: (value) => set({ isHydrated: value }),
}));
