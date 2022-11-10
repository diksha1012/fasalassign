import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/movie";
import { useState } from "react";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import PersistLogin from "./components/PersitLogin";
import MoviesInPlaylist from "./components/moviesinplaylist/MoviesInPlaylist";

function App() {
	const [searchResults, setSearchResults] = useState([]);
	console.log("App ", searchResults);
	return (
		<div className="App">
			<Router>
				<Header setSearchResults={setSearchResults} />
				<Routes>
					<Route path="login/" element={<Login />}></Route>
					<Route path="register/" element={<Register />}></Route>
					<Route element={<PersistLogin />}>
						<Route
							index
							element={<Home searchResults={searchResults} />}
						></Route>
						<Route path="movie/:id" element={<Movie />}></Route>
						<Route
							path="movies/:type"
							element={<MovieList />}
						></Route>
						<Route
							path="playlist/:playlistname"
							element={<MoviesInPlaylist />}
						></Route>
					</Route>
					<Route path="/*" element={<h1>Error Page</h1>}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
