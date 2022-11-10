import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = ({ searchResults }) => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }
    console.log('Movie List', searchResults)
    if (searchResults.length === 0) {
        return (
            <></>
        )
    }
    return (
        <div className="movie__list">
            <div className="list__cards">
                {
                    searchResults.map(movie => (
                        <Cards key={movie.imdbID} movieDetails={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList