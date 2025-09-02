import { request } from "./_base";

const getSessions = async () => {
	const response = await request.get("sessions");
	return response.data;
};

export const getSessionApi = {
	getSessions,
};
