import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import GameResultToast from '../components/GameResultToast';
import { fetchScoreFromLocalStorage, saveScoreToLocalStorage } from '../utils/localStorageHelper';
import { useCountdown } from '../hooks/useCountdown';
import useFetchPrice from '../hooks/useFetchPrice';

const USER_GUESS = {
  UP: "up",
  DOWN: "down"
}

const DEFAULT_RESULT = {message: null, success: null}

const GUESS_INTERVAL_OPTIONS_IN_SEC = [10,30,60]

const GameInterface = () => {
  const [guessIntervalInSec, setGuessIntervalInSec] = useState(GUESS_INTERVAL_OPTIONS_IN_SEC[0]) //Option to select interval
  const [userGuess, setUserGuess] = useState(null); //UP | DOWN | null
  const [startTime, setStartTime] = useState(null); //to start the counter
  const [result, setResult] = useState(DEFAULT_RESULT); //message to show the user
  const [score, setScore] = useState(null); //User score
  const { price, loading, error } = useFetchPrice();
  
  const timeLeft = useCountdown(startTime, guessIntervalInSec);

  //To hold old price for comparison and source of truth for users
  const oldPriceRef = useRef(null);
  
  useEffect(() => {
     getUserLatestScore()
  }, [])

  useEffect(() => {
    //If price changes &&  the user has guessed + guess time has exceeded 
    // then do the comparison and show the result
    if(userGuess && timeLeft <= 0){
        let newResult = {}
        let message = ''
        let newScore = score
        const priceDiff = price - Number(oldPriceRef.current)
        if(priceDiff > 0 && userGuess === USER_GUESS.UP || priceDiff < 0 && userGuess === USER_GUESS.DOWN){
          message = `You guessed correctly. The price went ${userGuess} `
          newScore++
          newResult.success = true
        }else{
          message = `Wrong guess. The price went ${userGuess === USER_GUESS.UP ? USER_GUESS.DOWN : USER_GUESS.UP} `
          newScore = score - 1 > 0 ? score - 1 : 0
          newResult.success = false
        }
        message += `by ${Math.abs(priceDiff.toFixed(2))}$`;
        newResult.message = message
        setResult(newResult)
        saveScoreToLocalStorage(newScore)
        setUserGuess(null)
        setStartTime(null)
        getUserLatestScore()   
    }
  }, [price])

  function getUserLatestScore(){
    setScore(fetchScoreFromLocalStorage() || 0)
  }

  function getGameLoadingTitle(){
    if(timeLeft > 0){
      return <p>You guessed the price will go {userGuess} in <span style={{fontWeight: 'bold'}}>{timeLeft}</span> seconds</p> 
    }
    return <p>Waiting for price to update</p>
  }

  const handleGuess = (guess) => {
    if (!userGuess) {
      setUserGuess(guess);
      setStartTime(Date.now());
      oldPriceRef.current = price;
    }
  };

  return (
    <div className='gameContainer'>
      <div className='intervalSelection'>
        <label htmlFor='intervalSelection'>Select Interval</label>
        <select value={guessIntervalInSec} onChange={(e) => setGuessIntervalInSec(e.target.value)} id="intervalSelection" disabled={!!userGuess}>
          {GUESS_INTERVAL_OPTIONS_IN_SEC.map((val) => <option key={val} value={val}>{val} seconds</option>)}
        </select>
      </div>
      <div className='priceDisplay'>
        <p>Current BTC Price</p>
        <div className='currentPrice'>
          <span>{loading ? 'loading...' : `$${price}`}</span>
        </div>
      </div>
      <div className='scoreSection'>
        <div className='scoreCounter'>Score: {score === null ? 'getting score...' : score}</div>
        {
          userGuess ? 
          getGameLoadingTitle() :
          <p>Will Bitcoin price go Up or Down in next <span style={{fontWeight: 'bold'}}>{guessIntervalInSec} seconds</span>?</p>
        }
        <div className='guessButtons'>
        {
          !userGuess && 
          <>
            <button className='upButton' onClick={() => handleGuess(USER_GUESS.UP)} disabled={!!userGuess || !!loading}>UP</button>
            <button className='downButton' onClick={() => handleGuess(USER_GUESS.DOWN)} disabled={!!userGuess || !!loading}>DOWN</button>
          </>
        }
        </div>
      </div>
      {
        result.message && <GameResultToast result={result} oldPrice={oldPriceRef.current} newPrice={price} onClose={() => setResult(DEFAULT_RESULT)} />
      }
    </div>
  );
};

export default GameInterface;