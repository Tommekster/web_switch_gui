import "./App.css";
import { Container, Tabs, Button, Nav } from "react-bootstrap";
import { UserContext } from "./hooks/UserContext";
import useUser from "./hooks/useUser";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import SwitchesPage from "./components/SwitchesPage";
import CaptivePortalPage from "./components/CaptivePortalPage";

function App() {
  const _useUser = useUser();
  const { isLoggedIn, logout, user } = _useUser;
  return (
    <UserContext.Provider value={{ ..._useUser }}>
      <Container className="p-3">
        {!isLoggedIn && (
          <Tabs defaultActiveKey="login-in">
            <Tabs.Tab eventKey="login-in" title="Login">
              <LoginPage />
            </Tabs.Tab>
            <Tabs.Tab eventKey="sign-up" title="Sign up">
              <SignUpPage />
            </Tabs.Tab>
          </Tabs>
        )}
        {isLoggedIn && (
          <>
            <Nav className="justify-content-end">
              <Button variant="outline-danger" onClick={logout}>
                Log out
              </Button>
            </Nav>
            <Tabs defaultActiveKey="switches">
              <Tabs.Tab
                eventKey="switches"
                title="Switches"
                disabled={!user?.roles?.includes("ROLE_SWITCH")}
              >
                <SwitchesPage />
              </Tabs.Tab>
              <Tabs.Tab
                eventKey="captive"
                title="Captive portal"
                disabled={!user?.roles?.includes("ROLE_CAPTIVE")}
              >
                <CaptivePortalPage />
              </Tabs.Tab>
            </Tabs>
          </>
        )}
      </Container>
    </UserContext.Provider>
  );
}

export default App;
