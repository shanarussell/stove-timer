import React, { useState, useEffect } from "react";
import "../App.css";

export default function Timer() {
  // State to hold the remaining time in seconds
  const [remainingTime, setRemainingTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState("");

  const onTimeExpired = () => {
    alert("Time expired!");
    setIsRunning(false);
    setRemainingTime(null);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingTime(null);
    setInitialTime("");
  };

  const startTimer = () => {
    setIsRunning(true);
    setRemainingTime(60 * initialTime);
  };

  const handleTimeInput = (event) => {
    setInitialTime(event.target.value);
  };

  // useEffect hook to update the remaining time every second
  useEffect(() => {
    if (remainingTime) {
      const intervalId = setInterval(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }

    if (remainingTime === 0) {
      onTimeExpired();
    }
  }, [remainingTime]);

  const handleElapsedTime = () => {
    const minutes = Math.floor(remainingTime / 60).toString();
    const seconds = (remainingTime % 60).toString().padStart(2, "0");

    return (
      <div className="elapsed-time">
        {minutes}:{seconds}
      </div>
    );
  };

  // Render the remaining time in the format MM:SS
  return (
    <div className="main">
      <div className="circle3">
        <div className="circle2">
          <div className="circle1">
            <input
              className="input"
              type="number"
              step={1}
              value={initialTime}
              onChange={handleTimeInput}
              placeholder="minutes"
            />
            <div className="elapsed-time">
              {isRunning && handleElapsedTime()}
            </div>

            <div className="buttons">
              <button className="start-button" onClick={startTimer}>
                Start
              </button>
              <button className="reset-button" onClick={resetTimer}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
