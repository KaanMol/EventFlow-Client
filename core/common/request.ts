import axios from "axios";
import { Storage } from "./storage";

const request = axios.create({
	baseURL: 'http://localhost:3000',
});

// Inject access token in every api request
request.interceptors.request.use(async (config) => {
	const accessToken = await Storage.getItem("access_token")

	if (accessToken) {
		config.headers = config.headers || {};

		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config;
})