import type { UserParseResponse } from "@/entities/user/models";
import { create } from "zustand";
import { postUserApi } from "..";
import { callToast } from "@/feautures/toast";

const { getUsersByNumbers } = postUserApi;

interface UserParseStoreState {
	usersByNumbers: UserParseResponse[] | null;
	isLoadingUsersByNumber: boolean | null;
	getByNumbers: (data: FormData) => Promise<void>;
}

export const useUserParseStore = create<UserParseStoreState>((set) => ({
	usersByNumbers: null,
	isLoadingUsersByNumber: null,
	getByNumbers: async (data: FormData) => {
		set({ isLoadingUsersByNumber: true });
		try {
			const response = await getUsersByNumbers(data);
			set({ isLoadingUsersByNumber: null, usersByNumbers: response });
		} catch (err: any) {
			callToast("error", `Ошибка при парсиге: ${JSON.stringify(err)}`);
		}
	},
}));
