import { _apiConfig } from "@/shared/config";
import axios from "axios";

const baseURL = `${_apiConfig.API_URL}`;

export const request = axios.create({
	baseURL: baseURL,
});
