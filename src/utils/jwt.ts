import jwt from "jsonwebtoken";
import { env } from "./env";
import crypto from "crypto";

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId: userId }, env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
}

export function generateRefreshToken(userId: string, jti: string) {
  return jwt.sign(
    {
      userId,
      jti,
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: "24h",
    }
  );
}

export function generateTokens(userId: string, jti: string) {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export function hashToken(token: string) {
  return crypto.createHash("sha512").update(token).digest("hex");
}
