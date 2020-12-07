import React, { useEffect, useState } from "react";
import { initSocket, sendMessage, ws } from "../client-socket.js";
import { idToCharacter, changeCharacter } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";

import "../main.css";

const rightContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  gridArea: "right",
};

const leftContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gridArea: "left",
  height: "100vh",
  flexWrap: "wrap",
};

const roomHeader = {
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "34px",
  lineHeight: "41px",
  letterSpacing: "0.04em",
  color: "#000000",
  textAlign: "center",
};

const roomSubHeader = {
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "24px",
  lineHeight: "29px",
  letterSpacing: "0.04em",
  color: "#222222",
  textAlign: "center",
};

const avatarPic = {
  width: "140px",
  height: "140px",
  margin: "40px",
};

const avatarContainer = {
  display: "flex",
  alignItems: "center",
};

const mainContainer = {
  display: "grid",
  height: "100vh",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr 1fr",
  gridTemplateAreas: `
  'left right right'
  'left right right'
  `,
};

const arrow = {
  border: "4px",
  fontSize: "24px",
  cursor: "pointer",
};

const inputHeader = {
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "24px",
  lineHeight: "29px",
  letterSpacing: "0.04em",
  color: "#222222",
  textAlign: "center",
};

const nameObj = {
  background: "#F2F2F2",
  borderRadius: "15px",
  width: "348px",
  height: "32px",
  fontSize: "16px",
  textAlign: "center",
  letterSpacing: "0.04em",
  lineHeight: "20px",
};

const bioObj = {
  background: "#F2F2F2",
  borderRadius: "15px",
  width: "494px",
  height: "107px",
  textAlign: "center",
  fontSize: "16px",
  lineHeight: "20px",
};

const innerLeft = {
  height: "100%",
  width: "100%",
};

/***
 *
 * Room is the base component for a lobby room
 *
 * Some useful things to note:
 *  1. We've implemented the functions to change your character number, bio, and name.
 *  2. idToCharacter will convert a number between 0 and 3 to a character img src
 *  3. You don't need to put everything in this component! Feel free to branch out
 *  4. A quick way to get icons: FontAwesome! Syntax looks something like
 *
 * import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 * import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
 *
 *
 *  <FontAwesomeIcon
 *     onClick={() => {}}
 *     icon={faArrowRight}
 *     style={{fontSize: 28px}} <- customize size through font size
 *     className="classnamehere"
 *  />
 */

const Room = ({ roomId }) => {
  const [userId, setUserId] = useState("");
  const [roomUsers, setRoomUsers] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userArr, setUserArr] = useState([]);

  /*
  Right now updateCharacter sets the characterId to 1 only — you're
  going to want to make use of the imported function changeCharacter,
  which takes in (id, change) to change the character: for instance,
  to increment the character (+1), you can do:
  changeCharacter(CURRENT_CHAR_ID_HERE, 1)
  */
  const updateCharacter = () => {
    sendMessage({
      event: "clientUpdate",
      info: {
        characterId: 1,
      },
    });
  };

  const updateName = () => {
    sendMessage({
      event: "clientUpdate",
      info: {
        name: "MY_UPDATED_NAME",
      },
    });
  };

  const updateBio = () => {
    sendMessage({
      event: "clientUpdate",
      info: {
        bio: "MY_UPDATED_BIO",
      },
    });
  };

  useEffect(() => {
    initSocket();
    ws.onmessage = (msg) => {
      let data = JSON.parse(msg.data);
      if (data.event === "connection") {
        console.log("MY USER ID IS", data.info);
        // console.log("USER_ID", userId);
        sendMessage({
          event: "join",
          info: {
            room: roomId,
          },
        });
        setUserId(data.info);
      } else if (data.event === "roomUpdate") {
        /* Room Updates take the form of:
            { 
                userID1 : {
                    characterId: number,
                    name: string,
                },
                userID2: {
                    characterId: number,
                    name: string,                    
                }
                ...
            }
            # put into state? 
        */
        setRoomUsers(data.info);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    let userArr = [];
    for (let key in roomUsers) {
      let charId = roomUsers[key].characterId;
      let avatar = idToCharacter(charId);
      if (key === userId) {
        setCurrentId(charId);
        setAvatar(avatar);
      }
      userArr.push(<Avatar key={key} name={roomUsers[key].name} avatar={avatar} />);
    }
    setUserArr(userArr);
  }, [roomUsers]);

  const handleClick = (num) => {
    let newId = changeCharacter(currentId, num);
    let avatar = idToCharacter(newId);
    setCurrentId(newId);
    setAvatar(avatar);
  };

  return (
    <>
      <div style={mainContainer}>
        <div style={leftContainer}>{userArr}</div>
        <div style={rightContainer}>
          <h1 style={roomHeader}>Customize Your Look!</h1>
          <p style={roomSubHeader}>Avatar</p>

          <div style={avatarContainer}>
            <FontAwesomeIcon onClick={() => handleClick(-1)} icon={faArrowLeft} style={arrow} />
            <img style={avatarPic} src={avatar} alt="home avatar" />
            <FontAwesomeIcon onClick={() => handleClick(1)} icon={faArrowRight} style={arrow} />
          </div>

          <p style={inputHeader}>Name</p>
          <form id="submit">
            <input type="text" style={nameObj} placeholder="Enter Name Here" />
          </form>
          <p style={inputHeader}>Bio</p>
          <input type="text" style={bioObj} form="submit" placeholder="Enter Bio Here" />
        </div>
      </div>
    </>
  );
};

export default Room;
