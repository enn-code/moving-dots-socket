import React, { useState } from "react";
import styled from "styled-components";

import Player from "./player.component";

const Map = styled.div`
  position: absolute;
  left: ${props => props.width / 2}px;
  top: ${props => props.height / 4}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: orange;
`;

const World = ({ width, height }) => {
  const [activePlayer, setActivePlayer] = useState("red");

  const [redSocket, setRedSocket] = useState();
  const [blueSocket, setBlueSocket] = useState();
  const [greenSocket, setGreenSocket] = useState();

  const [coords, setCoords] = useState({
    red: [100, 200],
    blue: [200, 200],
    green: [300, 200]
  });

  const handleSocket = (colour, socket) => {
    console.log("handleSocket", colour, socket);

    switch (colour) {
      case "red":
        return setRedSocket(socket);
      case "blue":
        return setBlueSocket(socket);
      case "green":
        return setGreenSocket(socket);
      default:
        return;
    }
  };

  const handleClick = colour => {
    setActivePlayer(colour);
  };

  const handleMove = (direction, activePlayer) => {
    let movement = [0, 0];
    switch (direction) {
      case "ArrowUp":
        movement[1] += 10;
        break;
      case "ArrowDown":
        movement[1] -= 10;
        break;
      case "ArrowRight":
        movement[0] += 10;
        break;
      case "ArrowLeft":
        movement[0] -= 10;
        break;
      default:
        break;
    }

    const newCoords = [
      coords[activePlayer][0] + movement[0],
      coords[activePlayer][1] + movement[1]
    ];

    // TODO: validation to limit movement to boundaries of 'canvas'

    setCoords({ ...coords, [activePlayer]: newCoords });

    const emitType = "movement";

    switch (activePlayer) {
      case "red":
        return redSocket.emit(emitType, [`${activePlayer} has moved`, coords]);
      case "blue":
        return blueSocket.emit(emitType, [`${activePlayer} has moved`, coords]);
      case "green":
        return greenSocket.emit(emitType, [
          `${activePlayer} has moved`,
          coords
        ]);
      default:
        return;
    }
  };

  document.onkeydown = e => {
    if (e.key.search("Arrow") !== -1) {
      console.log("move a player", e.key);
      handleMove(e.key, activePlayer);
    }
  };

  const renderPlayers = () => {
    const playerColours = ["red", "blue", "green"];

    return playerColours.map(colour => {
      const isActive = activePlayer === colour;
      const x = coords[colour][0];
      const y = coords[colour][1];
      return (
        <Player
          isActive={isActive}
          handleClick={handleClick.bind(this)}
          handleSocket={handleSocket}
          colour={colour}
          x={x}
          y={y}
        />
      );
    });
  };

  return (
    <div>
      <p>
        {activePlayer} - X:{coords[activePlayer][0]}, Y:
        {coords[activePlayer][1]}
      </p>
      <Map height={height} width={width}>
        {renderPlayers()}
      </Map>
    </div>
  );
};

export default World;
