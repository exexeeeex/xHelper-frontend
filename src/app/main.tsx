import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./assets/_zeroing.css";
import "@radix-ui/themes/layout/components.css";
import "@radix-ui/themes/layout/utilities.css";
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById("root")!).render(
	<Theme
		accentColor='blue'
		grayColor='gray'
		radius='medium'
		panelBackground='solid'
		appearance='dark'
	>
		<RouterProvider router={router} />
		<Toaster
			toastOptions={{
				style: {
					background: "var(--gray-3)",
					color: "var(--white)",
				},
			}}
			position='bottom-right'
		/>
	</Theme>,
);
