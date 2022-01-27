import React, { useEffect, useState, useReducer } from "react";
import { ListGroup, FormCheck, Stack, Spinner, Alert } from "react-bootstrap";
import useSwitches from "../hooks/useSwitches";

function switchesReducer(switches, action) {
  switch (action.type) {
    case "loading":
      return switches.map((x) =>
        x.id === action.switchId ? { ...x, loading: true } : x
      );
    case "stopLoading":
      return switches.map((x) =>
        x.id === action.switchId ? { ...x, loading: false } : x
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

function SwitchesPage() {
  const [switches, dispatch] = useReducer(switchesReducer, []);
  const [loading, setLoading] = useState(false);
  const api = useSwitches();
  const { error } = api;
  const setSwitches = (switches) => dispatch({ type: "set", switches });
  const setSwitchLoading = (switchId) =>
    dispatch({ type: "loading", switchId });
  const stopSwitchLoading = (switchId) =>
    dispatch({ type: "stopLoading", switchId });
  const updateSwitch = (sw) => {
    if (sw) {
      dispatch({ type: "update", switch: sw });
    }
  };

  useEffect(() => {
    if (!error && switches.length === 0) {
      setLoading(true);
      api
        .getSwitches()
        .then((switches) =>
          setSwitches(switches.map((x) => ({ ...x, loading: false })))
        )
        .finally(() => setLoading(false));
    }
  }, [api, error, switches.length]);

  const onSwitchChanged = (switchId, switched) => {
    setSwitchLoading(switchId);
    const _switch = switches.find((x) => x.id === switchId);
    const updated = { ..._switch, switched };
    api
      .saveSwitch(updated)
      .then((x) => updateSwitch(x))
      .finally(() => stopSwitchLoading(switchId));
  };

  return (
    <Stack gap={2} className="mt-3 mx-auto col-md-5">
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && (
        <Spinner className="mx-auto" variant="primary" animation="grow" />
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
                onChange={(e) => onSwitchChanged(x.id, e.target.checked)}
              />
              {x.loading && <Spinner animation="border" size="sm" />}
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Stack>
  );
}

export default SwitchesPage;
