'use client';

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { Mutation_Favorite, Query_view_item_favorites } from '@/src/app/_lib/Query_APIs/Favorites/Query';
import { useAuthStore } from '@/src/app/_lib/Zustand/Store';
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Them_vao_san_pham_yeu_thich({ dataProps }: { dataProps: string | number }) {
    const routing = useRouter();
    const { data: data_user, isLoading: loading_user } = useAuthStore();
    const detail_item_favorite_by_user = Query_view_item_favorites(dataProps);
    const mutate_favorite = Mutation_Favorite('ADD_and_REMOVE');

    function handle_Favorite(action: string) {
        if (loading_user) {
            <Loading_Dots />
        }
        else {
            if (data_user?._id) {
                mutate_favorite?.mutate({
                    id_item: dataProps,
                    action: action
                })
            }
            else {
                routing.push('/login')
            }
        }
    }

    return (
        <div>
            {
                (detail_item_favorite_by_user?.data?.data === dataProps) ?
                    <button className="flex items-center gap-x-2" onClick={() => handle_Favorite('remove')}>
                        <Heart className="text-red-500 cursor-pointer h-5" fill='currentColor' />
                        <span>Đã thêm vào yêu thích</span>
                    </button> :
                    <button className="flex items-center gap-x-2" onClick={() => handle_Favorite('add')}>
                        <Heart className="text-red-500 cursor-pointer h-5" />
                        <span>Thêm vào yêu thích</span>
                    </button>
            }
        </div>)
}
