import Sidebar from './sidebar.jsx'
import Topbar from './topbar.jsx'
import Currentlyborrowedbooks from './currentlyborrowed.jsx'
import Recommendations from './recomendations.jsx'
import Category from './category.jsx'
import "../styles/dashboardlayout.css";

const DashboardLayout = () => {
  return (
    <>
    <div className="currentlyborrowedbooksbox">
      <div className="candr">
      <Currentlyborrowedbooks />
      <Category />
      </div>
      <Recommendations />
    </div>
    </>
  );
};

export default DashboardLayout;
