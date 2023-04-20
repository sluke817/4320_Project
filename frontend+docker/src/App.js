import React from "react";
import "./App.css";
import { useState } from "react";
import Login from "./components/Login/Login";

function App() {
  document.title = "Kraken";
  const [user, setUser] = useState('');

  if (user === '') {
    return (
      <div className="App">
        <Login setUser={setUser} />
      </div>
    )
  } else {
    return (
      <h1>Logged in</h1>
    )
  }
}

export default App;
