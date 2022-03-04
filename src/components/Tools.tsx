import { useEffect, useState } from "react";
import { Class } from "../types";

interface Props {
  addEvent: (c: Class) => void;
  editEvent: (c: Class) => void;
  deleteEvent: (name: string) => void;
  active: Class | null | undefined;
}

export const Tools: React.FC<Props> = ({
  addEvent,
  deleteEvent,
  editEvent,
  active
}) => {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (active) {
      setName(active.name);
      setStart(active.start);
      setEnd(active.end);
      setId(active.id);
    } else {
      setName("");
      setStart("");
      setEnd("");
      setId("");
    }
  }, [active]);

  return (
    <div>
      <p>Name</p>
      <datalist id="name">
        <option value="P1" />
        <option value="P2" />
        <option value="P3" />
        <option value="P4" />
        <option value="P5" />
        <option value="P6" />
        <option value="P7" />
        <option value="P8" />
        <option value="LUNCH" />
        <option value="BREAK" />
        {/* <option value="CUSTOM" /> */}
      </datalist>
      <input
        type="text"
        name="name"
        list="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Start</p>
      <input
        type="time"
        name="start"
        id="start"
        value={start}
        onChange={e => setStart(e.target.value)}
      />
      <p>End</p>
      <input
        type="time"
        name="end"
        id="end"
        value={end}
        onChange={e => setEnd(e.target.value)}
      />
      {active && <button onClick={() => deleteEvent(id)}>Delete</button>}
      <button
        onClick={() => {
          setId("event-" + new Date().getTime());
          if (active) {
            editEvent({ name, start, end, id });
          } else {
            addEvent({ name, start, end, id });
          }
          setName("");
          setStart("");
          setEnd("");
        }}>
        {active ? "Edit" : "Add"}
      </button>
    </div>
  );
};
