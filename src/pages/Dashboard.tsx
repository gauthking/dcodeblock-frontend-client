import Overview from "../components/Overview";
import SideNavMain from "../components/SideNavMain";
import UserMgmt from "../components/UserMgmt";

interface DashboardProps {
  pageType: string;
}

const Dashboard: React.FC<DashboardProps> = ({ pageType }) => {
  return (
    <main className="flex min-h-screen min-w-[100%]">
      <SideNavMain />
      {pageType === "overview" ? <Overview /> : <UserMgmt />}
    </main>
  );
};
export default Dashboard;
