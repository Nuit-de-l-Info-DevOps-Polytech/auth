import passport from "passport";
import { Strategy as FacebookStrategy, Profile } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github";
import conf from "../configs";

export function connectGitHub() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: conf.GitHub_ID,
        clientSecret: conf.GitHub_secret,
        callbackURL: "http://localhost:3000/api/oauth/github/callback",
        scope: ["user:email"],
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        cb(null, profile);
      }
    )
  );
}

// function HandleGitHubInfo(
//   accessToken: string,
//   refreshToken: string,
//   profile: GitHubStrategy.Profile,
//   cb: any
// ) {
//   console.log(profile);
//   cb(null, profile);
// }
