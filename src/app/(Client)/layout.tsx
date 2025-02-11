import Footer from '../_Components/ui/Footer/page';
import Header from '../_Components/ui/Header/page';

export default function Layout_Client({ children }: Readonly<{ children: React.ReactNode }>) {
    return (<>
        <Header />
        <main className='bg-[#F5F5FA] pb-5'>
            {children}
        </main>
        <Footer />
    </>)
}
