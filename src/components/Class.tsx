import { InputHTMLAttributes } from "react";
import { ScheduleItemTool } from "../types";
import styles from "./Class.module.css";

interface Props {
  active: boolean;
  event: ScheduleItemTool;
}

// TODO: steal from Schoop
export const Class: React.FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
  event: { name, start, end },
  active,
  ...props
}) => {
  return (
    <div className={active ? styles.active : styles.class} {...props}>
      <h1>{name}</h1>
      <p>
        {start} - {end}
      </p>
    </div>
  );
};
