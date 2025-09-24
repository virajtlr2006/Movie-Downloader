import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Singlemovie = () => {
    const [movie, setmovie] = useState(null)
    useEffect(() => {
     getmovie()
      
    }, [])
    
    const {id} = useParams()
    const getmovie = async () => {
        const api = await axios.get(`http://localhost:8080/movie/${id}`)
        console.log(api.data.singlemovie);
        setmovie(api.data.singlemovie)
        
    }
  return (
    <div>
  {movie && <>
    <p>{movie.title}</p>
    <p>{movie.description}</p>
    <img src={movie.poster}></img>
    <p>{movie.rating}</p>
  </>}
    </div>
  )
}

export default Singlemovie
