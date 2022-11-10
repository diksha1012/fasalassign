const Playlist = require("../model/Playlist");
const User = require("../model/User");

const getAllPlaylist = async (req, res) => {
	const playlist = await Playlist.find();
	if (!playlist)
		return res.status(204).json({ message: "No playlists found" });
	res.json(playlist);
};

const deletePlaylist = async (req, res) => {
	console.log(req);
	console.log("reacher here");
	const playlistname = req.body.playlistname;
	const username = req.body.username;
	console.log(playlistname, username);
	if (!playlistname || !username)
		return res
			.status(400)
			.json({ message: "Playlistname and username required" });
	const playlist = await Playlist.findOne({
		playlistname: req.body.playlistname,
	}).exec();
	if (!playlist) {
		return res.status(204).json({
			message: `Playlist name ${req.body.playlistname} not found`,
		});
	}
	const user = await User.findOne({ username: username });
	console.log("user", user);
	const res2 = User.updateOne(
		{ _id: user._id },
		{ $pull: { playlists: playlistname } }
	).exec();
	console.log("res2", res2);
	const result = await Playlist.deleteOne({
		playlistname: req.body.playlistname,
	});
	res.json(result);
};

const getPlaylist = async (req, res) => {
	// req.params.id is the playlistname (see routes/api/plalist.js for more info)
	if (!req?.params?.id)
		return res.status(400).json({ message: "Playlist Name required" });
	const playlist = await Playlist.findOne({
		playlistname: req.params.id,
	}).exec();
	if (!playlist) {
		return res
			.status(204)
			.json({ message: `Playlist ID ${req.params.id} not found` });
	}
	res.json(playlist);
};

const createPlaylist = async (req, res) => {
	const { playlistname, username } = req.body;
	console.log("Helloo", req.user);
	if (!playlistname || !username)
		return res
			.status(400)
			.json({ message: "Username and playlist name are required." });

	// check for duplicate usernames in the db
	const duplicate = await Playlist.findOne({ playlistname: username }).exec();
	if (duplicate) return res.sendStatus(409); //Conflict

	try {
		//create and store the new playlist
		const result1 = await Playlist.create({
			playlistname: playlistname,
			username: username,
			movies: [],
		});

		// update user to contain the playlist
		const user = await User.findOne({ username: username });
		user.playlists.push(playlistname);
		const result2 = await user.save();

		console.log(result1, result2);

		res.status(201).json({
			success: `New Playlist ${playlistname} created!`,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const addToPlaylist = async (req, res) => {
	if (!req?.params?.id)
		return res.status(400).json({ message: "Playlist name required" });
	const playlistname = req.params.id;
	const { imdbID } = req.body;
	if (!playlistname || !imdbID)
		return res.status(400).json({ message: "imdbID required." });

	try {
		const playlist = await Playlist.findOne({ playlistname: playlistname });
		playlist.movies.push(imdbID);
		const result = await playlist.save();

		console.log(result);

		res.status(201).json({
			success: `New Movie ${imdbID} added to ${playlistname}!`,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteMovie = async (req, res) => {
	// req at DELETE /playlist/:id (id of playlist)
	// req.body.imdbID is the song id to delete
	if (!req?.params?.id)
		return res.status(400).json({ message: "Movie imdbID required" });
	const imdbID = req.body.imdbID;
	const playlistname = req.params.id;
	try {
		// removing movie from the playlist
		const playlist = await Playlist.findOne({ playlistname: playlistname });
		playlist.update({ _id: playlist._id }, { $pull: { movies: imdbID } });
	} catch (e) {
		res.status(500).json({ message: err.message });
	}
};
// User (username, pswd, [playlistIDs])

module.exports = {
	getAllPlaylist,
	getPlaylist,
	deletePlaylist,
	createPlaylist,
	addToPlaylist,
	deleteMovie,
};
