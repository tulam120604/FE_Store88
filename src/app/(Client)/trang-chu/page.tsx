import { Suspense } from "react";
import Banner from "./_component/Banner";
import Category from "./_component/Category";
import Products_Home from "./_component/Products";
import LoadingLandingPage from "./_component/loading";


const Layout_Home = () => {
  //   const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  return (
    <Suspense fallback={<LoadingLandingPage />}>
      <div className="grid grid-cols-[16%_82%] justify-between max-w-[1440px] mx-auto w-[95vw] py-4">
        <Category />
        <div>
          <Banner />
          <Products_Home />
        </div>
      </div>
    </Suspense>
  )
}

export default Layout_Home