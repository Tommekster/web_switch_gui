import "./App.css";
import { Container, Tabs } from "react-bootstrap";
import { UserContext } from "./hooks/UserContext";
import useUser from "./hooks/useUser";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import SwitchesPage from "./components/SwitchesPage";
import CaptivePortalPage from "./components/CaptivePortalPage";

function App() {
  const _useUser = useUser();
  const { isLoggedIn } = _useUser;
  return (
    <UserContext.Provider value={{ ..._useUser }}>
      <Container className="p-3 mb-3">
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
          <Tabs defaultActiveKey="captive">
            <Tabs.Tab eventKey="switches" title="Switches">
              <SwitchesPage />
            </Tabs.Tab>
            <Tabs.Tab eventKey="captive" title="Captive portal">
              <CaptivePortalPage />
            </Tabs.Tab>
          </Tabs>
        )}
      </Container>
    </UserContext.Provider>
  );
}

export default App;
