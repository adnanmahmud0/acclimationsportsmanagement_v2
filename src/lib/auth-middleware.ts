import { jwtHelper } from "./jwt";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export async function verifyAuth(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwtHelper.verifyToken(token, process.env.JWT_SECRET as string);
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}
