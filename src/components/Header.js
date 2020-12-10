import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Navbar, Nav, Button, DropdownButton, Dropdown } from "react-bootstrap";

import { LogoText } from "../components/StyledComponents";
import { urlAsset } from "../config/api";
import { userContext } from "../context/userContext";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";

import { ContentRow } from "../components/StyledComponents";
const Header = () => {
  const [state, dispatch] = useContext(userContext);
  const history = useHistory();
  const islogout = () => {
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div style={{ backgroundColor: "#141822" }}>
      <Nav className="justify-content-between">
        <Button variant="none" onClick={() => history.push("/Home")}>
          {window.location.pathname === "/Home" ? (
            <AiFillHome size={48} style={{ color: "#4a6de4" }} />
          ) : (
            <AiOutlineHome size={48} style={{ color: "white" }} />
          )}
        </Button>
        <LogoText fs="34px" pd="10px" marginT="5px">
          My Todo
        </LogoText>
        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              outline: "none",
              boxShadow: "none",
            }}
          >
            <img
              src={urlAsset.photo + state.user?.avatar}
              style={{
                height: 50,
                width: 50,
                border: "5px solid #C4C4C4",
                boxSizing: "border-box",
                borderRadius: 25,
              }}
              alt="Avatar"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight>
            <div style={{ width: 250 }}>
              <Dropdown.Header>Account</Dropdown.Header>
              <Dropdown.ItemText>{state.user?.email}</Dropdown.ItemText>
              <Dropdown.ItemText>{state.user?.fullName}</Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item
                as={Button}
                style={{
                  marginTop: ".5rem",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => islogout()}
              >
                <FiLogOut
                  size={22}
                  style={{ marginRight: 10, color: "#ff0742" }}
                />{" "}
                Logout
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default Header;
