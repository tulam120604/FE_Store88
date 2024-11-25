'use client';

export default function ReloadPage() {
    return (
        <div className='flex flex-col gap-y-2'>
            Ôi hỏng!
            <span>Có vẻ như đã có lỗi xảy ra :(( </span>
            <div>
                <button onClick={() => window.location.reload()} className="underline text-sky-500 text-sm">Tải lại trang!</button>
            </div>
        </div>
    )
}
