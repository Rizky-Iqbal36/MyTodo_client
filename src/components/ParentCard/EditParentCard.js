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
const EditParentCard = (props) => {
  const [state, dispatch] = useContext(userContext);
  const [thumbnailParentCard, setThumbnailParentCard] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingChange, setLoadingChange] = useState(false);
  // const [changedContent, setChangedContent] = useState([]);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  // useEffect(() => {
  //   setChangedContent({ title, description });
  //   console.log(changedContent);
  // }, [title, description]);
  const [updateThumbnail] = useMutation(async () => {
    try {
      setIsLoadingThumbnail(true);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append(
        "thumbnailParentCard",
        thumbnailParentCard,
        thumbnailParentCard.name
      );

      await API.patch(
        `/updateThumbnail-parentCard/${props.parentCardId}`,
        formData,
        config
      );
      dispatch({
        type: "REFRESH_CARD",
      });
      setIsLoadingThumbnail(false);
      setShowAlert(true);
    } catch (err) {
      console.log(err.message);
      setIsLoadingThumbnail(false);
    }
  });
  const [onDelete] = useMutation(async () => {
    try {
      setLoadingDelete(true);
      await API.delete(`/delete-parentCard/${props.parentCardId}`);
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
      title: title,
      description: description,
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
      await API.patch(
        `/updateContent-parentCard/${props.parentCardId}`,
        values
      );
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateThumbnail();
            }}
          >
            <ContentRow>
              <div className="form-group" style={{ color: "black" }}>
                <div className="custom-file">
                  <p>Change thumbnail :</p>
                  <input
                    type="file"
                    onChange={(e) => {
                      setThumbnailParentCard(e.target.files[0]);
                    }}
                    id="thumbnailParentCard"
                  />
                </div>
              </div>
              <Button variant="primary" type="submit" style={{ padding: 5 }}>
                {isLoadingThumbnail ? <ActionLoading /> : "Submit thumbnail"}
              </Button>
              <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
                <p>Your thumbnail has been successfully updated</p>
              </AlertModal>
            </ContentRow>
          </form>
          <Form style={{ color: "black" }} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Change title :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Change title"
                name="title"
                value={title}
                {...getFieldProps("title")}
              />
              <Form.Text className="text-muted">
                {touched.title && errors.title ? (
                  <p style={{ color: "red" }}>{errors.title}</p>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Change description :</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Change description"
                name="description"
                value={description}
                {...getFieldProps("description")}
              />
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

export default EditParentCard;
