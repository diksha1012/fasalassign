import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Movie = () => {
	const [currentMovieDetail, setMovie] = useState();
	const { id } = useParams();
	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const [playlist, setPlaylists] = useState([]);
	console.log(auth);
	useEffect(() => {
		getData();
		getPlay();
		window.scrollTo(0, 0);
	}, []);

	const getData = () => {
		fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => setMovie(data));
	};
	const getPlay = () => {
		if (!auth?.user) return;
		console.log("getPlay", auth);
		axiosPrivate
			.get("users/" + auth.user, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			})
			.then((response) => {
				console.log("yooy", response.data);
				setPlaylists(response.data.playlists);
			});
	};

	const handleAddMovie = async (e) => {
		const playlistname = e.target.id;
		const res = axiosPrivate.post(
			"playlist/" + playlistname,
			JSON.stringify({ imdbID: id }),
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		);
		console.log(res);
	};

	return (
		<div className="movie">
			<div className="movie__intro">
				<img
					className="movie__backdrop"
					src={`https://image.tmdb.org/t/p/original${
						currentMovieDetail
							? currentMovieDetail.backdrop_path
							: ""
					}`}
				/>
			</div>
			<div className="movie__detail">
				<div className="movie__detailLeft">
					<div className="movie__posterBox">
						<img
							className="movie__poster"
							src={`https://image.tmdb.org/t/p/original${
								currentMovieDetail
									? currentMovieDetail.poster_path
									: ""
							}`}
						/>
					</div>
				</div>
				<div className="movie__detailRight">
					<div className="movie__detailRightTop">
						<div className="movie__name">
							{currentMovieDetail
								? currentMovieDetail.original_title
								: ""}
						</div>
						<div className="movie__tagline">
							{currentMovieDetail
								? currentMovieDetail.tagline
								: ""}
						</div>
						<div className="movie__rating">
							{currentMovieDetail
								? currentMovieDetail.vote_average
								: ""}{" "}
							<i class="fas fa-star" />
							<span className="movie__voteCount">
								{currentMovieDetail
									? "(" +
									  currentMovieDetail.vote_count +
									  ") votes"
									: ""}
							</span>
						</div>
						<div className="movie__runtime">
							{currentMovieDetail
								? currentMovieDetail.runtime + " mins"
								: ""}
						</div>
						<div className="movie__releaseDate">
							{currentMovieDetail
								? "Release date: " +
								  currentMovieDetail.release_date
								: ""}
						</div>
						<div className="movie__genres">
							{currentMovieDetail && currentMovieDetail.genres
								? currentMovieDetail.genres.map((genre) => (
										<>
											<span
												className="movie__genre"
												id={genre.id}
											>
												{genre.name}
											</span>
										</>
								  ))
								: ""}
						</div>
					</div>
					<div className="movie__detailRightBottom">
						<div className="synopsisText">Synopsis</div>
						<div>
							{currentMovieDetail
								? currentMovieDetail.overview
								: ""}
						</div>
					</div>
				</div>
			</div>
			<div className="movie__links">
				<div className="movie__heading">Useful Links</div>
				<div class="dropdown">
					<button class="dropbtn">Dropdown</button>
					<div class="dropdown-content">
						{playlist.map((playname) => (
							<a href="#" id={playname} onClick={handleAddMovie}>
								{playname}
							</a>
						))}
					</div>
				</div>
			</div>
			<div className="movie__heading">Production companies</div>
			<div className="movie__production">
				{currentMovieDetail &&
					currentMovieDetail.production_companies &&
					currentMovieDetail.production_companies.map((company) => (
						<>
							{company.logo_path && (
								<span className="productionCompanyImage">
									<img
										className="movie__productionComapany"
										src={
											"https://image.tmdb.org/t/p/original" +
											company.logo_path
										}
									/>
									<span>{company.name}</span>
								</span>
							)}
						</>
					))}
			</div>
		</div>
	);
};

export default Movie;
