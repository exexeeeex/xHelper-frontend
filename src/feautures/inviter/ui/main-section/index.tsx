import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { type FC } from "react";
import { InviterChatsList } from "../chats-list";
import { FileInput, StringList } from "@/shared/components";
import styles from "./styles.module.scss";

type Props = {
	selectedChatId: number;
	selectChat: (chatId: string) => void;
	usersFromFile: string[] | null;
	getFromFile: any;
	handleFileChange: any;
	selectedFile: any;
	inviteAction: any;
};

export const InviterMainSection: FC<Props> = ({ selectChat, selectedChatId, usersFromFile, handleFileChange, inviteAction }) => {
	return (
		<Card style={{ flex: "1", maxHeight: "97vh" }}>
			<Box>
				<Flex
					gap={"10px"}
					direction={"column"}
				>
					<Text>Выберите чат для приглашения</Text>
					<InviterChatsList
						selectChat={selectChat}
						selectedChatId={selectedChatId?.toString()}
					/>
					<Flex
						align={"center"}
						justify={"between"}
					>
						<FileInput
							onChange={handleFileChange}
							accept={".txt,text/plain"}
						/>
						{usersFromFile && (
							<Button
								variant='surface'
								color='gray'
								style={{
									cursor: "pointer",
									transition: "0.2s linear",
									color: "var(--gray-1);",
								}}
								className={styles.button}
								onClick={inviteAction}
							>
								<Text style={{ color: "var(--blue-12)" }}>Пригласить</Text>
							</Button>
						)}
					</Flex>
					{usersFromFile && usersFromFile.length > 0 ? (
						<Box>
							<Text
								size='2'
								weight='bold'
								mb='2'
							>
								Найдены пользователи:
							</Text>
							<StringList
								items={usersFromFile}
								height={300}
								error={""}
							/>
						</Box>
					) : usersFromFile && usersFromFile.length === 0 ? (
						<Card>
							<Text color='gray'>Файл загружен, но пользователи не найдены</Text>
						</Card>
					) : null}
				</Flex>
			</Box>
		</Card>
	);
};
