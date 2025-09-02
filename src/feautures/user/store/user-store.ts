import type { UserInfo } from "@/entities/user";
import { create } from "zustand";
import { getUserApi } from "../api";

const { getUserInfo, getUsersFromFile } = getUserApi;

interface UserStoreState {
	user: UserInfo | null;
	usersFromFile: string[] | null;
	error: string | null;
	isLoading: boolean;
	getInfo: (phoneNumber: string) => Promise<void>;
	getFromFile: (data: FormData) => Promise<void>;
}

export const useUserStore = create<UserStoreState>((set) => ({
	user: null,
	error: null,
	isLoading: false,
	usersFromFile: null,
	getInfo: async (phoneNumber: string) => {
		set({ error: null, isLoading: true });
		try {
			const response = await getUserInfo(phoneNumber);
			set({ user: response, error: null, isLoading: false });
		} catch (err: any) {
			set({ error: err, isLoading: false });
		}
	},
	getFromFile: async (data: FormData) => {
		set({ usersFromFile: null });
		try {
			const response = await getUsersFromFile(data);
			set({ usersFromFile: response });
		} catch (err: any) {
			set({ error: err });
		}
	},
}));
