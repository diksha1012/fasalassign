import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import "./SearchBar.css"
import { getMovies, getOneMovie } from "../../api/axios"

const SearchBar = ({ setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = async (e) => {
        if (!e.target.value) return setSearchResults([])
        let res = await getMovies(e.target.value)
        let retArray = []
        let temp
        for (let i = 0; i < Math.min(10, Number(res.totalResults)); i++) {
            temp = await getOneMovie(res.Search[i].imdbID)
            console.log('Temp ', temp)
            // console.log('Temp ', temp)
            retArray.push(temp)
        }
        if (res.Response === 'False') {
            return setSearchResults([])
        }
        // const resultsArray = res.filter(movie => movie.title.includes(e.target.value) || movie.body.includes(e.target.value))
        setSearchResults(retArray)
    }

    return (
        <header className="test">
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className="search__input"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                />
            </form>
        </header>
    )
}
export default SearchBar