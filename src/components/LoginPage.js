import { useState } from "react";
import { Stack, Form, Button, Spinner, Alert } from "react-bootstrap";
import useForm from "../hooks/useForm";
import * as api from "../api/usersApi";

const initialFormData = {
  email: "", // required
  password: "", // required
};

function LoginPage() {
  const { formData, resetForm, handleChange } = useForm(initialFormData);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");
    const { email, password } = formData;
    api
      .login(email, password)
      .then((data) => {
        console.log(data.user);
        resetForm();
      })
      .catch((error) => setError(error.message))
      .finally(() => setSending(false));
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <h1>Login</h1>
      <Form
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => handleChange(e)}
        disabled={sending}
      >
        <Stack gap={2}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Control
            type="text"
            placeholder="Email"
            value={formData.email}
            name="email"
          />
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.password}
            name="password"
          />
          <Button variant="primary" type="submit" disabled={sending}>
            {!sending && <>Login</>}
            {sending && (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            )}
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
}

export default LoginPage;
