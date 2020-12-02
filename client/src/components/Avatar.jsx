import React from "react";



const Avatar = (props) => {

 const {name} = props

  return (
    <div className = "avatarContainer"> 
      <p>${name}</p>
    </div>
  )
}

export default Avatar