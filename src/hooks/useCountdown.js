import { useState, useEffect } from 'react';
import { SECONDS_IN_MS } from '../constants/timeConstants';

export const useCountdown = (startTime, timeIntervalInSec) => {
  const [timeLeft, setTimeLeft] = useState(timeIntervalInSec);

  useEffect(() => {
    setTimeLeft(timeIntervalInSec)
    if (startTime) {
      const interval = setInterval(() => {
        const secondsPassed = Math.floor((Date.now() - startTime) / SECONDS_IN_MS);
        setTimeLeft(timeIntervalInSec - secondsPassed);
        if (secondsPassed >= timeIntervalInSec) {
          clearInterval(interval);
        }
      }, SECONDS_IN_MS);

      return () => clearInterval(interval);
    }
  }, [startTime, timeIntervalInSec]);

  return timeLeft;
};