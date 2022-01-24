import "./App.css";
import { Container, Tabs, Tab, Button, Stack } from "react-bootstrap";
import SwitchesPage from "./components/SwitchesPage";

function App() {
  return (
    <Container className="p-3">
      <Tabs defaultActiveKey="switches" className="mb-3">
        <Tab eventKey="switches" title="Switches">
          <SwitchesPage />
        </Tab>
        <Tab eventKey="captive" title="Captive portal">
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
