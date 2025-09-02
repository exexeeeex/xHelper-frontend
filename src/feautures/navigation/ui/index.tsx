import { useAuthenticationStore } from "@/feautures/auth";
import { useUserStore } from "@/feautures/user";
import { Avatar, Box, Card, Flex, Popover, Skeleton, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { Links } from "../config";
import { useEffect, useState } from "react";
import { callToast } from "@/feautures/toast";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { IconHoverCard } from "@/shared/components";
import { useSessionStore } from "@/feautures/session";
import styles from "./styles.module.scss";
import type { AuthenticationRequest } from "@/entities/auth";

export const Navigation = () => {
	const { isLoading, getInfo, user, error } = useUserStore();
	const { phoneNumber, logout } = useAuthenticationStore();
	const { sessions, get } = useSessionStore();
	const { login } = useAuthenticationStore();

	const [data, setData] = useState<AuthenticationRequest>({
		phoneNumber: "",
	});

	useEffect(() => {
		try {
			if (!phoneNumber) return;
			getInfo(phoneNumber);
		} catch {
			callToast("error", error ? error : "DN");
		}
	}, [getInfo, phoneNumber, error]);

	const fetchSessions = async () => {
		get();
		console.log(sessions);
	};

	const handleChangeAccount = async (phoneNumber: string) => {
		logout();
		setData({ ...data, phoneNumber });
		await login({ ...data, phoneNumber });
	};

	return (
		<Box
			pt={"15px"}
			pb={"15px"}
			pl={"5px"}
			pr={"5px"}
			style={{ backgroundColor: "var(--gray-4)" }}
			maxWidth={"250px"}
			width={"100%"}
			height={"100%"}
		>
			<Flex
				height={"100%"}
				justify={"between"}
				direction={"column"}
			>
				<Box>
					<header>
						<Flex
							align={"center"}
							gap={"2"}
							style={{ padding: "0 10px" }}
						>
							{!isLoading ? (
								<>
									<Box>
										<Link to={"/"}>
											<Avatar
												fallback={user ? user.username.slice(0, 1) : "N"}
												src={`data:image/png;base64,${user && user.avatar}`}
											/>
										</Link>
									</Box>
									<Flex direction='column'>
										<Text size={"3"}>@{user && user.username}</Text>
										<Text>{user && user.phone}</Text>
									</Flex>
								</>
							) : (
								<>
									<Skeleton>
										<Avatar
											fallback={user ? user.username.slice(0, 1) : "N"}
											src={`data:image/png;base64,${user && user.avatar}`}
										/>
									</Skeleton>
									<Flex
										gap={"2"}
										direction='column'
									>
										<Skeleton
											width={"100px"}
											height={"20px"}
										>
											Loading
										</Skeleton>
										<Skeleton
											width={"100px"}
											height={"10px"}
										>
											Loading
										</Skeleton>
									</Flex>
								</>
							)}
						</Flex>
					</header>
					<ul style={{ marginTop: "10px", width: "100%" }}>
						<Flex
							gap={"5px"}
							width={"100%"}
							direction={"column"}
						>
							{Links.map((link) =>
								!link.name.includes("аккаунты") ? (
									<li
										className={styles.link}
										key={link.id}
										style={{
											padding: "5px 10px",
											cursor: "pointer",
											fontWeight: "600",
											width: "100%",
											borderRadius: "5px",
										}}
									>
										<Flex
											gap={"7px"}
											align={"center"}
										>
											{link.icon}
											<Link
												style={{ width: "100%", fontSize: "17px" }}
												to={link.linkTo}
											>
												{link.name}
											</Link>
										</Flex>
									</li>
								) : (
									<Popover.Root key={link.id}>
										<Popover.Trigger>
											<li
												onClick={fetchSessions}
												className={styles.link}
												key={link.id}
												style={{
													padding: "5px 10px",
													cursor: "pointer",
													fontWeight: "600",
													width: "100%",
													borderRadius: "5px",
												}}
											>
												<Flex
													gap={"7px"}
													align={"center"}
												>
													{link.icon}
													<Text style={{ width: "100%", fontSize: "17px" }}>{link.name}</Text>
												</Flex>
											</li>
										</Popover.Trigger>
										<Popover.Content size={"2"}>
											<Flex
												gap={"30px"}
												direction={"column"}
											>
												{sessions?.map((session) => (
													<Card
														onClick={async () => await handleChangeAccount(session)}
														variant='ghost'
														className={styles.session__card}
														key={session}
													>
														{session}
													</Card>
												))}
											</Flex>
										</Popover.Content>
									</Popover.Root>
								),
							)}
						</Flex>
					</ul>
				</Box>
				<Box width={"100%"}>
					<Flex justify={"between"}>
						<IconHoverCard
							icon={<GearIcon />}
							text={"Настройки"}
						/>
						<IconHoverCard
							icon={<ExitIcon />}
							text={"Выйти из аккаунта"}
							action={() => logout()}
						/>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
};
