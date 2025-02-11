import Banner from "./_component/Banner";
import Category from "./_component/Category";
import Products_Home from "./_component/Products";


const Layout_Home = () => {
  //   const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  return (
    <div className="flex justify-between max-w-[1440px] mx-auto w-[95vw] py-4">
      <section className="w-[16%]">
        <Category />
      </section>
      <div className="w-[82.5%]">
        <Banner />
        <Products_Home />
      </div>
    </div>
  )
}

export default Layout_Home