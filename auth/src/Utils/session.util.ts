import jwt, { JwtPayload } from "jsonwebtoken";
import { getSessionToken, setSessionToken } from "../Services/session.service";

export function createSession(email: string) {
  return new Promise<string | undefined>((resolve, reject) => {
    jwt.sign({ email }, "secretkey", { expiresIn: "72h" }, (err, token) => {
      if (err) return reject(err);
      if (!token) return resolve(token);

      setSessionToken(email, token)
        .then((createdToken) => {
          resolve(createdToken);
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

      getSessionToken(String(payload.email)).then((DBtoken) => {
        if (DBtoken !== token) return resolve(undefined);

        resolve(DBtoken);
      });
    });
  });
}
