import React, { useEffect, useState } from "react";
import "./PlaySection.css";
import { Link, useParams } from "react-router-dom";
import Cards from "../card/card";
import useAuth from "../../hooks/useAuth";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const PLAYLIST_URL = "/playlist";
const USER_URL = "/users";

const PlaySection = () => {
	const { auth } = useAuth();

	const [playlistName, setPlaylistName] = useState("");
	const [playlists, setPlaylists] = useState([""]);
	const axiosPrivate = useAxiosPrivate();
	const [tracker, setTracker] = useState(0);

	useEffect(() => {
		async function getUser() {
			console.log(auth.user);
			setTimeout(async () => {
				try {
					const response = await axiosPrivate.get(
						USER_URL + "/" + auth.user,
						{
							headers: { "Content-Type": "application/json" },
							withCredentials: true,
						}
					);
					console.log("yoyoy", response?.data);
					setPlaylists(response?.data?.playlists);
					console.log(auth.user);
					console.log("2====");
				} catch (error) {
					console.log(error);
					console.log("2====e");
				}
			}, 1);
		}
		console.log("1====");
		if (!(Object.keys(auth).length === 0)) {
			getUser();
		}
	}, [tracker]);

	const handleAddPlaylist = async (e) => {
		e.preventDefault();
		console.log(playlistName);
		console.log(playlistName);
		try {
			const username = auth.user;
			const response = await axiosPrivate.post(
				PLAYLIST_URL,
				JSON.stringify({ username, playlistname: playlistName }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			setTracker(tracker + 1);
			console.log("Tracker here", tracker);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		const id = e.target.id;
		console.log("id here", id);
		try {
			const username = auth.user;
			const playlistname = e.target.id;
			console.log(username, playlistname);
			console.log(
				"stringify thing here",
				JSON.stringify({ playlistname, username })
			);
			const response = await axiosPrivate.delete(PLAYLIST_URL, {
				data: { playlistname: playlistname, username: username },
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			setTracker(tracker + 1);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="playsection">
			{Object.keys(auth).length === 0 ? (
				<h1>Login to create playlist!</h1>
			) : (
				<>
					<header className="playheader">
						<h1>Create New Playlists here!</h1>
						<form id="new-task-form">
							<input
								type="text"
								name="new-task-input"
								id="new-task-input"
								placeholder="Enter a cool playlist name here!"
								onChange={(e) => {
									setPlaylistName(e.target.value);
									console.log(e.target.value);
								}}
								className="inputtask"
							/>
							<input
								type="submit"
								id="new-task-submit"
								className="taskbtn"
								value="Add Playlist"
								onClick={handleAddPlaylist}
							/>
						</form>
					</header>
					<main>
						<h1 className="mainh1">Your Playlists:</h1>

						{playlists.map((playname) => (
							<div
								key={playname}
								id="tasks"
								className="movielist"
							>
								<div class="task">
									<div class="content">
										<Link
											to={`/playlist/${playname}`}
											style={{
												textDecoration: "none",
												cursor: "pointer",
											}}
										>
											<input
												type="text"
												class="text inputtask"
												value={playname}
												readonly
											/>
										</Link>
									</div>
									<div class="actions">
										<button
											class="edit taskbtn"
											id={playname}
											onClick={handleDelete}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</main>
				</>
			)}
		</div>
	);
};

export default PlaySection;
