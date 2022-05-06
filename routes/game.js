import express from "express";
const router = express.Router();
import flash from "connect-flash";
import plychoice from "../middlewares/game.js";

router.get("/start", (req, res) => {
  res.render("game/game");
});
router.post("/score", plychoice, (req, res) => {
  const result = req.output;
  res.render("game/game", { result: result });
});

export default router;
