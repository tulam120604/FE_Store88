// import { create } from 'zustand';
// import { IDataPayment } from '../Types/Interface';

// interface IStoreZustand {
//     data: any[],
//     isLoading: boolean,
//     isError: boolean,
//     setData: (value: IDataPayment | null) => void,
//     setLoading: (loading: any) => void,
//     setError: (error: any) => void,
// }

// const useStoreZustand = create<IStoreZustand>((set) => ({
//     data: [],
//     isLoading: false,
//     isError: false,
//     setData: ((values: any) => set({ data: values })),
//     setLoading: ((loading: boolean) => set({ isLoading: loading })),
//     setError: ((error: boolean) => set({ isError: error }))
// }))

// export default useStoreZustand