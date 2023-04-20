import React from "react";
import "./App.css";
import getUserInfo from "./api/getUserInfo";
import { useState } from "react";

function App() {
  document.title = "Kraken";
  const [user, setUser] = useState('');

  if (user === '') {
    return (
      <div className="App">
        <Login setUser={setUser} />
      </div>
    )
  }
}

export default App;
