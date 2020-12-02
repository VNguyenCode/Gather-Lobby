import player1 from "./public/1.png";
import player2 from "./public/2.png";
import player3 from "./public/3.png";
import player0 from "./public/0.png";

const characterMap = {
  0: player0,
  1: player1,
  2: player2,
  3: player3,
};

export const idToCharacter = (id) => {
  return characterMap[id];
};

export const changeCharacter = (id, change) => {
  return (id + change + Object.keys(characterMap).length) % Object.keys(characterMap).length;
};
