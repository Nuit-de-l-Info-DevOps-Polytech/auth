import bcrypt from "bcrypt";

export function cryptPassword(pass: string) {
  return new Promise<string>((resolve, reject) => {
    bcrypt
      .hash(pass, 10)
      .then((hash) => {
        resolve(hash);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function checkPassword(password: string, hash: string) {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt
      .compare(password, hash)
      .then((match) => {
        resolve(match);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
