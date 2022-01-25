import "./App.css";
import { Container, Tabs, Tab } from "react-bootstrap";
import SwitchesPage from "./components/SwitchesPage";
import CaptivePortalPage from "./components/CaptivePortalPage";

function App() {
  return (
    <Container className="p-3">
      <Tabs defaultActiveKey="switches" className="mb-3">
        <Tab eventKey="switches" title="Switches">
          <SwitchesPage />
        </Tab>
        <Tab eventKey="captive" title="Captive portal">
          <CaptivePortalPage />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
