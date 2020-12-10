import React from "react";
import { Card, Button } from "react-bootstrap";
const ChildCards = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          <strong>{item.title}</strong>
        </Card.Title>
        <Card.Text style={{ color: "#808080" }}>
          {item.description ? item.description : "No Description"}
        </Card.Text>
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={() => {
              setShowEdit(true);
              setChildCardId(item.id);
            }}
          >
            Edit
          </Button>
          {showEdit ? (
            <EditChildCard
              show={showEdit}
              onHide={() => setShowEdit(false)}
              childCardId={childCardId}
            />
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChildCards;
