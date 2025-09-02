import { Box, Card, Code, Flex, ScrollArea, Text } from "@radix-ui/themes";
import type { FC } from "react";

type Props = {
	items: string[];
	height: number;
	error: string;
};

export const StringList: FC<Props> = ({ items, height, error }) =>
	items.length >= 1 ? (
		<Box>
			<Card>
				<ScrollArea style={{ height: `${height}px` }}>
					<Flex
						pr={"3"}
						direction='column'
						gap='2'
					>
						{items.map((item) => (
							<Code
								color='cyan'
								key={item}
							>
								{item}
							</Code>
						))}
					</Flex>
				</ScrollArea>
			</Card>
		</Box>
	) : (
		<Text>{error}</Text>
	);
