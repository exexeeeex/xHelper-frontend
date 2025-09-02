import type { InviteResponse } from "@/entities/inviter";
import { request } from "./_base";

const inviteUsers = async (data: FormData): Promise<InviteResponse> => {
	const response = await request.post("invite", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

export const postInviterApi = {
	inviteUsers,
};
