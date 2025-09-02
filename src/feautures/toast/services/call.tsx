import toast from "react-hot-toast";

export const callToast = (type: "access" | "error", message: string) => {
	if (type === "error") toast.error(message);
	else toast.success(message);
};
