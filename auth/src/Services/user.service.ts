import { user } from "../Models/user.model";
import axios from "axios";
import conf from "../configs";

export function createUser(user: user) {
  return new Promise<user>((resolve, reject) => {
    //TODO Call DB with axios
  });
}

export function getUserById(email: string) {
  return new Promise<user | null>((resolve, reject) => {
    //TODO getUserByEmail
  });
}
