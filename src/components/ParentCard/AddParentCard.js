import React, { useContext, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

import { API } from "../../config/api";
import { userContext } from "../../context/userContext";
import { ActionLoading } from "../Loading";
import AlertModal from "../AlertModal";
const AddParentCard = (props) => {
  const [state, dispatch] = useContext(userContext);
  const [userId, setUserId] = useState(state.user.id);
  const [showAlert, setShowAlert] = useState(false);
  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    values,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      uploadBy: userId,
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title required"),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      storeNewParentCard(values);
      resetForm("");
      props.show(false);
    },
  });
  const [storeNewParentCard, { isLoading, error }] = useMutation(
    async (values) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("uploadBy", values.uploadBy);
      try {
        const res = await API.post("/post-parentCard", formData, config);
        dispatch({
          type: "REFRESH_CARD",
        });
        setShowAlert(true);
      } catch (err) {
        console.log(err);
      }
    }
  );
  return (
    <Modal
      {...props}
      size="lg-6"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ color: "white" }}
    >
      <div>
        <Modal.Header closeButton={false}>
          <Modal.Title id="contained-modal-title-vcenter">
            <strong style={{ color: "black" }}>Add new activity</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                {...getFieldProps("title")}
              />
              <Form.Text className="text-muted">
                {touched.title && errors.title ? (
                  <p style={{ color: "red" }}>{errors.title}</p>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Description"
                name="description"
                {...getFieldProps("description")}
              />
              <Form.Text className="text-muted">
                {touched.description && errors.description ? (
                  <p style={{ color: "red" }}>{errors.description}</p>
                ) : null}
              </Form.Text>
            </Form.Group>
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
              {isLoading ? <ActionLoading /> : "Add"}
            </Button>
            <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Your new activity has been successfully added</p>
                <p>please check your personal boards</p>
              </div>
            </AlertModal>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AddParentCard;
