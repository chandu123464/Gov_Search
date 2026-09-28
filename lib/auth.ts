import crypto from "crypto";

const SESSION_SECRET = process.env.SESSION_SECRET || "gov-search-fja-secret-key-2026-safe-auth";

/**
 * Hash password using Node's crypto scrypt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify password against stored salt:hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

export type SessionPayload = {
  userId: string;
  isAdmin?: boolean;
  exp: number;
};

export function createRandomToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

/**
 * Generate a signed session token
 */
export function createSessionToken(userId: string, isAdmin: boolean = false): string {
  const payload = Buffer.from(JSON.stringify({ userId, isAdmin, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64url");
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

/**
 * Verify signed session token and return SessionPayload
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;
    const expectedSignature = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (data.exp < Date.now()) return null;
    return {
      userId: data.userId,
      isAdmin: Boolean(data.isAdmin),
      exp: data.exp,
    };
  } catch {
    return null;
  }
}

