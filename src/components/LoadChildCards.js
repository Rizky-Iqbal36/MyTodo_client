import React, { useState, useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

import { userContext } from "../context/userContext";
import { API, urlAsset } from "../config/api";

import { FaUserAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillWarning } from "react-icons/ai";

import AddChildCard from "./ChildCard/AddChildCard";
import EditChildCard from "./ChildCard/EditChildCard";
import ChildCardsLoaded from "./ChildCard/ChildCardsLoaded";

import { ContentCenter, ContentColumn, ContentRow } from "./StyledComponents";
import { PageLoading } from "./Loading";

const LoadChildCards = (props) => {
  const [showAdd, setShowAdd] = useState(false);
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
                <ChildCardsLoaded endPoint="/childCardsByStatus/todo" />
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
                <ChildCardsLoaded endPoint="/childCardsByStatus/doing" />
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
                <ChildCardsLoaded endPoint="/childCardsByStatus/done" />
              </ContentColumn>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default LoadChildCards;
