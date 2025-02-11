import { create } from 'zustand';
import { IDataPayment } from '../Types/Interface';

// store add to cart
interface IStoreAddToCart {
    isVisible: any
    data: any[],
    isLoading: boolean,
    isError: boolean,
    setVisible: (value: any) => void,
    setData: (value: IDataPayment | null) => void,
    setLoading: (loading: any) => void,
    setError: (error: any) => void,
}

export const useStoreAddToCart = create<IStoreAddToCart>((set) => ({
    isVisible: undefined,
    data: [],
    isLoading: false,
    isError: false,
    setVisible: ((value: any) => {
        set({ isVisible: value });
        setTimeout(() => set({ isVisible: undefined }), 1500)
    }),
    setData: ((values: any) => set({ data: values })),
    setLoading: ((loading: boolean) => set({ isLoading: loading })),
    setError: ((error: boolean) => set({ isError: error }))
}));

// store data infor user
// interface IStoreDetailUser {
//     data: any;
//     isLoading: boolean;
//     isError: boolean;
//     setData: (value: any) => void;
//     setLoading: (loading: any) => void;
//     setError: (error: any) => void;
// }
// export const useStoreDetailUser = create<IStoreDetailUser>((set) => ({
//     data: undefined,
//     isLoading: false,
//     isError: false,
//     setData: ((value: any) => set({ data: value })),
//     setLoading: ((loading: boolean) => set({ isLoading: loading })),
//     setError: ((error: boolean) => set({ isError: error })),
// }))
// export const useStore