import { Request, Response, NextFunction } from "express";
import { user } from "../Models/user.model";
import { createUser, getUserById } from "../Services/user.service";
import { checkPassword, cryptPassword } from "../Utils/password.util";
import { createSession } from "../Utils/session.util";

//Register user and return registered user's info
export function registerUser(
  req: Request<{}, {}, user>,
  res: Response,
  next: NextFunction
) {
  const user: user = req.body;

  cryptPassword(user.password).then((hash) => {
    createUser({
      id: "",
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      pseudo: user.pseudo,
      isAdmin: false,
      password: hash,
      sessiontoken: "",
      refreshtoken: "",
    })
      .then(() => {
        res.status(201).send("User registered !");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err.message);
      });
  });
}

//Return authentication token with user's info
export function loginUser(
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) {
  const Id = req.body.email;
  const password = req.body.password;

  getUserById(Id)
    .then((user) => {
      if (!user) return res.status(404).send("User not Found");

      const hash = user.password;

      checkPassword(password, hash)
        .then((match) => {
          if (!match) return res.status(401).send("Wrong password");

          createSession(user.email)
            .then((sessionToken) => {
              res.status(200).send(sessionToken);
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send(err.message);
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send(err.message);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
}
export function logoutUser(req: Request, res: Response, next: NextFunction) {}
export function passwordRequest(
  req: Request<{}, {}, { email: string }>,
  res: Response,
  next: NextFunction
) {}
export function changePassword(
  req: Request<{}, {}, { code: string; password: string }>,
  res: Response,
  next: NextFunction
) {}
