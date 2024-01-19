import { getAuth } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client";

import { users, userInsertSchema } from "../../db/SkullKingSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = getAuth(req);
  const client = createClient({
    url: process.env.TURSO_DB_URL ?? "",
    authToken: process.env.TURSO_DB_AUTH_TOKEN,
  });
  const db = drizzle(client);

  switch (req.method) {
    case "GET":
      try {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, userId ?? ""));
        if (user.length === 0) {
          const tempUser = {
            id: userId,
            name: "",
            joinedDate: dayjs().toJSON(),
            lastPlayed: dayjs().toJSON(),
          };
          const newUser = userInsertSchema.parse(tempUser);
          await db.insert(users).values(newUser).onConflictDoNothing();
          return res.status(200).json(newUser);
        } else {
          const user = await db
            .update(users)
            .set({ lastPlayed: dayjs().toJSON() })
            .where(eq(users.id, userId ?? ""))
            .returning();
          return res.status(200).json(user[0]);
        }
      } catch (e) {
        return res.status(500).json("Something went wrong getting user");
      }
    default:
      return res.status(503).json(`${req.method} not a valid method`);
  }
}
