import React, { useContext, useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Modal, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import { MdDelete } from "react-icons/md";

import { API } from "../../config/api";
import { userContext } from "../../context/userContext";
import { ActionLoading } from "../Loading";
import AlertModal from "../AlertModal";

import { ContentRow } from "../StyledComponents";
const EditChildCard = (props) => {
  console.log(props);
  const [state, dispatch] = useContext(userContext);
  const [showAlert, setShowAlert] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingChange, setLoadingChange] = useState(false);

  const [onDelete] = useMutation(async () => {
    try {
      setLoadingDelete(true);
      await API.delete(`/delete-childCard/${props.childCardId}`);
      dispatch({
        type: "REFRESH_CARD",
      });
      setLoadingDelete(false);
    } catch (err) {
      console.log(err);
      setLoadingDelete(false);
    }
  });
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      title: props.title,
      description: props.description,
      status: "doing",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title required"),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      activityChange(values);
      console.log(values);
    },
  });
  const [activityChange, { isLoading, error }] = useMutation(async (values) => {
    try {
      setLoadingChange(true);
      // const body = JSON.stringify(values);
      await API.patch(`/updateContent-childCard/${props.childCardId}`, values);
      dispatch({
        type: "REFRESH_CARD",
      });
      setLoadingChange(false);
    } catch (err) {
      console.log(err);
      setLoadingChange(false);
    }
  });
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
            <strong style={{ color: "black" }}>Edit activity</strong>
            <div className="float-right">
              <Button variant="danger" onClick={() => onDelete()}>
                {loadingDelete ? <ActionLoading /> : <MdDelete />}
              </Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form style={{ color: "black" }} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Change title :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Change title"
                name="title"
                {...getFieldProps("title")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Change description :</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Change description"
                name="description"
                {...getFieldProps("description")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Change status :</Form.Label>
              <Form.Control
                as="select"
                name="status"
                {...getFieldProps("status")}
              >
                <option>todo</option>
                <option>doing</option>
                <option>done</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit">
              {loadingChange ? <ActionLoading /> : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditChildCard;
