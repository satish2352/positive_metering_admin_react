
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import instance from "../../api/AxiosInstance";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await instance.post(`/auth/login`, {
          email,
          password,
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log(response);
        if (response.data.result) {
          const { token, user } = response.data.responseData;
          localStorage.setItem('accessToken', token); 
          localStorage.setItem('user', JSON.stringify(user)); 
          toast.success("Login successful");
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        console.error("Error handling form submission:", error);
        toast.error("Error in Submit");
      }
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-light border-0"
                  />
                  {errors.email && (
                    <span className="error text-danger">{errors.email}</span>
                  )}
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-light border-0"
                  />
                  {errors.password && (
                    <span className="error text-danger">{errors.password}</span>
                  )}
                </Form.Group>

                <Col className="d-flex justify-content-center align-items-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="d-flex justify-content-center align-items-center mt-4 py-2 ps-5 pe-5"
                  >
                    Login
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
