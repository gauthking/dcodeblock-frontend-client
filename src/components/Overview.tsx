import { useState, useRef, useEffect, useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bell } from "lucide-react";
import { UserInfo } from "../@types";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { AppContext } from "../App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [recentActivities, setRecentActivities] = useState<UserInfo[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { darkMode } = useContext(AppContext);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    setUserInfo(user);

    const handleStorageChange = () => {
      const token = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("user");

      if (!token || !user) {
        console.log("Session storage cleared, redirecting to login...");
        navigate("/");
      }
    };

    handleStorageChange();

    const fetchRecentActivities = async () => {
      try {
        const response = await axios.get("/api/user/getAllUsers");

        setRecentActivities(response.data);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchRecentActivities();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  const onLogout = async () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setIsOpen(false);

    try {
      await axios
        .post("/api/admin/action", {
          requestingUserEmail: userInfo?.userEmail,
          action: "Logged Out",
        })
        .then(() => console.log("log out action posted"));
    } catch (error) {
      alert("Action not posted");
      console.log("action post error - ", error);
    }
    navigate("/");
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <main
      className={`w-full flex flex-col items-center p-5 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <section className="w-full flex justify-between">
        <div className="header m-1">
          <h1 className="font-kanitmedium text-xl md:text-3xl">
            Dashboard Overview
          </h1>
        </div>
        <nav className="flex items-center justify-center gap-3 ">
          <div
            className={`p-1 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            } hover:scale-105 transition-all ease-in-out cursor-pointer`}
          >
            <Bell className="h-5 w-5" />
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`flex items-center justify-center gap-2 p-1 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              } cursor-pointer hover:scale-105 transition-all ease-in-out`}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <p className="text-sm md:text-lg font-mono">
                {userInfo?.userName}
              </p>
              <IoIosArrowDown
                className={`transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="py-1">
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiUser className="mr-3" />
                    Profile
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FiSettings className="mr-3" />
                    Settings
                  </button>
                  <button
                    onClick={onLogout}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-3" />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </section>

      <div
        className={`w-full h-[0.5px] m-2 md:my-6 ${
          darkMode ? "bg-gray-600" : "bg-gray-400"
        }`}
      ></div>

      <section className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
        {["Total Users", "Active Users", "New Sign-ups", "User Retention"].map(
          (title, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl w-full shadow-md hover:scale-105 transition-all ease-in-out ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-kanitmedium">{title}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {index === 2 ? 45 : 1234}
                </div>
                <p className="text-xs text-muted-foreground">
                  {index === 2
                    ? "+2% from last week"
                    : "+20.1% from last month"}
                </p>
              </div>
            </div>
          )
        )}
      </section>

      <div
        className={`w-full h-[0.5px] m-2 md:my-6 ${
          darkMode ? "bg-gray-600" : "bg-gray-300"
        }`}
      ></div>

      <section className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
        <div
          className={`p-4 rounded-xl shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-kanitmedium mb-4">
            Recent User Activity
          </h2>
          <div className="overflow-x-auto noscrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {recentActivities
                  ?.filter((f) => f.activities.length !== 0)
                  .map((activity) => (
                    <tr key={activity._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  font-kanitmedium">
                        {activity.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  font-kanitmedium">
                        {
                          activity.activities[activity.activities.length - 1]
                            ?.action
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  font-kanitmedium">
                        {new Date(
                          activity.activities[
                            activity.activities.length - 1
                          ]?.time
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={`p-4 rounded-xl shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-kanitmedium mb-4">User Growth</h2>
          <Line
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "New Users",
                  data: [33, 53, 85, 41, 44, 65],
                  fill: false,
                  borderColor: darkMode
                    ? "rgb(255, 255, 255)"
                    : "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                  labels: {
                    color: darkMode ? "white" : "black",
                  },
                },
                title: {
                  display: true,
                  text: "User Growth Chart",
                  color: darkMode ? "white" : "black",
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: darkMode ? "white" : "black",
                  },
                },
                y: {
                  ticks: {
                    color: darkMode ? "white" : "black",
                  },
                },
              },
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default Overview;
