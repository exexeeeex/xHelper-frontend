import type { ChatResponse } from "@/entities/chat";
import { create } from "zustand";
import { getChatApi } from "../";

const { getAdminedChats, getAllChats } = getChatApi;

interface ChatStoreState {
	adminChats: ChatResponse[] | null;
	allChats: ChatResponse[] | null;
	error: string | null;
	isAdminChatsLoading: boolean;
	isAllChatsLoading: boolean;
	getAdminedChats: (phoneNumber: string) => Promise<void>;
	getAll: (phoneNumber: string) => Promise<void>;
}

export const useChatStore = create<ChatStoreState>((set) => ({
	adminChats: null,
	allChats: null,
	error: null,
	isAdminChatsLoading: false,
	isAllChatsLoading: false,
	getAdminedChats: async (phoneNumber: string) => {
		set({ isAdminChatsLoading: true });
		try {
			const data = await getAdminedChats(phoneNumber);
			set({ adminChats: data, isAdminChatsLoading: false, error: null });
		} catch (err: any) {
			set({ error: err });
		}
	},
	getAll: async (phoneNumber: string) => {
		set({ isAllChatsLoading: true });
		try {
			const data = await getAllChats(phoneNumber);
			set({ allChats: data, isAllChatsLoading: false, error: null });
		} catch (err: any) {
			set({ error: err });
		}
	},
}));
