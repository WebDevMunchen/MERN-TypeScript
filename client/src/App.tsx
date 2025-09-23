import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Protected from "./routeGuards/Protected";
import Profile from "./components/Profile";
import "./App.css";
import Events from "./components/Events";
import Authorize from "./routeGuards/Authorize";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Protected />}>
          <Route path="/events" element={<Events />} />
          {/* <Route path="/admin" element={<Authorize role="admin" />}> */}
          <Route path="/admin" element={<Authorize roles={["user", "admin"]} />}>
            <Route path="userProfile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
