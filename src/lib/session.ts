import { headers } from "next/headers";
import { auth } from "./auth";
import { session } from "../../auth-schema";

export const getSession = async () => {
  const sessionData = await auth.api.getSession({ headers: await headers() });

  if (!sessionData?.session) {
    return null;
  }

  return sessionData;
};
