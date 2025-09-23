import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Protected from "./routeGuards/Protected";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Protected />}>
          <Route path="/userProfile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
