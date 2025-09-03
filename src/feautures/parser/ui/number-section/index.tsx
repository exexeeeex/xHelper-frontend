import type { UserParseResponse } from "@/entities/user/models";
import { FileInput, StringList } from "@/shared/components";
import { Badge, Box, Button, Card, Flex, ScrollArea, Skeleton, Text } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { ParserFoundItem } from "../found-item";
import { postUserApi } from "@/feautures/user";

type Props = {
	usersByNumbers: UserParseResponse[] | null;
	isLoadingUsersByNumber: boolean | null;
	numbers: string[] | null;
	fileChange: any;
	accept: any;
};

export const ParserNumberSection: FC<Props> = ({ usersByNumbers, isLoadingUsersByNumber, numbers, accept, fileChange }) => {
	const [message, setMessage] = useState<string | null>();

	const { saveUsernames, saveUsersIds } = postUserApi;

	const handleSaveUsernames = async () => {
		try {
			await saveUsernames(
				usersByNumbers
					?.filter((u) => u.found)
					.filter((u) => u.username !== "null")
					.map((u) => u.username) || [],
			);
			console.log(usersByNumbers?.filter((u) => u.userId));
			setMessage("Валидные юзернеймы будут доступны в папке fs/. Найдите файл с сегодняшней датой.");
		} catch (err: any) {
			setMessage(`Ошибка при сохранении юзернеймов: ${err}`);
		}
	};

	const handleSaveIds = async () => {
		try {
			await saveUsersIds(usersByNumbers?.filter((u) => u.found).map((u) => u.userId) || []);
			setMessage("Валидные Id будут доступны в папке fs/. Найдите файл с сегодняшней датой.");
		} catch (err: any) {
			setMessage(`Ошибка при сохранении Id: ${err}`);
		}
	};

	return (
		<Box style={{ flex: "1" }}>
			<Card>
				<Flex
					direction={"column"}
					gap={"2"}
				>
					<Text
						size={"4"}
						weight={"medium"}
					>
						Выберите файл с номерами телефонов
					</Text>
					<Text
						size={"3"}
						color='gray'
					>
						Помините, что номера должны располагаться друг за другом. Новый номер - новая строка
					</Text>
					<Flex
						align={"center"}
						justify={"between"}
					>
						<FileInput
							onChange={fileChange}
							accept={".txt,text/plain"}
						/>
						{numbers && (
							<Button
								style={{ cursor: "pointer" }}
								onClick={accept}
								variant='surface'
							>
								Найти пользователей
							</Button>
						)}
					</Flex>
					{numbers && (
						<>
							<StringList
								items={numbers}
								height={195}
								error={"Номера не найдены"}
							/>
							<Text style={{ marginTop: "5px" }}>Всего номеров: {numbers.length}</Text>
						</>
					)}
					{isLoadingUsersByNumber && !usersByNumbers && (
						<Card>
							<Flex
								direction={"column"}
								gap={"2"}
							>
								{Array.from({ length: 4 }).map((_, index) => (
									<Skeleton
										key={index}
										style={{
											width: "100%",
											height: "50px",
										}}
									>
										Loading...
									</Skeleton>
								))}
							</Flex>
						</Card>
					)}
					{usersByNumbers && (
						<>
							<Card>
								<Text>Всего обработано: {usersByNumbers.length}</Text>
								<br />
								<Text>Аккаунтов с юзернеймами: {usersByNumbers.filter((u) => u.username !== "null").length}</Text>
								<br />
								<Text>Валидных аккаунтов: {usersByNumbers.filter((u) => u.found).length}</Text>
								<ScrollArea style={{ height: "300px" }}>
									<Flex
										direction={"column"}
										pr={"3"}
										gap={"2"}
									>
										{usersByNumbers
											.sort((a, b) => (a.found === b.found ? 0 : a.found ? -1 : 1))
											.map((user) => (
												<ParserFoundItem
													user={user}
													key={user.userId}
												/>
											))}
									</Flex>
								</ScrollArea>
							</Card>
							{usersByNumbers.filter((u) => u.username).length >= 1 && (
								<Flex
									direction={"column"}
									gap={"2"}
								>
									<Button
										style={{ cursor: "pointer" }}
										variant='outline'
										onClick={handleSaveUsernames}
									>
										Сохранить валидные юзернеймы
									</Button>
									<Button
										color='cyan'
										style={{ cursor: "pointer" }}
										variant='outline'
										onClick={handleSaveIds}
									>
										Сохранить валидные id
									</Button>
								</Flex>
							)}
							{message && (
								<Badge
									style={{ maxWidth: "700px" }}
									size={"3"}
									color='green'
								>
									{message}
								</Badge>
							)}
						</>
					)}
				</Flex>
			</Card>
		</Box>
	);
};
