import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import player1 from "../public/1.png";

const Home = () => {
  //state to hold roomId
  const [roomId, setroomId] = useState("")

  const enterRoom = (roomId) => {
    navigate(`/${roomId}`);
  };

return(
   <>
     <div className = "homeTextContainer">
      <img src = {player1}/>
      <h1 id = "homeText">Welcome to Gather Lobby</h1>
      <p id = "roomText">Join a room</p>
     </div>
  
    <form className="submit" onSubmit={enterRoom}>
      <input
        type="text"
        className="formInput"
        value={roomId}
        onChange={e => setroomId(e.target.value)}
        placeholder = "enter room id here"
      />

    <div className = "btnContainer">
      <button id="btnEnter">enter</button>
    </div>

    </form>    
  </>
  );
};

export default Home;
