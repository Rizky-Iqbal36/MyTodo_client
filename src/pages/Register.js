import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import { useFormik } from "formik";
import { userContext } from "../context/userContext";
import * as Yup from "yup";
import { ActionLoading } from "../components/Loading";
const Register = (props) => {
  const [state, dispatch] = useContext(userContext);
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      gender: "Male",
      phone: "",
      address: "",
      isAdmin: false,
      avatar: "MyTodo_Project/avatars/default.png",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email required")
        .email("invalid format email!"),
      password: Yup.string().required("Password Required").min(8),
      fullName: Yup.string().required().min(3),
      gender: Yup.string().required(),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone only accepts input numbers from 0-9")
        .required()
        .min(10, "Phone must be at least 10 characters"),
      address: Yup.string().required().min(5),
    }),
    onSubmit: (values) => {
      console.log(values);
      registerAction(values);
    },
  });

  const [registerAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(values);

      try {
        const res = await API.post("/register", body, config);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data.data,
        });

        setAuthToken(res.data.data.token);

        try {
          const res = await API.get("/auth");
          dispatch({
            type: "USER_LOADED",
            payload: res.data.data.user,
          });
        } catch (err) {
          setErrorMsg(err.response.data.message);
          dispatch({
            type: "AUTH_ERROR",
          });
        }

        history.push("/Home");
      } catch (err) {
        setErrorMsg(err.response.data.message);
        dispatch({
          type: "LOGIN_FAIL",
        });
      }
    } catch (err) {
      setErrorMsg(err.response.data.message);
      console.log(err);
    }
  });
  return (
    <Modal
      {...props}
      size="lg-6"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ color: "white", borderRadius: "10px" }}
    >
      <div style={{ backgroundColor: "#141822" }}>
        {errorMsg ? <Alert variant="danger">{errorMsg || error}</Alert> : null}
        <Modal.Header closeButton={false}>
          <Modal.Title id="contained-modal-title-vcenter">
            <strong>Register</strong>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="container">
              <Form.Group>
                <Form.Control
                  type="Email"
                  placeholder="Email"
                  name="email"
                  {...getFieldProps("email")}
                />
                <Form.Text className="text-muted">
                  {touched.email && errors.email ? (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="Password"
                  placeholder="Password"
                  name="password"
                  {...getFieldProps("password")}
                />
                <Form.Text className="text-muted">
                  {touched.passsword && errors.passsword ? (
                    <p style={{ color: "red" }}>{errors.passsword}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Fullname"
                  name="fullName"
                  {...getFieldProps("fullName")}
                />
                <Form.Text className="text-muted">
                  {touched.fullName && errors.fullName ? (
                    <p style={{ color: "red" }}>{errors.fullName}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  as="select"
                  name="gender"
                  {...getFieldProps("gender")}
                >
                  <option>Male</option>
                  <option>Female</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  {touched.gender && errors.gender ? (
                    <p style={{ color: "red" }}>{errors.gender}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  {...getFieldProps("phone")}
                />
                <Form.Text className="text-muted">
                  {touched.phone && errors.phone ? (
                    <p style={{ color: "red" }}>{errors.phone}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="Address"
                  {...getFieldProps("address")}
                />
                <Form.Text className="text-muted">
                  {touched.address && errors.address ? (
                    <p style={{ color: "red" }}>{errors.address}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="none"
              type="submit"
              style={{
                marginBottom: "20px",
                width: "100%",
                backgroundColor: "#4a6de4",
                color: "white",
              }}
            >
              {isLoading ? <ActionLoading /> : "Register"}
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

export default Register;
