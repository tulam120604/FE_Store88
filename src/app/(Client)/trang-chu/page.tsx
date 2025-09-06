import Banner from "./_component/Banner";
import Category from "./_component/Danh_muc";
import Products_Home from "./_component/San_pham";

const Layout_Home = () => {
  //   const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  return (
    <div className="max-w-[1440px] mx-auto w-[95vw] py-4">
      <Banner />
      <Category />
      <Products_Home />
    </div>
  );
};

export default Layout_Home;
