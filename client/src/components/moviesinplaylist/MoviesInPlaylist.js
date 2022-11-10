import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneMovie } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Cards from "../card/card";

const MoviesInPlaylist = () => {
	const [movieList, setMovieList] = useState([]);
	const [finalList, setFinalList] = useState([]);
	const { playlistname } = useParams();
	const axiosPrivate = useAxiosPrivate();
	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await axiosPrivate.get("playlist/" + playlistname, {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		});
		console.log("yooy", response.data);
		setMovieList(response.data.movies);
		console.log("wow", movieList);

		let temp,
			retArray = [];
		for (
			let i = 0;
			i < Math.min(Number(response.data.movies.length));
			i++
		) {
			temp = await getOneMovie(response.data.movies[i]);
			console.log("Temp ", temp);
			// console.log('Temp ', temp)
			retArray.push(temp);
		}
		setFinalList(retArray);
	};
	return (
		<div className="movie__list">
			<div className="list__cards">
				{finalList.map((movie) => (
					<Cards key={movie.imdbID} movieDetails={movie} />
				))}
			</div>
		</div>
	);
};

export default MoviesInPlaylist;
