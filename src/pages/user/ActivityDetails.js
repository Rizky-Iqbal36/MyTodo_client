import React from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import LoadChildCards from "../../components/LoadChildCards";
const ActivityDetails = (props) => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <div className="container">
        <LoadChildCards
          id={id}
          parentTitle={props.location.state.parentTitle}
        />
      </div>
    </>
  );
};

export default ActivityDetails;
