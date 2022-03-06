import { useState } from "react";
import styles from "./App.module.css";
import { Class } from "./components/Class";
import { Tools } from "./components/Tools";
import { ScheduleItemTool } from "./types";

function App() {
  const [events, setEvents] = useState<ScheduleItemTool[]>([
    { number: 1, type: "PERIOD", start: "08:30", end: "09:40", id: "test" }
  ]);
  const [active, setActive] = useState<string | null>(null);

  // const addEvent = (event: ScheduleItem) => {
  //   setClasses(curr => [...curr, event]);
  // };

  // const deleteEvent = (id: string) => {
  //   setClasses(curr => curr.filter(c => c.id !== id));
  // };

  // const editEvent = (event: ScheduleItem) => {
  //   setClasses(curr => curr.map(c => (c.id === event.id ? event : c)));
  // };

  return (
    <div className={styles.app}>
      <div className={styles.classes}>
        {events
          .sort((a, b) => (a.start > b.start ? 1 : -1))
          .map(c => (
            <Class
              key={c.id}
              onClick={() => {
                if (active === c.id) {
                  setActive(null);
                } else {
                  setActive(c.id);
                }
              }}
              event={c}
              active={active === c.id}
            />
          ))}
      </div>
      <div className={styles.tools}>
        <Tools
          setEvents={setEvents}
          active={active ? events.find(c => c.id === active) : null}
        />
      </div>
    </div>
  );
}

export default App;
