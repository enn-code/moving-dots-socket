import React, { useEffect } from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";

const PlayerSprite = styled.span`
  position: absolute;
  left: ${props => props.x}px;
  bottom: ${props => props.y}px;
  width: 10px;
  height: 10px;
  background-color: ${props => props.colour};
  border: solid 1px ${props => (props.isActive ? "white" : "none")};
`;

const Player = ({ isActive, handleClick, handleSocket, colour, x, y }) => {
  useEffect(() => {
    console.log("mounted");
    const socket = socketIOClient("http://localhost:80");
    socket.on("playerUpdate", data => console.log("new update:", data));

    socket.on("broadcast", data =>
      console.log(`${colour} player received new coordinate data:`, data)
    );
    handleSocket(colour, socket);
  }, []);

  return (
    <PlayerSprite
      isActive={isActive}
      onClick={() => handleClick(colour)}
      colour={colour}
      x={x}
      y={y}
    />
  );
};

export default Player;
