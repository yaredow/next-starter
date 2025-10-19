declare global {
  type Window = Window & {
    cookieStore?: {
      set: (options: {
        name: string;
        value: string;
        expires?: Date;
        path?: string;
        secure?: boolean;
        sameSite?: "strict" | "lax" | "none";
      }) => Promise<void>;
    };
  };
}

type CookieOptions = {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

export async function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): Promise<void> {
  const { path = "/", maxAge, secure, sameSite } = options;

  // Use Cookie Store API if available
  if (typeof window !== "undefined" && window.cookieStore) {
    const cookieStoreOptions: Parameters<typeof window.cookieStore.set>[0] = {
      name,
      value,
      path,
      secure,
      sameSite,
    };

    if (maxAge !== undefined) {
      const MILLISECONDS_PER_SECOND = 1000;
      cookieStoreOptions.expires = new Date(
        Date.now() + maxAge * MILLISECONDS_PER_SECOND
      );
    }

    await window.cookieStore.set(cookieStoreOptions);
    return;
  }

  // Fallback to server-side API route
  if (typeof window !== "undefined") {
    const response = await fetch("/api/cookies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        name,
        value,
        options: { path, maxAge, secure, sameSite },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to set cookie: ${response.statusText}`);
    }
  }
}
