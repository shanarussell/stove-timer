import React, { useState, useEffect, useMemo } from "react";
import "../App.css";
import styled, { css } from "styled-components";
import BottomLeftSound from "../sounds/bottom-left.mp3";
import BottomRightSound from "../sounds/bottom-right.mp3";
import UpperLeftSound from "../sounds/upper-left.mp3";
import UpperRightSound from "../sounds/upper-right-2.mp3";

const Blinker = styled.div(
  ({ isFinished }) => css`
    ${isFinished &&
    css`
      background-color: rgb(238, 231, 137);
      border-radius: 50%;
      animation: blinker 1s linear infinite;
    `}
  `
);

export default function Timer({ burnerClassName }) {
  const [remainingTime, setRemainingTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [initialTime, setInitialTime] = useState("");

  const upperLeft = useMemo(() => {
    return new Audio(UpperLeftSound);
  }, []);
  const bottomLeft = useMemo(() => {
    return new Audio(BottomLeftSound);
  }, []);
  const bottomRight = useMemo(() => {
    return new Audio(BottomRightSound);
  }, []);
  const upperRight = useMemo(() => {
    return new Audio(UpperRightSound);
  }, []);

  function playSound() {
    burnerClassName === "burner-1" && upperLeft.play();
    upperLeft.loop = true;
    burnerClassName === "burner-2" && upperRight.play();
    upperRight.loop = true;
    burnerClassName === "burner-3" && bottomLeft.play();
    bottomLeft.loop = true;
    burnerClassName === "burner-4" && bottomRight.play();
    bottomRight.loop = true;
  }

  function stopSound() {
    upperLeft.pause();
    upperRight.pause();
    bottomLeft.pause();
    bottomRight.pause();
  }
  function resetTimer() {
    stopSound();
    setIsRunning(false);
    setRemainingTime(null);
    setInitialTime("");
    setIsFinished(false);
  }

  const startTimer = () => {
    setIsRunning(true);
    setRemainingTime(60 * initialTime);
  };

  const handleTimeInput = (event) => {
    setInitialTime(event.target.value);
  };

  const handleInputFocus = (event) => {
    setIsFinished(false);
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
      setIsRunning(false);
      setIsFinished(true);
      playSound();
      setInitialTime("");
      setRemainingTime(null);
    }
  }, [isRunning, remainingTime, upperLeft]);

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
      <Blinker isFinished={isFinished}>
        <div className={isRunning ? "circle3-glowing" : "circle3"}>
          <div className={isRunning ? "circle2-glowing" : "circle2"}>
            <div className={isRunning ? "circle1-glowing" : "circle1"}>
              <input
                className="input"
                type="number"
                step={1}
                value={initialTime}
                onChange={handleTimeInput}
                onFocus={handleInputFocus}
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
      </Blinker>
    </div>
  );
}
