import {useQuery} from '@tanstack/react-query'

import './App.css'
const getRandoNumberFromApi =async () :Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
  const numberString = await res.text();
  
  // throw new Error("Auxilioo!");
  return +numberString;
}

function App() {
 const query = useQuery(
  ['randomNumber'],
  getRandoNumberFromApi,
  
 );
  
  return (
  <div>
    {
    query.isFetching 
      ? ( <h2>Cargando...</h2>)
      : (<h2>Número aleatorio: {query.data} </h2>)
    }
    {
      !query.isLoading && query.isError && <h3> {`${ query.isError }`}</h3>
    }
    <button onClick={() => query.refetch()} disabled={query.isFetching}>
      {query.isFetching ? '...' :'Nuevo número' }
      </button>
  </div>
  )
}

export default App
