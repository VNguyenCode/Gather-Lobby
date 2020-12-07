import React, { useState } from "react";
import { navigate } from "@reach/router";
import player1 from "../public/1.png";
import "../main.css";

const imgStyleObj = {
  width: "100px",
  height: "100px",
  marginTop: "-100px",
  marginBottom: "40px",
};

const homeMainContainerObj = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const titleTextObj = {
  fontWeight: "600",
  fontStyle: "normal",
  fontSize: "34px",
  lineHeight: "41.45px",
  textAlign: "center",
};

const subTitleObj = {
  fontWeight: "600",
  fontStyle: "normal",
  fontSize: "24px",
  lineHeight: "29.26px",
  textAlign: "center",
};

const inputRoomObj = {
  background: "#ECECEC",
  borderRadius: "15px",
  width: "348px",
  height: "32px",
  textAlign: "center",
};

const buttonContainerObj = {
  marginTop: "50px",
  width: "171px",
  height: "45px",
  background: "#86D3FF",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const buttonTextObj = {
  width: "65px",
  height: "27px",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "22px",
  lineHeight: "27px",
  letterSpacing: "0.04em",
  textAlign: "center",
  color: "#FFFFFF",
  cursor: "pointer",
};

const Home = () => {
  //state to hold roomId
  const [roomId, setroomId] = useState("");

  const enterRoom = (roomId) => {
    navigate(`/${roomId}`);
  };

  return (
    <>
      <div style={homeMainContainerObj}>
        <img style={imgStyleObj} src={player1} alt="home avatar" />
        <h1 style={titleTextObj}>Welcome to Gather Lobby!</h1>
        <p style={subTitleObj}>Join a room</p>

        <form id="submit" onSubmit={enterRoom}>
          <input
            type="text"
            style={inputRoomObj}
            value={roomId}
            onChange={(e) => setroomId(e.target.value)}
            placeholder="enter room id here"
          />
        </form>

        <div style={buttonContainerObj}>
          <button style={buttonTextObj} type="submit" form="submit" id="btnEnter">
            enter
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
