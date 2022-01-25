import { useState } from "react";
import { Stack, Form } from "react-bootstrap";
import * as api from "../api/usersApi";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "", // required
    password: "", // required
  });

  function handleSubmit(e) {
    e.preventDefault();
    api
      .login(formData.email, formData.password)
      .then((data) => console.log(data.user));
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <h1>Login Form</h1>
      <Form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleChange(e)}>
        <Stack gap={2}>
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
          <Form.Control
            className="btn btn-primary"
            type="submit"
            value="Login"
          />
        </Stack>
      </Form>
    </Stack>
  );
}

export default LoginPage;
