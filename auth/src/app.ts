import express from "express";
import conf from "./configs";
import userRouter from "./Routes/user.route";
import passport from "passport";
import cors from "cors";
import axios from "axios";
import to from 'await-to-js';
import { createUser, getUserByEmail } from "./Services/user.service";

//Init Express app
const app = express();

//Setup constants
const port = conf.port;

//JSON body parser for requests with body
//app.use(express.json());

app.use(cors())

var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: 'c3a65151141c8104f4d4',
    clientSecret: '6928e06039277969b5f4958e87126a3cafe2cdeb',
    callbackURL: "https://auth.ndl.iverly.net/auth/github/callback",
    scope: ["user:email"],
  },
  async function(accessToken:any, refreshToken:any, profile:any, cb:any) {
    if (!accessToken) return cb('no token', null);
    let [err, result] = await to(axios.get('https://api.github.com/user/emails', { headers: { Authorization: 'Bearer ' + accessToken } }))
    if (err) return cb(err, null);
    const email = result?.data?.find((e: any) => e.primary)?.email;
    if (!email) return cb('no mail', null);
    
    let [err2] = await to(getUserByEmail(email));
    if (err2) {
      if ((err2 as any)?.response?.status === 404) {
        to(createUser({
          id: null,
          mail: email,
          prenom: profile.login,
          nom: '',
          pseudo: profile.login,
          lieuNaissance: "",
          isAdmin: false,
          password: profile.node_id,
          sessionToken: null,
        }))
      }
    }

    cb(null, profile);
  }
));

app.use(passport.initialize());

app.get('/auth/github',
  passport.authenticate('github', { session: false }));

app.get('/auth/github/callback', 
  passport.authenticate('github', {failureRedirect: 'https://ndl.iverly.net/error', session: false}),
  function(req, res) {
    res.redirect('https://ndl.iverly.net/?l=1');
  });

app.use("/api/auth", userRouter);
//All Routes

//Listen on specific port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
