import { useState, useEffect, useRef } from 'react';
import { SECONDS_IN_MS } from '../constants/timeConstants';

const MAX_WAIT_TIME_SEC = 20 //Wait for 2 seconds before throwing error

const useFetchPrice = () => {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const errorIntervalRef = useRef()

  useEffect(() => {
    let socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

    socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    socket.addEventListener('message', (event) => {
      try {
        clearTimeout(errorIntervalRef.current)
        const data = JSON.parse(event.data);
        if(!isNaN(data.bitcoin)){
            setPrice(data.bitcoin);
            setLoading(false);
        }
      } catch (err) {
        errorIntervalRef.current = setTimeout(() => {
            setError(event)
        },MAX_WAIT_TIME_SEC * SECONDS_IN_MS)
      }
    });

    socket.addEventListener('error', (event) => {
    //   setError(new Error('WebSocket error: ' + event.message));
        errorIntervalRef.current = setTimeout(() => {
            setError(event)
        },MAX_WAIT_TIME_SEC * SECONDS_IN_MS)
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    return () => {
      socket.close(); // Cleanup on unmount
    };
  }, []);

  return { price, loading, error };
};

export default useFetchPrice;