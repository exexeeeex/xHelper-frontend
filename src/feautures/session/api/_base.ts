import { _apiConfig } from "@/shared/config";
import axios from "axios";

const baseUrl = `${_apiConfig.API_URL}tg`;

export const request = axios.create({
	baseURL: baseUrl,
});
