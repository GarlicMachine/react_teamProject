import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import ChatRoom from "./ChatRoom";

const Chatbot = () => {
    return (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/ServiceCenter/Chatbot/:roomId" component={ChatRoom} />
      </Switch>
    </Router>
     
    </>
  )
}

export default Chatbot
