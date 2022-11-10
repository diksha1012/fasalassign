const express = require("express");
const router = express.Router();
// const usersController = require("../../controllers/usersController");
const playlistController = require("../../controllers/playlistController");

router
	.route("/")
	.get(playlistController.getAllPlaylist)
	.delete(playlistController.deletePlaylist)
	.post(playlistController.createPlaylist)

router.route("/:id")
	.post(playlistController.addToPlaylist)
	.get(playlistController.getPlaylist)
	.delete(playlistController.deleteMovie)


module.exports = router;