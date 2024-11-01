import { useState, useEffect, useContext } from "react";
import { Users, Settings } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link
import { cn } from "../utils/utils";
import { AppContext } from "../App";

const navItems = [
  { name: "Overview", icon: Settings, to: "/main" },
  { name: "Users", icon: Users, to: "/userm" },
];

export default function SideNavMain() {
  const { darkMode, setDarkMode } = useContext(AppContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIconClick = () => {
    if (isMobile) {
      setIsExpanded((prev) => !prev);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <section
      className={cn(
        "md:relative md:z-0 flex min-h-screen flex-col shadow-md transition-all duration-300 ease-in-out",
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800",
        isExpanded ? "w-64" : "w-16",
        isExpanded ? "fixed z-40" : ""
      )}
      onMouseEnter={() => isMobile && setIsExpanded(true)}
      onMouseLeave={() => isMobile && setIsExpanded(false)}
    >
      <div className="p-4 flex justify-center">
        <h1
          className={cn(
            "font-kanitmedium transition-all duration-300 ease-in-out",
            isExpanded ? "text-3xl" : "text-lg"
          )}
        >
          {isExpanded ? "Admin Dashboard" : "AD"}
        </h1>
      </div>

      <nav className="mt-6 flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            to={item.to}
            key={item.name}
            onClick={handleIconClick}
            className={cn(
              "flex items-center px-4 py-2 rounded-md transition-all duration-300 ease-in-out",
              darkMode
                ? "text-gray-200 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-200",
              isExpanded ? "justify-start" : "justify-center"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span
              className={cn(
                "ml-2 font-mono transition-all duration-300 ease-in-out",
                isExpanded ? "opacity-100" : "opacity-0 w-0"
              )}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4">
        <div
          className={cn(
            "flex items-center",
            isExpanded ? "justify-between" : "justify-center"
          )}
        >
          {isExpanded && (
            <span className="text-sm font-medium">
              {darkMode ? "Dark" : "Light"} Mode
            </span>
          )}
          <button
            onClick={toggleDarkMode}
            className={cn(
              "p-2 rounded-md font-mono transition-colors duration-200 my-4",
              darkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </section>
  );
}
