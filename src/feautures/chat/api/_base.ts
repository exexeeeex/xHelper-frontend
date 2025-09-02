import { _apiConfig } from "@/shared/config";
import axios from "axios";

const baseURL = `${_apiConfig.API_URL}chat`;

export const request = axios.create({
	baseURL: baseURL,
});
