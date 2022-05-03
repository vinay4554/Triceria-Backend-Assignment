const emojis = [
  {
    name: "rock",
    emoji: "✊",
  },
  {
    name: "paper",
    emoji: "✋",
  },
  {
    name: "scissor",
    emoji: "✌️",
  },
];

var p1 = ["-", 0, 0, 0];
var p2 = [0, "-", 0, 0];
var p3 = [0, 0, "-", 0];
var p4 = [0, 0, 0, "-"];

const play12 = (play1, play2) => {
  if (play1.name === play2.name) {
    return 0;
  } else if (play1.name == "rock" && play2.name == "scissor") {
    return 1;
  } else if (play1.name == "paper" && play2.name == "rock") {
    return 1;
  } else if (play1.name == "scissor" && play2.name == "paper") {
    return 1;
  } else if (play1.name == "paper" && play2.name == "scissor") {
    return 0;
  } else if (play1.name == "scissor" && play2.name == "rock") {
    return 0;
  } else if (play1.name == "rock" && play2.name == "paper") {
    return 0;
  }
};
const playerschoice = (req, res, next) => {
  const ply1 = Math.floor(Math.random() * 3);
  const ply2 = Math.floor(Math.random() * 3);
  const ply3 = Math.floor(Math.random() * 3);
  const ply4 = Math.floor(Math.random() * 3);
  req.choices = [emojis[ply1], emojis[ply2], emojis[ply3], emojis[ply4]];

  //   calculating Player 1 outcomes
  p1[1] += Number(play12(emojis[ply1], emojis[ply2]));
  p1[2] += Number(play12(emojis[ply1], emojis[ply3]));
  p1[3] += Number(play12(emojis[ply1], emojis[ply4]));

  //   calculating Player 2 outcomes

  p2[0] += Number(play12(emojis[ply2], emojis[ply1]));
  p2[2] += Number(play12(emojis[ply2], emojis[ply3]));
  p2[3] += Number(play12(emojis[ply2], emojis[ply4]));

  // calculating Player 3 outcomes

  p3[0] += Number(play12(emojis[ply3], emojis[ply1]));
  p3[1] += Number(play12(emojis[ply3], emojis[ply2]));
  p3[3] += Number(play12(emojis[ply3], emojis[ply4]));

  // calculating Player 4 outcomes

  p4[0] += Number(play12(emojis[ply4], emojis[ply1]));
  p4[1] += Number(play12(emojis[ply4], emojis[ply2]));
  p4[2] += Number(play12(emojis[ply4], emojis[ply3]));

  req.results = [p1, p2, p3, p4];

  next();
};

export const restart = (req, res, next) => {
  p1 = ["-", 0, 0, 0];
  p2 = [0, "-", 0, 0];
  p3 = [0, 0, "-", 0];
  p4 = [0, 0, 0, "-"];

  next();
};

export default playerschoice;
