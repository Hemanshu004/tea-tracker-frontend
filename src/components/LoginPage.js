import React, { useState } from "react";
import "./LoginPage.css"; 

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const allowedUsers = [
      { username: "Hemanshu", password: "HitM@c15156", role: "user" },
      { username: "Shailendra", password: "XLR8@04", role: "user" },
      { username: "Nirmal", password: "Nirm@l", role: "user" },
      { username: "Roommate4", password: "Subhash@07", role: "user" },
      { username: "admin", password: "HitM@c15156", role: "admin" },
    ];

    const user = allowedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) return setError("Invalid credentials");
    onLogin(user);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Tea Tracker ☕</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
