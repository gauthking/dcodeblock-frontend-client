import { useState, useEffect } from "react";
import { Users, Settings } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link
import { cn } from "../utils/utils";

const navItems = [
  { name: "Overview", icon: Settings, to: "/main" }, // Update `href` to `to`
  { name: "Users", icon: Users, to: "/userm" },
];

export default function SideNavMain() {
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

  return (
    <section
      className={cn(
        "md:relative md:z-0 flex min-h-screen flex-col bg-white shadow-md transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16",
        isExpanded ? "fixed z-40" : ""
      )}
      onMouseEnter={() => isMobile && setIsExpanded(true)}
      onMouseLeave={() => isMobile && setIsExpanded(false)}
    >
      <div className="p-4 flex justify-center">
        <h1
          className={cn(
            "font-kanitmedium text-gray-800 transition-all duration-300 ease-in-out",
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
              "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition-all duration-300 ease-in-out",
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
    </section>
  );
}
