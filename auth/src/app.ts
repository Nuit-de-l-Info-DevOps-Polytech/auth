import express from "express";
import conf from "./configs";
import userRouter from "./Routes/user.route";
import passport from "passport";
import { Strategy as FacebookStrategy, Profile } from "passport-facebook";

//Init Express app
const app = express();

//Setup constants
const port = conf.port;

//JSON body parser for requests with body
app.use(express.json());

//All Routes
app.use("/api/auth", userRouter);

//Listen on specific port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
