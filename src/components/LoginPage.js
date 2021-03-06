import { useState } from "react";
import { Stack, Form, Button, Spinner, Alert } from "react-bootstrap";
import useForm from "../hooks/useForm";
import useAuth from "../hooks/useAuth";

const initialFormData = {
  email: "", // required
  password: "", // required
};

function LoginPage() {
  const { formData, resetForm, handleChange } = useForm(initialFormData);
  const { loginUser, error } = useAuth();
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const { email, password } = formData;
      await loginUser(email, password);
      resetForm();
    } finally {
      setSending(false);
    }
  };

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} disabled={sending}>
        <Stack gap={2}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Control
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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
