import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(null);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    return Response.json(decoded);
  } catch {
    return Response.json(null);
  }
}