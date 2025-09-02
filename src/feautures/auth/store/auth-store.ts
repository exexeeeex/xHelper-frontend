import { LoginStates, type AuthenticationRequest, type VerifyCodeRequest } from "@/entities/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postAuthenticationApi } from "../api";
import { callToast } from "@/feautures/toast";

const { login, verifyCode, verifyPassword } = postAuthenticationApi;

interface AuthenticationStoreState {
	phoneNumber: string | null;
	isAuthenticated: boolean;
	error: string | null;
	login: (data: AuthenticationRequest) => Promise<void | string>;
	verifyCode: (data: VerifyCodeRequest) => Promise<void>;
	verifyPassword: (data: AuthenticationRequest) => Promise<void>;
	logout: () => void;
}

export const useAuthenticationStore = create<AuthenticationStoreState>()(
	persist(
		(set) => ({
			phoneNumber: null,
			isAuthenticated: false,
			error: null,
			login: async (data: AuthenticationRequest) => {
				try {
					const response = await login(data);
					let state;
					if (response.state == LoginStates.success_login) {
						set({
							phoneNumber: data.phoneNumber,
							isAuthenticated: true,
						});
						callToast("access", "Вход в аккаунт выполнен успешно!");
					} else if (response.state == LoginStates.codeVerify) {
						state = LoginStates.codeVerify;
						return state;
					}
					return state!;
				} catch (err: any) {
					if (err.response.data.message === "Login failed: FLOOD_WAIT_X") return "open_vid_dance_kid";
					set({ error: err.response.data.message });
				}
			},
			verifyCode: async (data: VerifyCodeRequest) => {
				try {
					const response = await verifyCode(data);
					set({
						phoneNumber: data.phoneNumber,
						isAuthenticated: true,
					});
					callToast("access", "Вход в аккаунт выполнен успешно!");
					return response;
				} catch (err: any) {
					set({ error: err.response.data.message });
					callToast("error", err.response.data.message);
				}
			},
			verifyPassword: async (data: AuthenticationRequest) => {
				try {
					const response = await verifyPassword(data);
					set({
						phoneNumber: data.phoneNumber,
						isAuthenticated: true,
					});
					callToast("access", "Вход в аккаунт выполнен успешно!");
					return response;
				} catch (err: any) {
					set({ error: err.response.data.message });
				}
			},
			logout: () =>
				set({
					phoneNumber: null,
					isAuthenticated: false,
				}),
		}),
		{
			name: "authentication-storage",
			storage: {
				getItem: (name) => {
					const str = localStorage.getItem(name);
					if (!str) return null;
					return JSON.parse(str);
				},
				setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
				removeItem: (name) => localStorage.removeItem(name),
			},
		},
	),
);
