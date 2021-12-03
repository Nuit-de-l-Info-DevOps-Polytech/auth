import express from "express";
import conf from "./configs";
import oauthRouter from "./Routes/oauth.route";
import userRouter from "./Routes/user.route";
import { connectGitHub } from "./Utils/oauth.util";
import passport from "passport";
import cors from "cors";

//Init Express app
const app = express();

//Setup constants
const port = conf.port;

//JSON body parser for requests with body
app.use(express.json());

app.use(cors())

connectGitHub();

app.use(passport.initialize());

//All Routes
app.use("/api/auth", userRouter);
app.use("/api/oauth", oauthRouter);

//Listen on specific port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
