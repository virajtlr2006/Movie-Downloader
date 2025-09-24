import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Usermovies = () => {

  const [allmovies, setallmovies] = useState(null)

  useEffect(() => {
    getmovies()
  
   
  }, [])
  
  const getmovies = async () => {
    const api = await axios.post("http://localhost:8080/movie/userallmovie",{
      "token":localStorage.getItem("token")
    })
    console.log(api);
    setallmovies(api.data.movies)
  }
  return (
    <div>
     {
      allmovies && allmovies.map(  (movie) => <>
      <img src={movie.poster} alt="" />
      </>)
     }
    </div>
  )
}

export default Usermovies
