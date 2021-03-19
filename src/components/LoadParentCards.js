import React, { useState, useContext, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { API, urlAsset } from "../config/api";
import { userContext } from "../context/userContext";
import { PageLoading } from "../components/Loading";
import AddParentCard from "./ParentCard/AddParentCard";
import EditParentCard from "./ParentCard/EditParentCard";

import { FaUserAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillWarning } from "react-icons/ai";

import { ContentRow, ContentCenter, ContentColumn } from "./StyledComponents";

const LoadParentCards = () => {
  const [state, dispatch] = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [parenCards, setParentCards] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [parentCardId, setParentCardId] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const loadParentCards = async () => {
      try {
        setLoading(true);
        const res = await API.get(`parentCards/${state.user?.id}`);
        setParentCards(res.data.data.loadParentCards);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    dispatch({
      type: "CARD_REFRESHED",
    });
    loadParentCards();
  }, [state.refreshCard]);
  return (
    <div className="container-fluid">
      <div style={{ paddingTop: 24 }}>
        <div
          className="d-flex justify-content-between"
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ContentRow>
            <FaUserAlt size={24} />
            <p
              style={{
                marginLeft: "20px",
                fontWeight: "bolder",
              }}
            >
              Personal Boards
            </p>
          </ContentRow>
          <Button variant="none" onClick={() => setShowAdd(true)}>
            <ContentRow>
              <p style={{ marginRight: "20px", fontWeight: "bolder" }}>
                Add new activity
              </p>
              <div>
                <IoMdAddCircle size={24} />
              </div>
            </ContentRow>
          </Button>
          <AddParentCard
            show={showAdd}
            onHide={() => setShowAdd(false)}
            uploadBy={state.user.id}
          />
        </div>
        {loading || !parenCards ? (
          <PageLoading />
        ) : parenCards.length === 0 ? (
          <ContentCenter>
            <ContentColumn>
              <AiFillWarning size={72} />
              <h1
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                You don't have any activities
              </h1>
            </ContentColumn>
          </ContentCenter>
        ) : (
          <div className="row">
            {parenCards.map((item) => {
              return (
                <div className="col-md-3" style={{ margin: "10px" }}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={
                        item.thumbnailParentCard
                          ? urlAsset.photo + item.thumbnailParentCard
                          : urlAsset.photo +
                            "MyTodo_Project/thumbnailParentCards/default.png"
                      }
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        height: 180,
                        width: 286,
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        <strong>{item.title}</strong>
                      </Card.Title>
                      <Card.Text style={{ color: "#808080" }}>
                        {item.description ? item.description : "No Description"}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="primary"
                          onClick={() =>
                            history.push({
                              pathname: `ActivityDetails/${item.id}`,
                              state: {
                                parentTitle: item.title,
                              },
                            })
                          }
                        >
                          See detail
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setShowEdit(true);
                            setParentCardId(item.id);
                          }}
                        >
                          Edit
                        </Button>
                        {showEdit ? (
                          <EditParentCard
                            show={showEdit}
                            onHide={() => setShowEdit(false)}
                            parentCardId={parentCardId}
                            title={item.title}
                            description={item.description}
                          />
                        ) : null}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadParentCards;
