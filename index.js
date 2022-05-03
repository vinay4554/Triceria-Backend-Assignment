import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import gameroutes from "./routes/game.js";
import { restart } from "./middlewares/game.js";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser("myselfvinaykumar"));
app.use(
  session({
    secret: "myselfvinaykumar",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("Home");
});

// Using middlewares Here

app.use("/game", gameroutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
