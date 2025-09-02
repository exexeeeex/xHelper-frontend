import type { InviteResult } from "./invite-result";

export interface InviteResponse {
	success: boolean;
	message?: string;
	total: number;
	successful: number;
	failed: number;
	results: InviteResult[];
}
