import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  CheckSquareOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { cn } from '@/utils';

interface SideBarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SideBar = ({ isCollapsed, toggleSidebar }: SideBarProps) => {
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches && !isCollapsed) {
        toggleSidebar();
      }
    };

    if (mediaQuery.matches && !isCollapsed) {
      toggleSidebar();
    }

    mediaQuery.addEventListener('change', handleChange as (e: MediaQueryListEvent) => void);
    return () => {
      mediaQuery.removeEventListener('change', handleChange as (e: MediaQueryListEvent) => void);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/task', icon: <CheckSquareOutlined />, label: 'Tasks' },
  ];

  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col border-r bg-card transition-all duration-200',
        isCollapsed ? 'w-16' : 'w-60'
      )}
    >
      <div
        className={cn(
          'flex h-16 items-center border-b px-2.5',
          isCollapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          )}
        >
          <Link to={'/'} className="whitespace-nowrap text-xl font-bold tracking-tight">
            Task App
          </Link>
        </div>
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          title={isCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
        >
          {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-hidden px-2 py-3">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.key);
          return (
            <Link
              key={item.key}
              to={item.key}
              className={cn(
                'flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-lg px-3 py-2.5 transition-colors',
                isActive
                  ? 'bg-primary font-medium text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="flex shrink-0 items-center justify-center text-base">
                {item.icon}
              </span>
              <span
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                )}
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
