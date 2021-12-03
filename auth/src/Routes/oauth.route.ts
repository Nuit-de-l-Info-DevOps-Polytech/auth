import { Router } from "express";
import {
  connectWithGitHub,
  handleGitHubConnectionCallback,
} from "../Controllers/oauth.controller";

const oauthRouter = Router();

oauthRouter.get("/github", connectWithGitHub());
oauthRouter.get("/github/callback", handleGitHubConnectionCallback());

export default oauthRouter;
