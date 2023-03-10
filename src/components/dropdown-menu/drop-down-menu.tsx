import styles from "./drop-down-menu.module.css";
import { BiChevronDown } from "react-icons/bi";
import { useFloating, useInteractions } from "@floating-ui/react";
import { useClick } from "@floating-ui/react";
import { useState } from "react";
import { Option } from "./option/option";

const sampleOptions = [
  { text: "Option 1", id: 1 },
  { text: "Option 2", id: 2 },
];

export const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top-start",
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return (
    <button className={styles.button} {...getReferenceProps()}>
      <div className={styles.dropDownMenu}>
        <BiChevronDown
          size={24}
          className={styles.icon}
          style={{
            color: "#9498a7e0",
            marginLeft: "2px",
            marginRight: "2px",
          }}
        />

        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            visibility: isOpen ? "visible" : "collapse",
          }}
          className={styles.menu}
          {...getFloatingProps()}
        >
          {sampleOptions.map((option) => (
            <Option key={option.id} text={option.text} />
          ))}
        </div>
      </div>
    </button>
  );
};
