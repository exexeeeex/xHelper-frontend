import { _apiConfig } from "@/shared/config";
import axios from "axios";

const baseApiUrl = `${_apiConfig.API_URL}tg/auth/`;

export const request = axios.create({
	baseURL: baseApiUrl,
});
