import type { ChatResponse } from "@/entities/chat";
import { Box, Card, Flex, ScrollArea, Skeleton, Text } from "@radix-ui/themes";
import type { FC } from "react";
import { ChatListItem } from "../list-item";
import styles from "./styles.module.scss";

type Props = {
	chats: ChatResponse[];
	isLoading: boolean;
	chatType: "admin" | "all";
};

export const ChatList: FC<Props> = ({ chats, isLoading, chatType }) =>
	!isLoading ? (
		<Card
			style={{
				overflow: "auto",
				flex: 1,
				display: "flex",
				flexDirection: "column",
			}}
			className={styles.list}
		>
			<Text
				size={"5"}
				weight={"medium"}
			>
				{chatType === "admin" ? "Чаты с правами администратора" : "Все чаты"}
			</Text>
			<ScrollArea
				scrollbars='vertical'
				style={{
					overflow: "hidden",
					flex: 1, // ScrollArea будет занимать оставшееся пространство
				}}
			>
				<Box
					pr={"10px"}
					style={{ display: "flex" }}
					className={styles.list__chats}
				>
					{chats.length >= 1 ? (
						chats.map((chat) => (
							<ChatListItem
								key={chat.id}
								chat={chat}
							/>
						))
					) : (
						<Text>Вы не являетесь администратором в каких-либо чатах</Text>
					)}
				</Box>
			</ScrollArea>
		</Card>
	) : (
		<Card
			className={styles.list}
			style={{ flex: 1 }} // Для состояния загрузки тоже добавляем flex
		>
			<Flex
				gap={"5px"}
				direction={"column"}
			>
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton
						key={index}
						style={{ width: "400px", height: "50px" }}
					>
						Loading...
					</Skeleton>
				))}
			</Flex>
		</Card>
	);
