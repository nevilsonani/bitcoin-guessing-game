export const saveScoreToLocalStorage = (score, key = 'userScore') => {
    try{
      localStorage.setItem(key, JSON.stringify(score));
    }catch(e){
      //Log the error
      return null
    }
  };
  
export const fetchScoreFromLocalStorage = (key='userScore') => {
  try{
    const score = localStorage.getItem(key);
    return score ? JSON.parse(score) : null;
  }catch(e){
    //Log the error
    return null
  }
};