import Footer from '../_Components/ui/footer/page';
import Header from '../_Components/ui/header/header';

export default function Layout_Client({ children }: Readonly<{ children: React.ReactNode }>) {
    return (<>
        <Header />
        <main className='pb-5'>
            {children}
        </main>
        <Footer />
    </>)
}
