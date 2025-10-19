import { headers } from "next/headers";
import { auth } from "./auth";
import { tryCatch } from "./try-catch";

export const getSession = async () => {
  const { data: sessionData, error } = await tryCatch(
    auth.api.getSession({ headers: await headers() })
  );

  if (error) {
    return null;
  }

  if (!sessionData) {
    return null;
  }

  return sessionData;
};
