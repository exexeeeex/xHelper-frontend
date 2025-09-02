import type { AuthenticationRequest, VerifyCodeRequest } from "@/entities/auth";
import { request } from "./_base";

const login = async (data: AuthenticationRequest) => {
	const response = await request.post("login", {
		phoneNumber: data.phoneNumber,
	});
	return response.data;
};

const verifyCode = async (data: VerifyCodeRequest) => {
	const response = await request.post("verify", data);
	return response.data;
};

const verifyPassword = async (data: AuthenticationRequest) => {
	const response = await request.post("password", data);
	return response.data;
};

export const postAuthenticationApi = {
	login,
	verifyCode,
	verifyPassword,
};
