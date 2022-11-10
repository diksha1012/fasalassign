import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "./card.css"
import { Link } from "react-router-dom"
import { getOneMovie } from "../../api/axios"

const Cards = ({movieDetails}) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [])
    console.log("======================")
    console.log(movieDetails)

    return <>
    {
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        <Link to={`/movie/${movieDetails.imdbID}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" src={`${movieDetails.Poster}`} />
                <div className="cards__overlay">
                    <div className="card__title">{movieDetails?movieDetails.Title:""}</div>
                    <div className="card__runtime">
                        {movieDetails?movieDetails.Released:""}
                        <span className="card__rating">{movieDetails?movieDetails.imdbRating:""}<i className="fas fa-star" /></span>
                    </div>
                    <div className="card__description">{movieDetails?movieDetails.Plot.slice(0,118)+"...": ""}</div>
                </div>
            </div>
        </Link>
    }
    </>
}

export default Cards