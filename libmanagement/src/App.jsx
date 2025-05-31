import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/usercontext.jsx'
import Appcontent from "./appcontent.jsx";

function App() {
  return (
    <UserProvider>         
      <Router>             
        <Appcontent />    
      </Router>
    </UserProvider>
  );
}

export default App