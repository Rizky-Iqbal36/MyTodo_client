import React from "react";
import { Modal, Alert } from "react-bootstrap";

const pStyle = {
  textAlign: "center",
  fontSize: 20,
  padding: "10px 30px",
  color: "black",
  justifyContent: "center",
  alignItems: "center",
};

const AlertModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      centered
      id="addSuccess"
      style={{
        width: "100%",
        display: "flex",
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Alert variant="none" style={{ margin: "0" }}>
        <p style={pStyle}>{props.children}</p>
      </Alert>
    </Modal>
  );
};

export default AlertModal;
