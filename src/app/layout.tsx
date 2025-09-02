import { AuthenticationForm, useAuthenticationStore } from "@/feautures/auth";
import { Navigation } from "@/feautures/navigation";
import { Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

export const Layout = () => {
	const { isAuthenticated } = useAuthenticationStore();

	return (
		<Flex
			gap={"10px"}
			style={{ width: "100vw", height: "100vh" }}
		>
			{isAuthenticated ? (
				<>
					<Navigation />
					<main style={{ padding: "15px 0", width: "100%", paddingRight: "15px" }}>
						<Outlet />
					</main>
				</>
			) : (
				<main style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
					<AuthenticationForm />
				</main>
			)}
		</Flex>
	);
};
