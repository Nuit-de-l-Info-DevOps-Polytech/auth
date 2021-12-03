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
  return new Promise<string | null>((resolve, reject) => {
    axios
      .get<string>(
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
