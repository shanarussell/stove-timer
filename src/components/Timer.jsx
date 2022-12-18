import React, { useState, useEffect } from "react";
import "../App.css";
import useSound from "use-sound";
import BottomLeft from "../sounds/bottom-left.mp3";
import BottomRight from "../sounds/bottom-right.mp3";
import UpperLeft from "../sounds/upper-left.mp3";
import UpperRight from "../sounds/upper-right.mp3";

export default function Timer({ burnerName, burnerClassName }) {
  // State to hold the remaining time in seconds
  const [remainingTime, setRemainingTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState("");
  const [BottomLeftSound] = useSound(BottomLeft);
  const [BottomRightSound] = useSound(BottomRight);
  const [UpperLeftSound] = useSound(UpperLeft);
  const [UpperRightSound] = useSound(UpperRight);

  const onTimeExpired = () => {
    playSound();
    setIsRunning(false);
    setRemainingTime(null);
  };

  function playSound() {
    burnerName === "burner-1" && UpperLeftSound();
    burnerName === "burner-2" && UpperRightSound();
    burnerName === "burner-3" && BottomLeftSound();
    burnerName === "burner-4" && BottomRightSound();
  }

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
    <div className={burnerClassName}>
      <div className={isRunning ? "circle3-glowing" : "circle3"}>
        <div className={isRunning ? "circle2-glowing" : "circle2"}>
          <div className={isRunning ? "circle1-glowing" : "circle1"}>
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
