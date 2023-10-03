import bcrypt from "bcrypt";
import db from "../../../utils/db";

export function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export function createUser(user: { email: string; password: string }) {
  return db.user.create({
    data: {
      email: user.email,
      password: bcrypt.hashSync(user.password, 12),
    },
  });
}

export function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}
export function resetUserPassword(id: string, password: string) {
  return db.user.update({
    where: {
      id,
    },
    data: {
      password: bcrypt.hashSync(password, 12),
    },
  });
}
