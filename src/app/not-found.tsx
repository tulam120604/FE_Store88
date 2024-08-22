import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center flex flex-col gap-y-2 items-center">
                <Image width={100} height={100} className='w-[100px] top-[10%]' src={'/Images/not-found.jpg'} alt=''></Image>
                <h1 className="text-9xl font-black text-gray-200">404</h1>
                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ôi hỏng!</p>
                <p className="mt-4 text-gray-500">Không tìm thấy trang.</p>
                <div>
                    <Link href="/"
                        className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                        Về trang chủ
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default NotFound