import { InputHTMLAttributes, useContext, useMemo } from "react";

// context
import AppConfigContext from "../context/AppConfigContext";

// hooks
// import useGAFromContext from "../../../hooks/useGAFromContext";

// interfaces
// import ScheduleItem from "../../../interfaces/ScheduleItem";
import { ScheduleItem } from "../types";
// import StudentClass from "../../../interfaces/StudentClass";

// util
// import CustomSwal from "../util/CustomSwal";
import { generateTimestampFromDateStrings } from "../util/date";

// styles
import styles from "./HomeSchedule.module.css";

interface ScheduleItemProps {
  scheduleItem: ScheduleItem;
  // classInfo?: StudentClass | null;
  color?: string;
  active: boolean;
}

export default function ScheduleItemComponent({
  scheduleItem,
  active,
  ...props
}: ScheduleItemProps & InputHTMLAttributes<HTMLTableRowElement>) {
  const appConfig = useContext(AppConfigContext);
  // const googleAnalytics = useGAFromContext();

  const color = useMemo(() => {
    // get default color
    if (scheduleItem.type === "PERIOD")
      return (
        // props.classInfo?.color ||
        appConfig.classColors[(scheduleItem.number as number) - 1]
      );
    // if not applicable, just white
    return "#fff";
  }, [
    appConfig.classColors,
    // props.classInfo,
    scheduleItem.number,
    scheduleItem.type
  ]);
  const scheduleItemComponentClassName = useMemo(
    () =>
      styles.scheduleItem +
      " " +
      // light or dark schedule item
      (isLightColor(color)
        ? styles.scheduleItemLight
        : styles.scheduleItemDark) +
      (active ? " " + styles.active : ""),
    [
      // linked (or not) schedule item
      // (props.classInfo?.zoomLink ? " " + styles.scheduleItemWithLink : ""),
      color,
      active
      // props.classInfo
    ]
  );
  const eventSignifier = useMemo(
    () =>
      scheduleItem.type === "PERIOD"
        ? "P" + scheduleItem.number // e.g. P2 (for period 2)
        : scheduleItem.overrideSignifier || scheduleItem.type, // any other case
    [scheduleItem]
  );

  // const handleItemClick = useCallback(async () => {
  //   if (props.classInfo?.zoomLink) {
  //     // if there's a meeting link specified
  //     const result = await CustomSwal.fire({
  //       title: "Join Meeting?",
  //       icon: "question",
  //       html: (
  //         <p>
  //           Would you like to join <strong>{props.classInfo?.className}</strong>
  //           ?
  //         </p>
  //       ),
  //       showCancelButton: true,
  //       confirmButtonText: "Join",
  //       focusConfirm: true
  //     });
  //     // if the user confirms
  //     if (result.isConfirmed) {
  //       // log in google analytics
  //       // googleAnalytics.event({
  //       //   category: "JoinMeeting",
  //       //   action: "Class",
  //       //   label: "app"
  //       // });
  //       // open zoom link
  //       window.open(props.classInfo.zoomLink);
  //     }
  //   }
  // }, [props.classInfo]);

  return (
    <tr
      className={scheduleItemComponentClassName}
      style={{ backgroundColor: color }}
      // onClick={handleItemClick}
      {...props}>
      <td className={styles.eventSignifier}>{eventSignifier}</td>
      <td className={styles.eventName}>
        <strong>
          {
            // props.classInfo?.className ||
            scheduleItem.name || "-----"
          }{" "}
        </strong>
        {/* {props.classInfo?.room ? `(${props.classInfo?.room})` : null} */}
      </td>
      <td className={styles.eventTimespan}>
        {generateTimestampFromDateStrings(scheduleItem.start, scheduleItem.end)}
      </td>
    </tr>
  );
}

// light or dark algorithm from https://awik.io/determine-color-bright-dark-using-javascript/. thank you!
// TODO: rework to work with typescript types, as I grabbed this from original Schoop source code
const isLightColor = (color: any) => {
  // Variables for red, green, blue values
  let r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  return hsp > 127.5; // light = true, dark = false
};
