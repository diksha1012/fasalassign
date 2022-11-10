import axios from "axios";
let BASE_URL = "http://localhost:3500";
const OMDB_API = "https://www.omdbapi.com";
const OMDB_API_KEY = "a6c35cd0";

if (process.env.AB === "prod") {
	BASE_URL =
		"https://70a3-2405-201-4014-da9c-34ba-e5d8-88d2-ad35.in.ngrok.io/";
}
export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

export const omdbApi = axios.create({
	baseURL: OMDB_API,
	headers: { "Content-Type": "application/json" },
});

export const getMovies = async (title) => {
	const response = await omdbApi.get("/", {
		params: {
			apiKey: OMDB_API_KEY,
			s: title,
		},
	});
	console.log("aajaaa       ", response.data);
	return response.data;
};

export const getOneMovie = async (title) => {
	const response = await omdbApi.get("/", {
		params: {
			apiKey: OMDB_API_KEY,
			i: title,
		},
	});
	console.log("aajaaa       ", response.data);
	return response.data;
};
