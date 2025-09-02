import type { FC } from "react";
import styles from "./styles.module.scss";

type Props = {
	onChange: any;
	accept: string;
};

export const FileInput: FC<Props> = ({ onChange, accept }) => (
	<input
		onChange={onChange}
		accept={accept}
		className={styles.input}
		type='file'
	/>
);
