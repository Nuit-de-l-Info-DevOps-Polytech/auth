import jwt, { JwtPayload } from "jsonwebtoken";
import conf from "../configs";
import {
  getSessionTokens,
  pushSessionToken,
} from "../Services/session.service";

export function createSession(Id: number) {
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.sign({ email: Id }, conf.jwtKey, { expiresIn: "72h" }, (err, token) => {
      if (err) return reject(err);
      if (!token) return resolve(token);

      pushSessionToken(Id, token)
        .then(() => {
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

export function getSessionPayload(token: string) {
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.verify(token, "secretkey", (err, payload) => {
      if (err) return reject(err);
      if (!payload) return resolve(payload);

      getSessionTokens(String(payload.email)).then((DBtoken) => {
        if (DBtoken?.find((val) => val === token)) return resolve(undefined);

        resolve(payload.email);
      });
    });
  });
}
