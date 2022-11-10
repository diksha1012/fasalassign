import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
	const { auth, setAuth } = useAuth();

	const refresh = async () => {
		const response = await axios.get("/refresh", {
			withCredentials: true,
		});
		console.log("useRefreshtoken.js auth", auth);
		setAuth((prev) => {
			console.log("useRefreshtoken.js", prev);
			console.log(JSON.stringify(prev));
			console.log(response.data.accessToken);
			return {
				...prev,
				accessToken: response.data.accessToken,
				user: response.data.user,
			};
		});
		return response.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
