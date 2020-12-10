import styled from "styled-components";
import { Button } from "react-bootstrap";
//hitam #141822
//putih #dbd8de
//biru #4a6de4
//biru muda #4a91eb
//abu-abu #605b60
export const ContentCenter = styled.div((props) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  marginTop: props.marginT ? props.marginT : "0px",
  background: "transparent",
}));
export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
`;
export const LogoText = styled.h1((props) => ({
  fontSize: props.fs ? props.fs : "72px",
  fontFamily: "sans-serif",
  fontWeight: "bolder",
  color: "#4a6de4",
  padding: props.pd ? props.pd : "34px",
  marginTop: props.marginT ? props.marginT : "0px",
}));
export const AppDescription = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #dbd8de;
  line-height: 24px;
  padding: 48px;
`;
// export const AuthButton = styled.button((props) => ({
//   color: "white",
//   width: "211px",
//   height: "50px",
//   borderRadius: "5px",
// }));
