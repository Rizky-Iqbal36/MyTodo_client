import React from "react";
import Header from "../../components/Header";
// import { ContentCenter } from "../../components/StyledComponents";
import LoadParentCards from "../../components/LoadParentCards";
const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <LoadParentCards />
      </div>
    </>
  );
};

export default Home;
