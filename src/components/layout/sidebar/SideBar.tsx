import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  CheckSquareOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { cn } from "@/utils";

interface SideBarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SideBar = ({ isCollapsed, toggleSidebar }: SideBarProps) => {
  const location = useLocation();

  const menuItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/task", icon: <CheckSquareOutlined />, label: "Tasks" },
  ];

  return (
    <aside
      className={`flex flex-col border-r bg-card transition-all duration-200 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
  <div
        className={cn(
          "flex h-16 items-center border-b px-2.5",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        <div
          className={cn(
            "duration-100",
            isCollapsed ? "pointer-events-none w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          <Link to={"/"} className="text-2xl">
            Logo
          </Link>
        </div>
        <button onClick={toggleSidebar} className="rounded p-2 text-xl">
          {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-2 overflow-hidden px-3 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.key);
          return (
            <Link
              key={item.key}
              to={item.key}
              className={`flex items-center gap-4 overflow-hidden whitespace-nowrap rounded-lg px-4 py-3 transition-colors ${
                isActive
                  ? "bg-primary font-medium text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="flex flex-shrink-0 items-center justify-center text-xl">
                {item.icon}
              </span>
              <span
                className={`transition-opacity duration-300 ${
                  isCollapsed ? "w-0 opacity-0" : "opacity-100"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
