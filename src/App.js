import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileManagement from './components/ProfileManagement';


function App() {
  sessionStorage.setItem("userId", "USR06f90da3-d0ff-42c3-9431-716978a1ee5b")
  
  return (
    <ProfileManagement/>    
  );
}

export default App;
