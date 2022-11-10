const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
	playlistname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	movies: {
		type: [String]
	},
});

module.exports = mongoose.model("Playlist", playlistSchema);
