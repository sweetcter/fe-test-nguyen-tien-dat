import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import SideBar from './sidebar/SideBar';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-200">
      <SideBar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
      <div className="relative flex min-w-0 flex-1 flex-col transition-all duration-300">
        <Header />
        <main className="flex-grow overflow-auto bg-muted/30 p-6">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default MainLayout;
