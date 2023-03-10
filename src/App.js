import React from "react";
import Timer from "./components/Timer";
import "./App.css";

const App = () => {
  return (
    <div className="main-wrapper">
      <div className="grid-wrapper">
        <Timer burnerClassName={"burner-1"}  />
        <Timer burnerClassName={"burner-2"}  />
        <Timer burnerClassName={"burner-3"}  />
        <Timer burnerClassName={"burner-4"}  />
      </div>
    </div>
  );
};

export default App;
