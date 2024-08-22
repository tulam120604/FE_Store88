const apiURi = process.env.NEXT_PUBLIC_DB_HOST;
import {toast} from 'react-toastify'

export async function create_seller(data_body : any) {
    try {
        const res = await fetch (`${apiURi}/create_seller/${data_body?.id_user}`,  {
            method : 'PATCH',
            headers :  {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data_body)
        });
        if (!res.ok){
            toast.error('Tạo thất bại, vui lòng kiểm tra lại!!', {autoClose : 500});
            return res
        }
        else {
            toast.success('Tạo người bán hàng thành công!', {autoClose : 500})
        }
        return res
    } catch (error){
        return error || 'Lỗi server rồi đại vương ơi!'
    }
}