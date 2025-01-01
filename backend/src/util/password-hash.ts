import { createHash } from "crypto";

export function hashPassword(unhashedPassword: string): string {
  return createHash("sha256").update(unhashedPassword).digest("base64");
}
