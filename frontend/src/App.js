import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import PropPicker from './components/PropPicker/PropPicker';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prop-picker" element={<PropPicker />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
