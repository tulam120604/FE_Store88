import { create } from 'zustand';
import { IDataPayment } from '../Types/Interface';

interface IStoreZustand {
    isVisible: any
    data: any[],
    isLoading: boolean,
    isError: boolean,
    setVisible: (value: any) => void,
    setData: (value: IDataPayment | null) => void,
    setLoading: (loading: any) => void,
    setError: (error: any) => void,
}

const useStoreZustand = create<IStoreZustand>((set) => ({
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
}))

export default useStoreZustand