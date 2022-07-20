import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Protectedroute from "./ProtectedRoutes";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  // Check If User is Logged In
  const [auth, setauth] = useState(false);
  const [auth1, setauth1] = useState(true);

  const isLoggedIn = async () => {
    try {
      const res = await fetch("/auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        setauth(true);
        setauth1(false);
      }
      if (res.status === 401) {
        setauth(false);
        setauth1(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/service" element={<Services />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/logout" element={<Logout />} />
        {/* <Protectedroute exact path="/login" element={<Login />} auth={auth1} />
        <Protectedroute
          exact
          path="/register"
          element={<Register />}
          auth={auth1}
        />
        <Protectedroute
          exact
          path="/dashboard"
          element={<Dashboard />}
          auth={auth}
        />
        <Protectedroute exact path="/logout" element={<Logout />} auth={auth} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

// Now we have to Procted Out Route Like Without Login
// You can not go to Dashboard
// And After login you can not login again
// We need Protected Routes

// We Cant Acces Them If Auth is False

// Now we need to Change Navbar Dynamically
