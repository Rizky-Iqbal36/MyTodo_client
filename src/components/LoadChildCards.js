import React, { useState, useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

import { userContext } from "../context/userContext";
import { API, urlAsset } from "../config/api";

import { FaUserAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillWarning } from "react-icons/ai";

import AddChildCard from "./ChildCard/AddChildCard";
import EditChildCard from "./ChildCard/EditChildCard";
import { ContentCenter, ContentColumn, ContentRow } from "./StyledComponents";
import { PageLoading } from "./Loading";

const LoadChildCards = (props) => {
  const [state, dispatch] = useContext(userContext);
  // const [parenCards, setParentCards] = useState([]);
  const [init, setInit] = useState([]);
  const [childCards, setChildCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doing, setDoing] = useState([]);
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [childCardId, setChildCardId] = useState(null);
  // console.log(props);
  useEffect(() => {
    const loadParentCards = async () => {
      try {
        setLoading(true);
        const res = await API.get("/childCards");
        await setInit(res.data.data.loadChildCards);
        await setChildCards(init.filter((e) => e.parentId === props.id));
        await setTodo(childCards.filter((e) => e.status === "todo"));
        await setDoing(childCards.filter((e) => e.status === "doing"));
        await setDone(childCards.filter((e) => e.status === "done"));
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
  if (!loading) {
    console.log(init.filter((e) => e.parentId === props.id));
    // console.log({ todo, doing, done });
  }
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
              {props.parentTitle}
            </p>
          </ContentRow>
          <Button variant="none" onClick={() => setShowAdd(true)}>
            <ContentRow>
              <p style={{ marginRight: "20px", fontWeight: "bolder" }}>
                Add new card
              </p>
              <div>
                <IoMdAddCircle size={24} />
              </div>
            </ContentRow>
          </Button>
          <AddChildCard
            show={showAdd}
            onHide={() => setShowAdd(false)}
            parentId={props.id}
          />
        </div>
        {loading || !childCards ? (
          <div style={{ paddingTop: 100 }}>
            <ContentCenter>
              <PageLoading />
            </ContentCenter>
          </div>
        ) : (
          <>
            <div className="row d-flex justify-content-around">
              <div className="col" style={{ width: "100%" }}>
                <ContentColumn>
                  <h3
                    style={{
                      width: "100%",
                      backgroundColor: "#292b2c",
                      padding: 15,
                      color: "white",
                    }}
                  >
                    <ContentCenter>
                      <strong>Todo</strong>
                    </ContentCenter>
                  </h3>
                  {todo.length === 0 ? (
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
                    todo.map((item) => (
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Title>
                            <strong>{item.title}</strong>
                          </Card.Title>
                          <Card.Text style={{ color: "#808080" }}>
                            {item.description
                              ? item.description
                              : "No Description"}
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
                  )}
                </ContentColumn>
              </div>
              <div className="col" style={{ width: "100%" }}>
                <ContentColumn>
                  <h3
                    style={{
                      width: "100%",
                      backgroundColor: "#0275d8",
                      padding: 15,
                      color: "white",
                    }}
                  >
                    <ContentCenter>
                      <strong>In-Proggress</strong>
                    </ContentCenter>
                  </h3>
                  {doing.length === 0 ? (
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
                    doing.map((item) => (
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Title>
                            <strong>{item.title}</strong>
                          </Card.Title>
                          <Card.Text style={{ color: "#808080" }}>
                            {item.description
                              ? item.description
                              : "No Description"}
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
                  )}
                </ContentColumn>
              </div>
              <div className="col" style={{ width: "100%" }}>
                <ContentColumn>
                  <h3
                    style={{
                      width: "100%",
                      backgroundColor: "#5cb85c",
                      padding: 15,
                      color: "white",
                    }}
                  >
                    <ContentCenter>
                      <strong>Done</strong>
                    </ContentCenter>
                  </h3>
                  {done.length === 0 ? (
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
                    done.map((item) => (
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Title>
                            <strong>{item.title}</strong>
                          </Card.Title>
                          <Card.Text style={{ color: "#808080" }}>
                            {item.description
                              ? item.description
                              : "No Description"}
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
                  )}
                </ContentColumn>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadChildCards;
