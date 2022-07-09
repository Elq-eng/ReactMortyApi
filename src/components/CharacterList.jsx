import React, {useEffect, useState} from 'react';
import Character from './Character';


const NavPage = (props) => {
  return(
    <header className='d-flex justify-content-between align-items-center'>
      <p>Page : {props.page}</p>
      <button className="btn btn-primary btn-sm" onClick = {() => props.setPage(props.page + 1)}>
        Page {props.page +1}
      </button>
    </header>
  )
}



const CharacterList = () => {

  // variables 
  const [getCharacters, setCharacters] = useState([]);
  const [getLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      const data = await response.json()
      console.log(data.results)
      setLoading(false)
      setCharacters(data.results)
    }
    fetchData()
  }, [page])


  return (
    <>
      <div className="container">
        <NavPage page = {page} setPage = {setPage}/>
        {
          getLoading ? (<h1> Loading... </h1>) : <div className="row">
          {
            getCharacters.map((character) => (
              <div className="col-md-4" key = {character.id}>
                <Character   character = {character}/>
              </div>
            ))
          }
        </div>
        }
        <NavPage page = {page} setPage = {setPage}/>
      </div>

    </>
  )
}

export default CharacterList