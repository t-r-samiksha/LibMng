import Sidebar from './sidebar';
import Topbar from './topbar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
