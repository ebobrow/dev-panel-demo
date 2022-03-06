import { useEffect } from "react";
import { ScheduleItem, ScheduleItemTool } from "../types";
import { Field, Form, Formik, useFormikContext } from "formik";

interface Props {
  setEvents: React.Dispatch<React.SetStateAction<ScheduleItemTool[]>>;
  active: ScheduleItemTool | null | undefined;
}

export const Tools: React.FC<Props> = ({ setEvents, active }) => {
  const initialValues: ScheduleItem = {
    type: "PERIOD",
    start: "",
    end: ""
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // setId("event-" + new Date().getTime());
          if (active) {
            setEvents(curr =>
              curr.map(e =>
                e.id === active.id
                  ? { ...values, id: "event-" + new Date().getTime() }
                  : e
              )
            );
          } else {
            setEvents(curr => [
              ...curr,
              { ...values, id: "event-" + new Date().getTime() }
            ]);
          }
        }}>
        <Form>
          <Optional display={values => values.type === "PERIOD"}>
            <Field
              type="number"
              id="number"
              name="Number"
              placeholder="Number"
            />
          </Optional>
          <Optional display={values => values.type !== "PERIOD"}>
            <Field id="name" name="Name" placeholder="Name" />
          </Optional>
          <Field id="type" name="type" placeholder="Type" required />
          <Field type="time" id="start" name="start" required />
          <Field type="time" id="end" name="end" required />
          <Field
            id="overrideSignifier"
            name="overrideSignifier"
            placeholder="Override Signifier"
          />
          <Field
            id="overrideLink"
            name="overrideLink"
            placeholder="Override Link"
          />
          <button type="submit">{active ? "Edit" : "Add"}</button>
          {active && (
            <button
              onClick={() => {
                setEvents(curr => curr.filter(e => e.id !== active.id));
              }}>
              Delete
            </button>
          )}
          <HandleActive active={active} />
        </Form>
      </Formik>
    </div>
  );
};

const HandleActive: React.FC<{
  active: ScheduleItemTool | null | undefined;
}> = ({ active }) => {
  const { handleReset, setValues } = useFormikContext<ScheduleItem>();

  useEffect(() => {
    if (active) {
      setValues(active);
    } else {
      handleReset();
    }
  }, [active, handleReset, setValues]);

  // TODO: This cannot be it
  return <></>;
};

interface OptionalProps {
  display: (values: ScheduleItem) => boolean;
}
const Optional: React.FC<OptionalProps> = ({ children, display }) => {
  const { values } = useFormikContext<ScheduleItem>();

  if (display(values)) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};
