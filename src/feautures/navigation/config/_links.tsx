import type { NavigationLink } from "../models";
import { RocketIcon, EnvelopeClosedIcon, PersonIcon, UploadIcon } from "@radix-ui/react-icons";

export const Links: NavigationLink[] = [
	{
		id: 1,
		name: "Инвайтер",
		linkTo: "/inviter",
		icon: <RocketIcon />,
	},
	{
		id: 2,
		name: "Мессенджер",
		linkTo: "/messanger",
		icon: <EnvelopeClosedIcon />,
	},
	{
		id: 3,
		name: "Парсер",
		linkTo: "/parser",
		icon: <UploadIcon />,
	},
	{
		id: 4,
		name: "Активные аккаунты",
		linkTo: "/account-check",
		icon: <PersonIcon />,
	},
];
