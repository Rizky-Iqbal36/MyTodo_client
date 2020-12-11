import React, { useEffect, useState, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { AiFillWarning } from "react-icons/ai";
import { useParams } from "react-router-dom";

import { API } from "../../config/api";
import { userContext } from "../../context/userContext";
import { PageLoading } from "../Loading";

import EditChildCard from "./EditChildCard";

import { ContentCenter, ContentColumn } from "../StyledComponents";
const ChildCardsLoaded = (props) => {
  const { id } = useParams();
  const [state, dispatch] = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [childCardId, setChildCardId] = useState(null);
  useEffect(() => {
    const loadParentCards = async () => {
      try {
        setLoading(true);
        const res = await API.get(`${props.endPoint}/${id}`);
        setData(res.data.data.loadChildCards);
        dispatch({
          type: "CARD_REFRESHED",
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadParentCards();
  }, [state.refreshCard]);
  console.log(data);
  return loading || !data ? (
    <div style={{ paddingTop: 100 }}>
      <ContentCenter>
        <PageLoading />
      </ContentCenter>
    </div>
  ) : data.length === 0 ? (
    <ContentCenter>
      <ContentColumn>
        <AiFillWarning size={24} />
        <h5
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          No any activities in here
        </h5>
      </ContentColumn>
    </ContentCenter>
  ) : (
    data.map((item) => (
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
                title={item.title}
                description={item.description}
              />
            ) : null}
          </div>
        </Card.Body>
      </Card>
    ))
  );
};

export default ChildCardsLoaded;
