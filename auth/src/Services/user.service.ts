import { user } from "../Models/user.model";
import axios from "axios";
import conf from "../configs";

export function createUser(user: user) {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .post(conf.DB_URL + "utilisateur/createUtilisateur", user)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getUserByEmail(Email: string) {
  return new Promise<user | null>((resolve, reject) => {
    console.log(Email);
    axios
      .get<user>(conf.DB_URL + "utilisateur/getUtilisateurByMail/" + Email)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
