import React from "react";

const innerContainer = {
  textAlign: "center",
  margin: "20px",
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "fill",
};

const avatarObj = {
  width: "100%",
  maxWidth: "200px",
  maxHeight: "200px",
  objectFit: "fill",
};

const Avatar = (props) => {
  const { name, avatar } = props;

  return (
    <div style={innerContainer}>
      <p> {name} </p>
      <img style={avatarObj} src={avatar} alt="home avatar" />
    </div>
  );
};

export default Avatar;
