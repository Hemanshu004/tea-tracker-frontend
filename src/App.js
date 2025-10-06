import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import TeaTrackerApp from "./components/TeaTrackerApp";

function App() {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    return username ? { username, role } : null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem("username", userData.username);
    localStorage.setItem("role", userData.role);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <>
      {user ? (
        <TeaTrackerApp user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
