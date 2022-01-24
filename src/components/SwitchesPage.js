import React from "react";
import { ListGroup, FormCheck } from "react-bootstrap";

const switches = [
  { id: "0", label: "Swicth 1" },
  { id: "1", label: "Swicth 2" },
];

function Switches(props) {
  return (
    <ListGroup>
      {switches.map((x) => (
        <ListGroup.Item key={x.id}>
          <FormCheck type="switch" label={x.label} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Switches;
