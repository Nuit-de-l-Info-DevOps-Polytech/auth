import axios from "axios";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

export function connectWithGitHub() {
  return passport.authenticate("github", { session: false });
}

export function handleGitHubConnectionCallback() {
  return passport.authenticate("github", {
    failureRedirect: "/",
    session: false,
  });
}

export function ConnectUserUsingGithub() {
  axios.get("https://api.github.com/user/emails").then((response) => {
    console.log(response);
  });
}
