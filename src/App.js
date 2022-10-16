import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import  Home from "./components/Home"
import AddUser from "./components/AddUser"
import EditUser from "./components/EditUser"

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route  path="/addUser" element={<AddUser />}></Route>
      <Route  path="/editUser/:id" element={<EditUser />}></Route>
      </Routes>
      
    </div>
    
  );
}

export default App;
