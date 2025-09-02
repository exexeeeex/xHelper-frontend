import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { Dashboard } from "@/widgets/dashboard";
import { InviterPage, ParserPage } from "@/pages";
import { ErrorPage } from "@/pages";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/inviter",
				element: <InviterPage />,
			},
			{
				path: "/parser",
				element: <ParserPage />,
			},
		],
	},
]);
