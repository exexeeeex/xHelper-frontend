import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
	return (
		<main style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
			<Box>
				<Card style={{ maxWidth: "450px" }}>
					<Flex
						direction={"column"}
						align={"center"}
						gap={"3"}
					>
						<img
							style={{ maxWidth: "200px" }}
							src='https://em-content.zobj.net/source/telegram/386/face-with-peeking-eye_1fae3.webp'
						/>
						<Text
							style={{ textAlign: "center" }}
							size={"7"}
							weight={"medium"}
						>
							Кажется, вы заблудились! Такой страницы у нас нет..
						</Text>
						<Link to={"/"}>
							<Button
								style={{ cursor: "pointer" }}
								variant='surface'
							>
								На главную
							</Button>
						</Link>
					</Flex>
				</Card>
			</Box>
		</main>
	);
};
