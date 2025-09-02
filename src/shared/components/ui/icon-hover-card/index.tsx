import { HoverCard, Text } from "@radix-ui/themes";
import type { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

export const IconHoverCard: FC<{ icon: ReactNode; text: string; action?: any }> = ({ icon, text, action }) => (
	<HoverCard.Root>
		<HoverCard.Trigger>
			<button
				onClick={action ? action : undefined}
				className={styles.icon}
				style={{ outline: "none", border: "none", backgroundColor: "transperent", cursor: "pointer" }}
			>
				{icon}
			</button>
		</HoverCard.Trigger>
		<HoverCard.Content size='1'>
			<Text size='2'>{text}</Text>
		</HoverCard.Content>
	</HoverCard.Root>
);
