import axios from "axios";
import conf from "../configs";

export function pushSessionToken(Id: number, token: string) {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .post(conf.DB_URL + "session_token/createSessionTokenWithUserId/" + Id, {
        token: token,
      })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getSessionTokens(Id: string) {
  return new Promise<Array<string> | null>((resolve, reject) => {
    axios
      .get<Array<string>>(
        conf.DB_URL + "session_token/createSessionTokenWithUserId/" + Id
      )
      .then((token) => {
        resolve(token.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteSessionToken(token: string | undefined) {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .delete(conf.DB_URL + "session_token/deleteSessionTokenByToken/" + token)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
