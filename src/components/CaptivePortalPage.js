import React from "react";
import { Stack, Button } from "react-bootstrap";

function CaptivePortalPage() {
  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <Button variant="secondary">Save changes</Button>
      <Button variant="outline-secondary">Cancel</Button>
    </Stack>
  );
}

export default CaptivePortalPage;
