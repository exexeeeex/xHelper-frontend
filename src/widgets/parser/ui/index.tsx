import { useAuthenticationStore } from "@/feautures/auth";
import { ParserNumberSection } from "@/feautures/parser";
import { callToast } from "@/feautures/toast";
import { useUserParseStore } from "@/feautures/user";
import { Flex } from "@radix-ui/themes";
import { useState, type FC } from "react";

export const Parser: FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [phoneNumbers, setPhoneNumbers] = useState<string[] | null>();

	const { getByNumbers, usersByNumbers, isLoadingUsersByNumber } = useUserParseStore();
	const { phoneNumber } = useAuthenticationStore();

	const readFileAsText = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const content = e.target?.result as string;
				resolve(content);
			};
			reader.onerror = (error) => reject(error);
			reader.readAsText(file);
		});
	};

	const parsePhoneNumbers = (text: string): string[] => {
		const cleanedText = text.replace(/[^\d\n]/g, "");

		return cleanedText
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.length > 0);
	};

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
				const text = await readFileAsText(file);
				const numbers = parsePhoneNumbers(text);
				setPhoneNumbers(numbers);
				console.log(numbers);
			} catch (err: any) {
				callToast("error", err);
			}
		}
	};

	const handleSubmitParse = async () => {
		try {
			const formData = new FormData();
			if (!phoneNumber || !phoneNumbers || !selectedFile) {
				callToast("error", "Произошла ошибка при отправке!");
				return;
			}
			formData.append("PhoneNumber", phoneNumber);
			formData.append("PhoneNumbers", selectedFile);
			const response = await getByNumbers(formData);
			console.log(response);
		} catch (err: any) {
			callToast("error", "Error!");
			console.log(err);
		}
	};

	return (
		<main style={{ width: "100%" }}>
			<Flex width={"100%"}>
				<ParserNumberSection
					fileChange={handleFileChange}
					usersByNumbers={usersByNumbers}
					isLoadingUsersByNumber={isLoadingUsersByNumber}
					numbers={phoneNumbers ? phoneNumbers : null}
					accept={handleSubmitParse}
				/>
			</Flex>
		</main>
	);
};
