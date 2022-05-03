import express from "express";
const router = express.Router();
import flash from "connect-flash";
import plychoice from "../middlewares/game.js";
import { restart } from "../middlewares/game.js";

let round = 0;

router.get("/start", (req, res) => {
  const message = req.flash("message");
  res.render("game/game.ejs", {
    s1: ply1,
    s2: ply2,
    s3: ply3,
    s4: ply4,
    round: round,
    p1: ply1s,
    p2: ply2s,
    p3: ply3s,
    p4: ply4s,
    message: message,
  });
});

var ply1 = {},
  ply2 = {},
  ply3 = {},
  ply4 = {};
var ply1s = ["-", 0, 0, 0],
  ply2s = [0, "-", 0, 0],
  ply3s = [0, 0, "-", 0],
  ply4s = [0, 0, 0, "-"];

router.get("/score", plychoice, (req, res) => {
  round += 1;
  const [p1, p2, p3, p4] = req.choices;
  const [ps1, ps2, ps3, ps4] = req.results;
  ply1 = p1;
  ply2 = p2;
  ply3 = p3;
  ply4 = p4;
  ply1s = ps1;
  ply2s = ps2;
  ply3s = ps3;
  ply4s = ps4;
  if (round < 51) {
    res.redirect("start");
  } else {
    round = 0;
    req.flash("message", "Your 50 chances Completed");
    res.redirect("restart");
  }
});

router.get("/restart", restart, (req, res) => {
  ply1 = {};
  ply2 = {};
  ply3 = {};
  ply4 = {};
  ply1s = ["-", 0, 0, 0];
  ply2s = [0, "-", 0, 0];
  ply3s = [0, 0, "-", 0];
  ply4s = [0, 0, 0, "-"];
  round = 0;
  res.redirect("start");
});
export default router;
