import db from "../../../utils/db";
import { hashToken } from "../../../utils/jwt";

// used when we create a refresh token.
export function addRefreshTokenToWhitelist({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: string;
}) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

export function findRefreshTokenById(id: string) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}
