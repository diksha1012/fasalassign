import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRightFromBracket, fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import icn from "./Fasal-logos_white_short.png";

library.add(fas, faTwitter, faFontAwesome);

const Header = ({ setSearchResults }) => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const logout = async () => {
		// if used in more components, this should be in context
		// axios to /logout endpoint
		setAuth({});
		navigate("/");
	};

	let ret;
	if (!(Object.keys(auth).length === 0)) {
		ret = (
			<div className="header">
				<div className="headerLeft">
					<Link to="/">
						<img className="header__icon" src={icn} alt="logo" />
					</Link>
					<Link
						to="/movies/upcoming"
						style={{ textDecoration: "none" }}
					>
						<span>Playlists</span>
					</Link>
				</div>
				<div className="headerRight">
					<SearchBar setSearchResults={setSearchResults} />
					<Link to="/" style={{ textDecoration: "none" }}>
						<span>{auth.user}</span>
					</Link>
					<button className="linkbutton" onClick={logout}>
						<span>LogOut</span>
					</button>
				</div>
			</div>
		);
	} else {
		ret = (
			<div className="header">
				<div className="headerLeft">
					<Link to="/">
						<img className="header__icon" src={icn} />
					</Link>
				</div>
				<div className="headerRight">
					<SearchBar setSearchResults={setSearchResults} />
					<Link to="/login" style={{ textDecoration: "none" }}>
						<span>Log In</span>
					</Link>
					<Link to="/register" style={{ textDecoration: "none" }}>
						<span>Sign Up</span>
					</Link>
					<FontAwesomeIcon icon={faRightFromBracket} />
				</div>
			</div>
		);
	}
	return ret;
};

export default Header;
