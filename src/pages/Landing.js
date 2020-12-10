import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  ContentCenter,
  ContentColumn,
  LogoText,
  AppDescription,
  ContentRow,
  //AuthButton,
} from "../components/StyledComponents";
import Register from "./Register";
import Login from "./Login";
const Landing = () => {
  const [modalShowLogin, setModalShowLogin] = useState(false);
  const [modalShowRegister, setModalShowRegister] = useState(false);
  return (
    <div
      style={{
        backgroundColor: "#141822",
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100vh",
      }}
    >
      <ContentCenter>
        <ContentColumn>
          <LogoText>My Todo</LogoText>
          <AppDescription>
            Register or login now!<br></br>Control your activities with{" "}
            <span style={{ color: "#4a6de4" }}>My Todo</span>
          </AppDescription>
          <ContentRow>
            <Button
              style={{
                marginRight: 12,
                width: "211px",
                height: "50px",
                backgroundColor: "#4a6de4",
              }}
              onClick={() => setModalShowRegister(true)}
            >
              Register
            </Button>
            <Register
              show={modalShowRegister}
              onHide={() => setModalShowRegister(false)}
            />
            <Button
              variant="none"
              style={{
                width: "211px",
                height: "50px",
                color: "black",
                backgroundColor: "#dbd8de",
              }}
              onClick={() => setModalShowLogin(true)}
            >
              Login
            </Button>
            <Login
              show={modalShowLogin}
              onHide={() => setModalShowLogin(false)}
            />
          </ContentRow>
        </ContentColumn>
      </ContentCenter>
    </div>
  );
};

export default Landing;
