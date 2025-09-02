import type { ReactNode } from "react";

export interface NavigationLink {
	id: number;
	name: string;
	linkTo: string;
	icon: ReactNode;
}
