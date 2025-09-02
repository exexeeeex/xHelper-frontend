import type { InviteResponse } from "@/entities/inviter";
import { create } from "zustand";
import { postInviterApi } from "../api";

const { inviteUsers } = postInviterApi;

interface InviterStoreState {
	results: InviteResponse | null;
	isLoading: boolean;
	inviteUser: (data: FormData) => Promise<void>;
}

export const useInviterStore = create<InviterStoreState>((set) => ({
	results: null,
	isLoading: false,
	inviteUser: async (data: FormData) => {
		set({ results: null, isLoading: true });
		try {
			const response = await inviteUsers(data);
			console.log("confirm");
			console.log(`RESPONSE: ${response}`);
			set({ results: response });
		} catch (err: any) {
			console.log(err);
		}
	},
}));
