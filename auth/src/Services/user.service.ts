import { user } from "../Models/user.model";
import axios from "axios";
import conf from "../configs";

export function createUser(user: user) {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .post(conf.DB_URL, user)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getUserById(Id: string) {
  return new Promise<user | null>((resolve, reject) => {
    axios
      .post<user>(conf.DB_URL, Id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
