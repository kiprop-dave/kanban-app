import { useState } from "react";
import S from "./App.module.css";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <div className="App">
      <img
        src="/kanban-log.svg"
        alt=""
        style={{ width: "20vw", height: "20vh" }}
      />
    </div>
  );
}

export default App;
