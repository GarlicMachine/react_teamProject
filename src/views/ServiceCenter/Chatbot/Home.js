import React from "react";
import { Link } from "react-router-dom";


import "./Home.css";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="User ID"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/ServiceCenter/Chatbot/${roomName}`} className="enter-room-button">
        채팅 시작하기
      </Link>
    </div>
  );
};

export default Home;