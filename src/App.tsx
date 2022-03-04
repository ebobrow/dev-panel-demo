import { useState } from "react";
import "./App.css";
import { Class } from "./components/Class";
import { Tools } from "./components/Tools";
import { Class as ClassType } from "./types";

function App() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [active, setActive] = useState<string | null>(null);

  const addEvent = (event: ClassType) => {
    setClasses(curr => [...curr, event]);
  };

  const deleteEvent = (id: string) => {
    setClasses(curr => curr.filter(c => c.id !== id));
  };

  const editEvent = (event: ClassType) => {
    setClasses(curr => curr.map(c => (c.id === event.id ? event : c)));
  };

  return (
    <div className="App">
      <div className="Classes">
        {classes
          .sort((a, b) => (a.start > b.start ? 1 : -1))
          .map(c => (
            <Class
              key={c.id}
              onClick={() => {
                if (active === c.name) {
                  setActive(null);
                } else {
                  setActive(c.name);
                }
              }}
              event={c}
              active={active === c.name}
            />
          ))}
      </div>
      <div className="Tools">
        <Tools
          addEvent={addEvent}
          deleteEvent={deleteEvent}
          editEvent={editEvent}
          active={active ? classes.find(c => c.name === active) : null}
        />
      </div>
    </div>
  );
}

export default App;
