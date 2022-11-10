const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const foundUser = await User.findOne({ refreshToken }).exec();
	if (!foundUser) return res.sendStatus(403); //Forbidden
	// evaluate jwt
	console.log("totot");
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || foundUser.username !== decoded.username) {
				console.log("Why here");
				return res.sendStatus(403);
			}
			const accessToken = jwt.sign(
				{
					UserInfo: {
						username: decoded.username,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "1d" }
			);
			res.json({ accessToken, user: foundUser.username });
		}
	);
};

module.exports = { handleRefreshToken };