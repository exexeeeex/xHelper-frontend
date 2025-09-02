import { useAuthenticationStore } from "@/feautures/auth";
import { useChatStore } from "@/feautures/chat";
import { Box, Flex, RadioCards, Skeleton, Text } from "@radix-ui/themes";
import { useEffect, type FC } from "react";
import styles from "./styles.module.scss";

type Props = {
	selectedChatId: string;
	selectChat: (chatId: string) => void;
};

export const InviterChatsList: FC<Props> = ({ selectChat, selectedChatId }) => {
	const { getAdminedChats, adminChats, isAdminChatsLoading } = useChatStore();
	const { phoneNumber } = useAuthenticationStore();

	useEffect(() => {
		if (!phoneNumber || adminChats !== null) return;
		const getChats = setTimeout(async () => {
			await getAdminedChats(phoneNumber);
		}, 1000);

		return () => clearTimeout(getChats);
	}, [phoneNumber, adminChats, getAdminedChats]);

	return !isAdminChatsLoading ? (
		<Box width={"100%"}>
			<Flex
				direction={"column"}
				width={"100%"}
			>
				<RadioCards.Root
					onValueChange={selectChat}
					value={selectedChatId.toString() || ""}
				>
					{adminChats && adminChats?.length >= 1 ? (
						adminChats.map((chat) => (
							<RadioCards.Item
								style={{
									cursor: "pointer",
									textAlign: "center",
									flex: "1",
								}}
								className={styles.card}
								key={chat.id}
								value={chat.id.toString()}
							>
								<Text>{chat.title}</Text>
							</RadioCards.Item>
						))
					) : (
						<Text>Чатов нет!</Text>
					)}
				</RadioCards.Root>
			</Flex>
		</Box>
	) : (
		<Box
			style={{ padding: "10px 0" }}
			width={"100%"}
		>
			<Flex
				direction={"column"}
				width={"100%"}
			>
				<RadioCards.Root defaultValue={adminChats ? adminChats[0].id.toString() : "null"}>
					{Array.from({ length: 4 }).map((_, index) => (
						<Skeleton
							key={index}
							style={{ width: "400px", height: "50px" }}
						>
							Loading...
						</Skeleton>
					))}
				</RadioCards.Root>
			</Flex>
		</Box>
	);
};
