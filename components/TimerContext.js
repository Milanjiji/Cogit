import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context
const TimerContext = createContext();

// Create a TimerProvider component to wrap your app with
export const TimerProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [minutes,setMinutes] = useState(0);
  const [studyTime,setStudyTime] = useState(30);
  const [int,setInt] = useState(5);
  const [leftStudyTime,setLeftStudyTime] = useState(0);
  const [leftIntTime,setLeftIntTime] = useState(0);
  const [State,setState] = useState(false);


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
    
    if(!State){
      setLeftStudyTime((studyTime * 60) - (minutes *60 + seconds));
      if((studyTime * 60) - (minutes *60 + seconds) === 0)  {
        setState(true);
        console.log('====================================');
        console.log("reached the macimium staudy time");
        console.log('====================================');
        resetTimer();
      }
    }else{
      setLeftIntTime((int * 60) - (minutes * 60 + seconds));
      if((int * 60) - (minutes * 60 + seconds) === 0)  {
        setState(false);
        console.log('====================================');
        console.log("reached the macimium intreval time ");
        console.log('====================================');
        resetTimer();
      }
    }
  },[seconds])



  const startTimer = () => {
    console.log("timer startted");
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
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

  const value = {
    seconds,
    minutes,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    studyTimer,
    intTimer,
    leftStudyTime,
    leftIntTime,
    State
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

// Create a custom hook to access the TimerContext
export const useTimer = () => {
  return useContext(TimerContext);
};
