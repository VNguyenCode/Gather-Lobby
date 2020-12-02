import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import Room from "./Room";
import Home from "./Home";

import "../main.css";


/**
 * Define the "App" component as a class.
 */
const App = () => {
  return (
    <Router>
      <Home path="/" />
      <Room path="/:roomId" />
    </Router>
  );
};

export default App;
