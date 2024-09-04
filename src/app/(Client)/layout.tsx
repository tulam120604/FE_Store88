import Footer from '../_Components/ui/Footer/page';
import Header from '../_Components/ui/Header/page';

export default function Layout_CLient({ children }: Readonly<{ children: React.ReactNode }>) {
    return (<>
        <Header />
        <main className='bg-[#F5F5FA]'>
            {children}
        </main>
        <Footer />

    </>)
}
