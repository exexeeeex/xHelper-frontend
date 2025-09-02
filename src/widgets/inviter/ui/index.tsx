import { useAuthenticationStore } from "@/feautures/auth";
import { InviterMainSection, InviterResultSection, useInviterStore } from "@/feautures/inviter";
import { callToast } from "@/feautures/toast";
import { useUserStore } from "@/feautures/user";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";

export const Inviter = () => {
	const [selectedChatId, setSelectedChatId] = useState<number>(1);
	const [selectedFile, setSelectedFile] = useState<File>();
	const [isSendedForm, setIsSendedForm] = useState<boolean>(false);

	const { usersFromFile, getFromFile } = useUserStore();
	const { results, inviteUser } = useInviterStore();
	const { phoneNumber } = useAuthenticationStore();

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type !== "text/plain" && !file.name.endsWith(".txt")) {
			callToast("error", "Загрузите .txt файл.");
			event.target.value = "";
			return;
		}

		if (file) {
			setSelectedFile(file);
			const formData = new FormData();
			formData.append("file", file);

			try {
				await getFromFile(formData);
			} catch (err: any) {
				callToast("error", err);
			}
		}
	};

	const handleSelectChat = async (chatId: string) => {
		setSelectedChatId(Number(chatId));
	};

	const handleSubmit = async () => {
		if (!phoneNumber || !selectedFile) return;

		const formData = new FormData();
		formData.append("PhoneNumber", phoneNumber);
		formData.append("ChatId", selectedChatId.toString());
		formData.append("File", selectedFile);

		console.log("FormData содержимое:");
		console.log(selectedChatId.toString());

		setIsSendedForm(true);
		try {
			await inviteUser(formData);
		} catch (err: any) {
			console.log(err);
		}
	};

	return (
		<main style={{ width: "100%" }}>
			<Flex
				wrap={"wrap"}
				gap={"10px"}
			>
				<InviterMainSection
					inviteAction={handleSubmit}
					selectedChatId={selectedChatId}
					selectChat={handleSelectChat}
					usersFromFile={usersFromFile}
					getFromFile={getFromFile}
					handleFileChange={handleFileChange}
					selectedFile={selectedFile}
				/>
				{results && (
					<InviterResultSection
						isSended={isSendedForm}
						results={results ? results : null}
					/>
				)}
			</Flex>
		</main>
	);
};
