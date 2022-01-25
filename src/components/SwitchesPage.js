import React, { useState, useEffect } from "react";
import { ListGroup, FormCheck, Stack, Spinner } from "react-bootstrap";
import * as api from "../api/switchesApi";

function Switches(props) {
  const [switches, setSwitches] = useState([]);

  useEffect(() => {
    if (switches.length === 0) {
      api.getSwitches().then((x) => setSwitches(x));
    }
  }, []);

  const updateSwitch = (sw) => {
    const newSwitch = { ...sw, switched: !sw.switched };
    const newSwitches = switches.map((x) => (x.id === sw.id ? newSwitch : x));
    api.saveSwitch(newSwitch);
    setSwitches(newSwitches);
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
            <FormCheck
              type="switch"
              label={x.label}
              checked={x.switched}
              onClick={() => updateSwitch(x)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Stack>
  );
}

export default Switches;
