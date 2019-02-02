
const BASE_26_SET = 'a'.charCodeAt(0);
const ROLL_BY = [15, 5, 21, 9];

const roomCodeBijection = (roomCode) => {
  return roomCode.split("").map((char, index) =>
    String.fromCharCode((char.charCodeAt(0) - BASE_26_SET + ROLL_BY[index]) % 26 + BASE_26_SET)
  ).join("");
};

module.exports = {
  roomCodeBijection,
};
