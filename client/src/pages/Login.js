import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useNotification } from "../context/NotificationContext";

function Login({ setUser }) {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLogin = async () => {
    try {
      let url = "";
      let role = "";

      if (loginInput.toUpperCase().startsWith("ADMIN")) {
        url = "http://localhost:5000/api/admin/login";
        role = "admin";
      } else {
        url = "http://localhost:5000/api/students/login";
        role = "student";
      }
  
     
      const bodyData =
        role === "student"
          ? {
              rollNumber: loginInput.includes("@") ? "" : loginInput,
              email: loginInput.includes("@") ? loginInput : "",
              password,
            }
          : { rollNumber: loginInput, password };

     
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const resData = await response.json();

      if (response.ok) {
        
        localStorage.setItem("token", resData.token);
        localStorage.setItem("user", JSON.stringify({ role, ...resData[role] }));

        setUser({ role, ...resData[role] });

        showNotification("Login successful!", "success");

       
        navigate(role === "admin" ? "/admin" : "/home");
      } else {
        showNotification(resData.message || "Invalid credentials" , "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showNotification("Something went wrong during login." , "error");
    }
  };

  return (
    <div className="login-page ">
          <header className="hero-header">
              <h1 className="clg-name">RP College Helpdesk Portal</h1>
             <p className="clg-sub">• Student support  • Tickets  • Resolutions</p>
          </header>
        <div className="login-box">
        <h2 className="login-txt">Login</h2>

        <input className="log-input"
          type="text"
          placeholder="Enter your Email or Roll Number"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          required
        />

        <input className="log-input"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button onClick={handleLogin}>Login</button>

      </div>

       <footer className="hero-footer">
           <small>© {new Date().getFullYear()} RP College Helpdesk</small>
          </footer>
    </div>
  );
}

export default Login;

