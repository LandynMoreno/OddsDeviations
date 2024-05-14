import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import PropPicker from './components/PropPicker/PropPicker';
import Login from './components/Account/Login/Login';
import CreateAccount from './components/Account/CreateAccount/CreateAccount';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PropPicker" element={<PropPicker />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
