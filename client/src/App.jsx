import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/form/Navbar'; // Import the Navbar component
import Form from './components/form/Form';
import Customer from './components/form/Customer'; // Import the Customer component

function App() {
  return (
    <Router>
      <div className="main-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/search" element={<Customer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
