import React, { createContext, useState, useEffect, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [minutes,setMinutes] = useState(0);
  const [studyTime,setStudyTime] = useState(30);
  const [int,setInt] = useState(5);
  const [leftStudyTime,setLeftStudyTime] = useState(0);
  const [leftIntTime,setLeftIntTime] = useState(0);
  const [State,setState] = useState(false);
  const [timer,setTimer] = useState(true);
  const [startTimerWithDelay,setStartTimerWithDelay] = useState(false)

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(()=>{
    if(seconds === 60){
      setMinutes(minutes+1)
    } 
    if(timer){
      console.log('====================================');
      console.log("running with timer ");
      console.log('====================================');
        setLeftStudyTime((studyTime * 60) - (minutes *60 + seconds));
        if((studyTime * 60) - (minutes *60 + seconds) === 0)  {
          setState(true);
          console.log('====================================');
          console.log("reached the macimium staudy time");
          console.log('====================================');
          stopTimer();
        }
    }else{
      console.log('====================================');
      console.log("running without timer");
      console.log('====================================');
    }
    
  },[seconds])



  const startTimer = () => {
    console.log("timer startted");
    setIsRunning(true);
    setTimeout(() => {
      setStartTimerWithDelay(true);
    }, 800);

  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeout(() => {
      setStartTimerWithDelay(false);
    }, 800);
    console.log("timer stopped");
  };

  const resetTimer = () => {
    setSeconds(0);
    console.log('timer resetted');
  };

  const studyTimer = (value) =>{
    setStudyTime(value);
  }
  const intTimer = (value) =>{
    setInt(value)
  }
  const setTimerStates = (value) =>{
    setTimer(value);
  }

  const value = {
    seconds,
    minutes,
    setMinutes,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    studyTimer,
    intTimer,
    leftStudyTime,
    leftIntTime,
    State,
    setTimerStates,
    startTimerWithDelay
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

// Create a custom hook to access the TimerContext
export const useTimer = () => {
  return useContext(TimerContext);
};
