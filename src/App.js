import "./App.css";
import { Container, Nav } from "react-bootstrap";

function App() {
  return (
    <Container className="p-3">
      <Nav variant="tabs" defaultActiveKey="switches">
        <Nav.Item>
          <Nav.Link eventKey="switches">Switches</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="captive">Captive portal</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container></Container>
    </Container>
  );
}

export default App;
