import type { ChatResponse } from "@/entities/chat";
import { request } from "./_base";

const getAdminedChats = async (phoneNumber: string): Promise<ChatResponse[]> => {
	const response = await request.get(`get-admined-chats?phoneNumber=${phoneNumber}`);
	return response.data;
};

const getAllChats = async (phoneNumber: string): Promise<ChatResponse[]> => {
	const response = await request.get(`get-all-chats?phoneNumber=${phoneNumber}`);
	return response.data;
};

export const getChatApi = {
	getAdminedChats,
	getAllChats,
};
