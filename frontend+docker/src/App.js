import React from "react";
import "./App.css";
import getUserInfo from "./api/getUserInfo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>Hello Universe</code>! <br /> <br />
          stay tuned @kraken
        </p>
        <button className="Test" onClick={() => console.log(getUserInfo('kraken'))}>CLICK ME AND CHECK YOUR CONSOLE!</button>
      </header>
    </div>
  );
}

export default App;
