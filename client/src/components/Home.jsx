import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import player1 from "../public/1.png";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const imgStyleObj = {
  width: '100px', 
  height: '100px',
  marginTop: '-250px',
  marginBottom: '40px'
}

const homeMainContainerObj = {
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  borderStyle: 'dotted',
}

const titleTextObj = {
  fontWeight: '600',
  fontStyle:'normal',
  fontSize: '34px', 
  lineHeight: '41.45px'
}

const subTitleObj = {
  fontWeight: '600',
  fontStyle: 'normal', 
  fontSize: '24px',
  lineHeight:'29.26px',
  
}


const Home = () => {
  //state to hold roomId
  const [roomId, setroomId] = useState("")

  const enterRoom = (roomId) => {
    navigate(`/${roomId}`);
  };

return(
   <>
     <div style = {homeMainContainerObj}>
        <img style = {imgStyleObj} src = {player1} alt = "home avatar" />
        <h1 style = {titleTextObj}>Welcome to Gather Lobby!</h1>
        <p style = {subTitleObj}>Join a room</p>
      
    
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
    </div>
  </>
  );
};

export default Home;
