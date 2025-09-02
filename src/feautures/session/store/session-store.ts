import { create } from "zustand";
import { getSessionApi } from "../api";

const { getSessions } = getSessionApi;

interface SessionStoreState {
	sessions: string[] | null;
	isLoading: boolean;
	get: () => Promise<void>;
}

export const useSessionStore = create<SessionStoreState>((set) => ({
	sessions: null,
	isLoading: false,
	get: async () => {
		set({ isLoading: true });
		try {
			const response = await getSessions();
			console.log(response);
			set({ sessions: response, isLoading: false });
		} catch (err: any) {
			return err;
		}
	},
}));
