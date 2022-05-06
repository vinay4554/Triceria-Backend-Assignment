const choices = ["rock", "paper", "scissor"];

function decidewinner(a, b) {
  if (a === b) return -1;

  if (a === 0 && b === 1) return 2;

  if (a == 0 && b == 2) return 1;

  if (a == 1 && b == 0) return 1;

  if (a === 1 && b === 2) return 1;

  if (a === 2 && b === 0) return 1;

  if (a === 2 && b === 1) return 1;
}

const playerschoice = (req, res, next) => {
  const n = req.body.num1;

  const result = {};

  const temp = [];

  for (let i = 0; i < n; i++) temp.push(0);

  for (let i = 0; i < n; i++) result[i] = temp.slice();

  const rounds = [];
  for (let round = 0; round < 50; round++) {
    for (let playerId = 0; playerId < n; playerId++) {
      for (
        let secondPlayerId = playerId + 1;
        secondPlayerId < n;
        secondPlayerId++
      ) {
        const firstPlayerChoice = Math.floor(Math.random() * 3);

        const secondPlayerChoice = Math.floor(Math.random() * 3);

        const winner = decidewinner(firstPlayerChoice, secondPlayerChoice);

        if (winner === 1) {
          result[playerId][secondPlayerId]++;
        } else if (winner === 2) {
          result[secondPlayerId][playerId]++;
        }
      }
    }

    rounds.push(JSON.parse(JSON.stringify(result)));
  }

  req.output = rounds;

  next();
};

export default playerschoice;
