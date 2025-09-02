export interface UserParseRequest {
	phoneNumber: string;
	phoneNumbers: File;
}

export interface UserParseResponse {
	phoneNumber: string;
	username: string;
	avatar?: string;
	userId: number;
	found: boolean;
}
