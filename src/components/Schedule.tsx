// import spacetime, { Spacetime } from "spacetime";

// interfaces
import { ScheduleItemTool } from "../types";

// hooks
// import useDate from "../../../hooks/useDate";

// context
// import { HomeContext } from "..";

// components
// import DateSwitcher from "./DateSwitcher";
import ScheduleItemComponent from "./ScheduleItemComponent";
// import ScheduleMessage from "./ScheduleMessage";

// styles
import styles from "./HomeSchedule.module.css";

export const Schedule: React.FC<{
  currentSchedule: ScheduleItemTool[];
  active: string | null;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ currentSchedule, active, setActive }) => {
  // const currentDate = useDate();
  // const { studentClasses } = useContext(HomeContext);

  // const [viewedDate, setViewedDate] = useState<Spacetime>(spacetime.now());

  // // this is a placeholder for now
  // const currentSchedule: ImmutableStudentSchedule = useMemo(
  //   () => TEST_SCHEDULE,
  //   []
  // );
  // const [active, setActive] = useState<string | null>(null);

  // useEffect(() => {
  //   // when the day changes, set the date
  //   // currently in view to the new date
  //   if (
  //     currentDate.hour() === 0 &&
  //     currentDate.minute() === 0 &&
  //     currentDate.second() === 0
  //   )
  //     setViewedDate(spacetime.now());
  // }, [currentDate, setViewedDate]);

  return (
    // <HomeScheduleContext.Provider value={{ viewedDate, setViewedDate }}>
    <div>
      {/* <DateSwitcher /> */}
      <table className={styles.homeSchedule + " fixBorderRadius"}>
        <tbody>
          {currentSchedule.map((scheduleItem, index) => (
            <ScheduleItemComponent
              scheduleItem={scheduleItem}
              // classInfo={
              //   scheduleItem.type === "PERIOD"
              //     ? studentClasses.find(
              //         studentClass => studentClass.period === scheduleItem.number
              //       )
              //     : null
              // }
              onClick={() => {
                if (active === scheduleItem.id) {
                  setActive(null);
                } else {
                  setActive(scheduleItem.id);
                }
              }}
              active={active === scheduleItem.id}
              key={
                // scheduleItem.type === "PERIOD"
                //   ? "P" + scheduleItem.number // example: P1
                //   : scheduleItem.type + "_" + index // example: BREAK_0
                scheduleItem.id
              }
            />
          ))}
        </tbody>
      </table>
    </div>
    // </HomeScheduleContext.Provider>
  );
};
