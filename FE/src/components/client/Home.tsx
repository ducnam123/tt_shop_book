import { Footer, Header } from "..";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#F0F0F0]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
