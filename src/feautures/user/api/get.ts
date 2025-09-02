import type { UserInfo } from "@/entities/user";
import { request } from "./_base";

const getUserInfo = async (phoneNumber: string): Promise<UserInfo> => {
	const response = await request.post("tg/get-user-info", {
		phoneNumber: phoneNumber,
	});
	return response.data;
};

const getUsersFromFile = async (data: FormData): Promise<string[]> => {
	const response = await request.post("tg/users", data);
	return response.data;
};

export const getUserApi = {
	getUserInfo,
	getUsersFromFile,
};
