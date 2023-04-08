import Header from '../components/Header/Header';
import SideBar from "../components/Sidebar/SideBar";
import Feed from "../components/Posts/Feed";
import Widgets from "../components/Widget/Widgets";

const Home = () => {
  return (
    <div className='h-screen bg-gray-100 overflow-hidden'>
      <Header />
      <main className="flex">
        <SideBar />
        <Feed />
        <Widgets />
      </main>
    </div>
  );
};

export default Home
