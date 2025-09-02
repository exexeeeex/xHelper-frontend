import type { InviteResponse } from "@/entities/inviter";
import { Badge, Box, Card, Flex, ScrollArea, Spinner, Text } from "@radix-ui/themes";
import type { FC } from "react";

type Props = {
	results: InviteResponse | null;
	isSended: boolean;
};

export const InviterResultSection: FC<Props> = ({ results, isSended }) => {
	return (
		<Card style={{ flex: "1", width: "100%" }}>
			<Box>
				{isSended ? (
					results ? (
						<Box>
							{results.success ? (
								<Badge
									style={{ fontSize: "20px", padding: "5px" }}
									variant='surface'
									color='green'
								>
									Успешно!
								</Badge>
							) : (
								<Badge
									variant='surface'
									color='red'
								>
									Произошла ошибка при приглашении
								</Badge>
							)}
							<br />
							{results.message && <Text>{results.message}</Text>}
							<Text size={"5"}>Всего было приглашено {results.total} пользователей.</Text>
							<br />
							<Text size={"5"}>{results.successful} успешно</Text>
							<br />
							<Text size={"5"}>{results.failed} не приглашены</Text>
							<br />
							<Box mt={"10px"}>
								<ScrollArea style={{ height: "300px" }}>
									<Flex
										pr={"3"}
										direction={"column"}
										gap={"2"}
									>
										{results.results.map((result) => (
											<Card key={result.username}>
												{result.username} - {result.error}
											</Card>
										))}
									</Flex>
								</ScrollArea>
							</Box>
						</Box>
					) : (
						<Flex
							direction={"column"}
							align={"center"}
							justify={"center"}
							width={"100%"}
							height={"100%"}
						>
							<Spinner />
							<Text>Ожидание результатов, они будут доступны после полного завершения цикла программы.</Text>
						</Flex>
					)
				) : (
					<Text
						size={"6"}
						weight={"medium"}
						align={"center"}
					>
						Пригласите людей в группу, чтобы увидеть результаты
					</Text>
				)}
			</Box>
		</Card>
	);
};
