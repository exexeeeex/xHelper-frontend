import { useAuthenticationStore } from "@/feautures/auth";
import { ChatList, useChatStore } from "@/feautures/chat";
import { useSessionStore } from "@/feautures/session";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { useEffect, type FC } from "react";
import styles from "./styles.module.scss";

export const Dashboard: FC = () => {
	const { adminChats, isAdminChatsLoading, getAdminedChats } = useChatStore();
	const { get, sessions } = useSessionStore();
	const { phoneNumber } = useAuthenticationStore();

	useEffect(() => {
		if (!phoneNumber) return;
		const fetchChats = setTimeout(async () => {
			await getAdminedChats(phoneNumber);
		}, 1000);
		return () => clearTimeout(fetchChats);
	}, [getAdminedChats, phoneNumber, get]);

	useEffect(() => {
		get();
	}, [get]);

	return (
		<main
			className={styles.section}
			style={{ height: "100%" }}
		>
			<Flex
				height='100%'
				direction='column'
				justify='between'
				gap='3'
			>
				<ChatList
					isLoading={isAdminChatsLoading}
					chats={adminChats ? adminChats : []}
					chatType='admin'
				/>
			</Flex>
			<Flex width={"500px"}>
				<Box
					width={"100%"}
					className={styles.section__sessions}
				>
					<Card style={{ maxHeight: "100px", height: "100%" }}>
						<Flex
							p={"4"}
							height={"100%"}
							direction={"column"}
							align={"center"}
							justify={"center"}
						>
							<Text
								size={"8"}
								weight={"bold"}
							>
								{sessions?.length}
							</Text>
							<Text size={"6"}>Активных аккаунта</Text>
						</Flex>
					</Card>
				</Box>
			</Flex>
		</main>
	);
};
