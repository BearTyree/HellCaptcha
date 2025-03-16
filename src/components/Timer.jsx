import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

const Timer = forwardRef((props, ref) => {
  const initialTime = 300; // Set initial time in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (timeLeft == 0) {
      props.timeUp();
    }
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };
  useImperativeHandle(ref, () => ({
    startTimer,
  }));

  return (
    <div className='grid place-items-center content-center'>
      <div className='bg-red-300 p-2 rounded-md'>
        {Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
      </div>
    </div>
  );
});

export default Timer;
