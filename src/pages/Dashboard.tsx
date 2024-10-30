import Overview from "../components/Overview";
import SideNavMain from "../components/SideNavMain";

const Dashboard: React.FC = () => {
  return (
    <main className="flex min-h-screen min-w-[100%]">
      <SideNavMain />

      <Overview />
    </main>
  );
};
export default Dashboard;
