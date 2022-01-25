import React, { useEffect, useReducer } from "react";
import { ListGroup, FormCheck, Stack, Spinner } from "react-bootstrap";
import * as api from "../api/switchesApi";

function switchesReducer(switches, action) {
  switch (action.type) {
    case "loading":
      return switches.map((x) =>
        x.id === action.switchId ? { ...x, loading: true } : x
      );
    case "update":
      return switches.map((x) =>
        x.id === action.switch.id ? { ...action.switch, loading: false } : x
      );
    case "set":
      return action.switches;
    default:
      throw new Error();
  }
}

function Switches(props) {
  const [switches, dispatch] = useReducer(switchesReducer, []);
  const setSwitches = (switches) => dispatch({ type: "set", switches });
  const setLoading = (switchId) => dispatch({ type: "loading", switchId });
  const updateSwitch = (sw) => dispatch({ type: "update", switch: sw });

  useEffect(() => {
    if (switches.length === 0) {
      api
        .getSwitches()
        .then((switches) =>
          setSwitches(switches.map((x) => ({ ...x, loading: false })))
        );
    }
  }, [switches.length]);

  const onSwitchChanged = (e, switchId) => {
    setLoading(switchId);
    const sw = switches.find((x) => x.id === switchId);
    const switched = e.target.checked;
    var updated = { ...sw, switched };
    api.saveSwitch(updated).then((x) => updateSwitch(x));
  };

  return (
    <Stack>
      {switches.length === 0 && (
        <Spinner
          className="col-md-5 mx-auto"
          variant="primary"
          animation="grow"
        />
      )}
      <ListGroup>
        {switches.map((x) => (
          <ListGroup.Item key={x.id}>
            <Stack direction="horizontal" gap={3}>
              <FormCheck
                type="switch"
                id={`switch-${x.id}`}
                label={x.label}
                checked={x.switched}
                disabled={x.loading}
                onChange={(e) => onSwitchChanged(e, x.id)}
              />
              {x.loading && <Spinner animation="border" size="sm" />}
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Stack>
  );
}

export default Switches;
