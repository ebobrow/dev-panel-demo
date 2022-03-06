import { useState } from "react";
import styles from "./App.module.css";
import { Schedule } from "./components/Schedule";
import { Tools } from "./components/Tools";
import { ScheduleItemTool } from "./types";

function App() {
  const [events, setEvents] = useState<ScheduleItemTool[]>([
    { number: 1, type: "PERIOD", start: "08:30", end: "09:40", id: "test" }
  ]);
  const [active, setActive] = useState<string | null>(null);

  // TODO: Date toggle (steal from V1), preset types?, ...
  return (
    <div className={styles.app}>
      <Schedule
        currentSchedule={events}
        active={active}
        setActive={setActive}
      />
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
