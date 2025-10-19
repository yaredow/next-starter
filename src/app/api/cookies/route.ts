import { cookies } from "next/headers";

type CookieRequestBody = {
  name: string;
  value: string;
  options?: {
    path?: string;
    maxAge?: number;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  };
};

export async function POST(request: Request) {
  try {
    const body: CookieRequestBody = await request.json();
    const { name, value, options = {} } = body;

    if (typeof name !== "string" || typeof value !== "string") {
      return Response.json(
        { error: "Invalid request: name and value must be strings" },
        { status: 400 }
      );
    }

    const { path = "/", maxAge, secure, sameSite } = options;
    const cookieStore = await cookies();

    cookieStore.set(name, value, {
      path,
      maxAge,
      secure,
      sameSite,
    });

    return Response.json({ ok: true });
  } catch (_error) {
    // Log error for debugging
    return Response.json({ error: "Failed to set cookie" }, { status: 500 });
  }
}
