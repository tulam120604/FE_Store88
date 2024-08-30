import { Suspense } from "react";
import Banner from "./_component/Banner";
import Category from "./_component/Category";
import Products_Home from "./_component/Products";
import LoadingLandingPage from "./_component/loading";


const Layout_Home = async () => {
  //   const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  return (<>
    <Suspense fallback={<LoadingLandingPage />}>
      <Banner />
      <Category />
      <Products_Home />
    </Suspense>
  </>)
}

export default Layout_Home