import React from "react";
import styled from "styled-components";

const PlayerSprite = styled.span`
  position: absolute;
  left: ${props => props.x}px;
  bottom: ${props => props.y}px;
  width: 10px;
  height: 10px;
  background-color: ${props => props.colour};
  border: solid 1px ${props => (props.isActive ? "white" : "none")};
`;

const Player = ({ isActive, handleClick, colour, x, y }) => {
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
