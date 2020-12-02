import React, { useEffect, useState } from "react";
import { initSocket, sendMessage, ws } from "../client-socket.js";
import { idToCharacter, changeCharacter } from "../utils";
import Avatar from './Avatar'

import "../main.css";

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

  const [myInfo,setMyInfo] = useState("")
  const [users,setUsers] = useState("")
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
        setMyInfo(data.info)  
        sendMessage({
          event: "join",
          info: {
            room: roomId,
          },
        });
      } else if (data.event === "roomUpdate") {

        setUsers(data.info)
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
        console.log("GOT ROOM UPDATE", data.info);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  let usersArr = []

  // Assume we want our user to be the first one - then we'll always make our user the first one to show up 
  for (let myId in myInfo){
    usersArr.push(
      <Avatar 
      key = {myId}
      name = {myInfo[myId].name}
      />
    )
  }

  //iterate through update users object
  for (let userId in users){
    usersArr.push(
      <Avatar 
      key = {userId}
      name = {users[userId].name}
      /> 
    )
  }
  return <>Room!</>
  
};

export default Room;
