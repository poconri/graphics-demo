import { motion } from "framer-motion";
import { DropDownMenu } from "../dropdown-menu/drop-down-menu";
import styles from "./sidebar.module.css";

export const SideBar = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={styles.sideBar}
    >
      <DropDownMenu />
      menu
    </motion.div>
  );
};
