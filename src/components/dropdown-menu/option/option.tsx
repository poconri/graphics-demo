import styles from "./option.module.css";
interface OptionProps {
  text: string;
}

export const Option = (props: OptionProps) => {
  return <div className={styles.option}>{props.text}</div>;
};
