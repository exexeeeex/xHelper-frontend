import { Box, Button, Card, Dialog, Flex, Switch, Text, TextField } from "@radix-ui/themes";
import { useState, type ChangeEvent, type FC } from "react";
import { IdCardIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { type VerifyCodeRequest, type AuthenticationRequest } from "@/entities/auth";
import { callToast } from "@/feautures/toast";
import { useAuthenticationStore } from "../../store";

import kid from "../kidlol.mp4";

export const AuthenticationForm: FC = () => {
	const { login, verifyCode, verifyPassword } = useAuthenticationStore();

	const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
	const [isPasswordType, setIsPasswordType] = useState<boolean>(true);
	const [authenticationModel, setAuthenticationModel] = useState<AuthenticationRequest>({
		phoneNumber: "",
	});
	const [verifyCodeModel, setVerifyCodeModel] = useState<VerifyCodeRequest>({
		phoneNumber: authenticationModel.phoneNumber,
		code: "",
	});
	const [isDanceKid, setIsDanceKid] = useState<boolean>(false);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAuthenticationModel({ ...authenticationModel, [name]: value });
	};

	const handleFirstStepSubmit = async () => {
		if (isVisiblePassword == false) {
			if (authenticationModel.phoneNumber.length >= 8) {
				const response = await login(authenticationModel);
				if (response === "open_vid_dance_kid") setIsDanceKid(true);
			} else callToast("error", "Заполните номер!");
		} else {
			if (!authenticationModel.password) return;
			if (authenticationModel.password?.length <= 3) {
				callToast("error", "Укажите корректный пароль!");
				return;
			} else {
				await verifyPassword(authenticationModel);
			}
		}
	};

	const handleCodeVerifyStepSubmit = async () => {
		if (verifyCodeModel.code.length >= 4) {
			verifyCodeModel.phoneNumber = authenticationModel.phoneNumber;
			await verifyCode(verifyCodeModel);
		} else callToast("error", "Введите код!");
	};

	return isDanceKid == false ? (
		<Box
			style={{
				margin: "auto",
			}}
			maxWidth='450px'
			width='100%'
		>
			<Card>
				<Text
					size='6'
					weight='medium'
				>
					Вход в аккаунт
				</Text>
				<Box mt='10px'>
					<Box>
						<Text size='3'>Номер телефона</Text>
						<TextField.Root
							name='phoneNumber'
							value={authenticationModel.phoneNumber}
							onChange={handleInputChange}
							size='2'
							variant='surface'
							style={{ fontSize: "15px", outlineColor: "var(--blue-12)" }}
						>
							<TextField.Slot>
								<svg
									width='15'
									height='15'
									viewBox='0 0 15 15'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<IdCardIcon />
								</svg>
							</TextField.Slot>
						</TextField.Root>
					</Box>
					<Flex
						align={"center"}
						gap={"2"}
						mt={"10px"}
					>
						<Switch
							color='cyan'
							onClick={() => setIsVisiblePassword(!isVisiblePassword)}
							style={{ cursor: "pointer" }}
						/>
						<Text
							weight={"medium"}
							size='3'
						>
							Аккаунт защищён паролем
						</Text>
					</Flex>
					{isVisiblePassword && (
						<Box mt={"5px"}>
							<Text size='3'>Пароль от аккаунта</Text>
							<TextField.Root
								name='password'
								value={authenticationModel.password}
								onChange={handleInputChange}
								type={isPasswordType ? `password` : `text`}
								size='2'
								variant='surface'
								style={{ fontSize: "15px", outlineColor: "var(--blue-12)" }}
							>
								<TextField.Slot
									style={{ cursor: "pointer" }}
									onClick={() => setIsPasswordType(!isPasswordType)}
								>
									{isPasswordType ? <EyeOpenIcon /> : <EyeClosedIcon />}
								</TextField.Slot>
							</TextField.Root>
						</Box>
					)}
					<Dialog.Root>
						<Dialog.Trigger>
							<Button
								onClick={handleFirstStepSubmit}
								style={{ width: "100%", cursor: "pointer", backgroundColor: "var(--blue-12)", color: "var(--gray-1)" }}
								mt='10px'
							>
								Войти в аккаунт
							</Button>
						</Dialog.Trigger>
						{authenticationModel.phoneNumber.length >= 8 && (
							<Dialog.Content maxWidth={"520px"}>
								<Dialog.Title>Проверка кода подтверждения</Dialog.Title>
								<Dialog.Description>Укажите код, который телеграм выслал вам в личные сообщения или на указанный номер телефона.</Dialog.Description>
								<TextField.Root
									onChange={(e: ChangeEvent<HTMLInputElement>) => setVerifyCodeModel({ ...verifyCodeModel, code: e.target.value })}
									mt={"10px"}
									placeholder='12345'
								></TextField.Root>
								<Button
									onClick={handleCodeVerifyStepSubmit}
									style={{ width: "100%", cursor: "pointer", backgroundColor: "var(--blue-12)", color: "var(--gray-1)" }}
									mt='10px'
								>
									Отправить код на проверку
								</Button>
								<Dialog.Close>
									<Button
										onClick={handleFirstStepSubmit}
										style={{ width: "100%", cursor: "pointer", backgroundColor: "var(--gray-9)", color: "var(--white)" }}
										mt='10px'
									>
										Отменить
									</Button>
								</Dialog.Close>
							</Dialog.Content>
						)}
					</Dialog.Root>
				</Box>
			</Card>
		</Box>
	) : (
		<Flex
			gap={"2"}
			direction={"column"}
			align={"center"}
		>
			<Text
				size={"9"}
				weight={"bold"}
			>
				ВАС ЗАБАНИЛИ НАХУЙ
			</Text>
			<video
				src={kid}
				autoPlay
				loop={true}
				style={{ maxWidth: "400px" }}
			/>
			<Text
				size={"5"}
				weight={"regular"}
			>
				Поменяйте IP Адрес или подождите некоторое время, сервис столкнулся с флудом с вашей стороны
			</Text>
		</Flex>
	);
};
