import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../../utils/jwt";
import { addRefreshTokenToWhitelist } from "./v1.auth.services";
import { findUserByEmail, createUser } from "../users/v1.users.services";
import { validate } from "../../../middlewares/validate";
import { createUserSchema } from "../users/v1.user.schemas";
import { loginSchema } from "./v1.auth.schemas";

const router = express.Router();

router.post(
  "/sign_up",
  validate(createUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        throw new Error("You must provide an email and a password.");
      }

      const existingUser = await findUserByEmail(email);

      if (existingUser) {
        res.status(400).json({ error: "Bad Request" });
        throw new Error("Email already in use.");
      }

      const user = await createUser({ email, password });
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user.id, jti);
      await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
      res.json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        throw new Error("You must provide an email and a password.");
      }

      const existingUser = await findUserByEmail(email);

      if (!existingUser) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(
        existingUser.id,
        jti
      );
      await addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
