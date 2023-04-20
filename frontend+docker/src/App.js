import React from "react";
import "./App.css";
import { useState } from "react";
import Login from "./components/Login/Login";
import ViewAccountDetails from "./components/ViewAccountDetails";

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
  else {
    return (
      <div className="AccountDetails">
        <ViewAccountDetails user={user} />
      </div>
    )
  }
  
}

export default App;
