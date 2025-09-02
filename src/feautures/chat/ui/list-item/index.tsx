import type { ChatResponse } from "@/entities/chat";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import type { FC } from "react";
import styles from "./styles.module.scss";

type Props = {
	chat: ChatResponse;
};

export const ChatListItem: FC<Props> = ({ chat }) => (
	<Box
		onClick={() => console.log(chat.id)}
		className={styles.card}
	>
		<Card
			className={styles.card__main}
			variant='ghost'
		>
			<Flex
				className={styles.card__main__flex}
				gap={"2"}
				align={"center"}
				width={"100%"}
			>
				<Box>
					<Avatar
						fallback={chat.title.slice(0, 1)}
						src={`data:image/png;base64,${chat.photo}`}
					/>
				</Box>
				<Box>
					<Text>{chat.title}</Text>
				</Box>
			</Flex>
		</Card>
	</Box>
);
