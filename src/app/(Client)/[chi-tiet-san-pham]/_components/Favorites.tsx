'use client';

import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User';
import { Mutation_Favorite, Query_detail_favorites } from '@/src/app/_lib/Tanstack_Query/Favorites/Query_Feedback';
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Favorites_Detail_Item({ dataProps }: { dataProps: string | number }) {
    const routing = useRouter();
    const user = useCheck_user();
    const detail_item_favorite_by_user = Query_detail_favorites(user?.check_email?._id, dataProps);
    const mutate_favorite = Mutation_Favorite('ADD_and_REMOVE');

    function handle_Favorite(action: string) {
        if (user?.check_email?._id) {
            mutate_favorite?.mutate({
                id_user: user?.check_email?._id,
                id_item: dataProps,
                action: action
            })
        }
        else {
            routing.push('/login')
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
