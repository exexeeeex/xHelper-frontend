import type { UserParseResponse } from "@/entities/user/models";
import { request } from "./_base";

const getUsersByNumbers = async (data: FormData): Promise<UserParseResponse[]> => {
	const response = await request.post("user/get-users-by-numbers", data);
	return response.data;
};

const saveUsernames = async (usernames: string[]): Promise<void> => {
	await request.post(`user/save-usernames`, usernames);
};

const saveUsersIds = async (ids: number[]): Promise<void> => {
	await request.post(`user/save-ids`, ids);
};

export const postUserApi = {
	getUsersByNumbers,
	saveUsernames,
	saveUsersIds,
};
