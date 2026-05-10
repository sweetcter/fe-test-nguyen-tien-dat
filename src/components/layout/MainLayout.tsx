import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import SideBar from './sidebar/SideBar';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen min-w-[768px] bg-background">
      <SideBar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-grow overflow-auto bg-muted/30 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
