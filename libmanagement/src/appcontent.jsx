import Borrowedbooks from './components/borrowedbooks.jsx'
import Profilesettings from './components/profilesettings.jsx'
import Booksearch from './components/booksearch.jsx'
import Notifications from './components/notifications.jsx'
import Bookdet from './components/bookdet.jsx'
import DashboardLayout from './components/dashboardlayout.jsx'
import './index.css'
import Login from './components/login.jsx'
import Searchui from './components/searchui.jsx'
import Wishlist from './components/wishlist.jsx'
import { BrowserRouter as Router, Route, Routes , useLocation} from 'react-router-dom';
import MainLayout from './components/mainlayout.jsx'

function Appcontent() {

  return (

    <Routes>

      <Route>
        <Route path='/' element={<Login />}></Route>
      </Route>

      <Route element={<MainLayout />}>
            <Route
              path='/home' element={<DashboardLayout />}
            />
            <Route
              path='/myborrowedbooks' element={<Borrowedbooks />}
            />
            <Route
              path='/wishlist' element={<Wishlist />}
            />
            <Route
              path='/booksearch' element={<Booksearch />}
            />
            <Route
              path='/notifications' element={<Notifications />}
            />
            <Route 
              path='/bookdetails/:title' element = {<Bookdet />}
            />
            <Route
              path='/profilesettings' element = {<Profilesettings />}
            />
            <Route
              path='/booksearch/search' element = {<Searchui />}
            />
          {/* </Routes> */}
      </Route>

    </Routes>
  )
}

export default Appcontent
