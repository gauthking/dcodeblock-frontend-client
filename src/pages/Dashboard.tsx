import Overview from "../components/Overview";
import SideNavMain from "../components/SideNavMain";
import SideNavMobile from "../components/SideNavMobile";

const Dashboard: React.FC = () => {
  return (
    <main className="min-h-screen min-w-[100%]">
      <nav>
        <SideNavMain />
        <SideNavMobile />
      </nav>

      <Overview />
    </main>
  );
};
export default Dashboard;
