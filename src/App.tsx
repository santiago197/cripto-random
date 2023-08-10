import { useEffect, useState, useReducer } from 'react'

import './App.css'
const getRandoNumberFromApi =async () :Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
  const numberString = await res.text();
  
  // throw new Error("Auxilioo!");
  return +numberString;
}

function App() {
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [key, forceRefetch] = useReducer((x) => x + 1, 0)

  
  useEffect(() => {
    setIsLoading(true)
    getRandoNumberFromApi()
    .then( setNumber)
    .catch(error => setError(error.message))
  }, [key]);
  useEffect(() => {
    if(number) setIsLoading(false);
  }, [number])

  useEffect(() => {
    if(error) setIsLoading(false);
  }, [error])
  
  
  return (
  <div>
    {
    isLoading 
      ? ( <h2>Cargando...</h2>)
      : (<h2>Número aleatorio: {number} </h2>)
    }
    {
      !isLoading && error && <h3> {error}</h3>
    }
    <button onClick={forceRefetch} disabled={isLoading}>
      {isLoading ? '...' :'Nuevo número' }
      </button>
  </div>
  )
}

export default App
