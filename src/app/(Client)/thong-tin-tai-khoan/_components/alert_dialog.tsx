'user client'

import React from 'react';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/app/_Components/ui/dialog/alert-dialog';
import { AlertDialog } from '@/src/app/_Components/ui/alert-dialog';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';


export default function Alert_dialog({ dataProps }: any) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {
                    (dataProps?.action === 'remove') ?
                        <button className="hover:underline text-red-500 text-sm">Xóa</button> :
                        <Button variant="outline" className='border-gray-300 text-xs h-auto'>Đặt làm mặc định</Button>
                }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-sm'>
                        {
                            (dataProps?.action === 'remove') ?
                                'Xác nhận xóa địa chỉ này?' :
                                'Xác nhận đặt địa chỉ này làm mặc định?'
                        }
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='text-sm'>Hủy</AlertDialogCancel>
                    {
                        (dataProps?.action === 'remove') ?
                            <AlertDialogAction className='text-sm bg-green-500 hover:!bg-green-700'
                                onClick={() => dataProps?.remove_address({ id_address: dataProps?.id_address, action: 'remove' })}>
                                Xác nhận
                            </AlertDialogAction> :
                            <AlertDialogAction className='text-sm bg-green-500 hover:!bg-green-700'
                                onClick={() => dataProps?.change_default_address({ id_user: dataProps?.id_user, id_address: dataProps?.id_address })}>
                                Xác nhận
                            </AlertDialogAction>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
