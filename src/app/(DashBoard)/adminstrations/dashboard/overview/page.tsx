'use client'

import { Suspense } from "react";
import { DollarSign, List, Package, UsersRound } from "lucide-react"
import { Query_Category, Query_List_Items_Dashboard } from '@/src/app/_lib/Tanstack_Query/Items/query';
import { List_Account } from '@/src/app/_lib/Tanstack_Query/Auth/Query_Auth';
import { useToken } from '@/src/app/_lib/Custome_Hooks/User';
import Box from "../_component/box"
import { ChartData } from "../_component/Chart"
import Top_seller from "../_component/top_seller"
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";

export default function Page() {
    const token = useToken();
    const { data } = Query_List_Items_Dashboard(token.accessToken, 1, 1);
    const { data: account } = List_Account(token.accessToken);
    const { data: category } = Query_Category();
    return (
        <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
            <div className='grid lg:grid-cols-4 grid-cols-3 *:p-6 *:rounded-xl *:border *:border-gray-300 gap-4 my-6'>
                <Box dataProps={{ text: 'Tổng doanh thu', number: '45.231,89 đ', icon: <DollarSign /> }} />
                <Box dataProps={{ text: 'Tổng mặt hàng', number: data?.data?.totalDocs, icon: <Package /> }} />
                <Box dataProps={{ text: 'Danh mục', number: category?.data?.length, icon: <List /> }} />
                <Box dataProps={{ text: 'Tổng người dùng', number: account?.data?.totalDocs, icon: <UsersRound /> }} />
                <Box dataProps={{
                    text: 'Người bán', number: Array.isArray(account?.account_seller) &&
                        account?.account_seller?.length, icon: <UsersRound />
                }} />
            </div>
            {/* chart */}
            <div className='grid grid-cols-[60%_39%] justify-between'>
                <div>
                    <ChartData />
                </div>
                <div>
                    <Top_seller dataProps={account?.account_seller} />
                </div>
            </div>
        </Suspense>
    )
}
