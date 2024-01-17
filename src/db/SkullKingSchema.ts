import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// USERS
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  lastPlayed: text("lastPlayed"),
  color: text("color"),
  joinedDate: text("joinedDate"),
});

export const userInsertSchema = createInsertSchema(users);
export const userSelectSchema = createSelectSchema(users);

// GAMES
export const games = sqliteTable("games", {
  id: text("id").primaryKey(),
  gameToken: text("id").unique(),
  currentRound: integer("currentRound"),
  completed: integer("id", { mode: "boolean" }),
  started: text("started"),
  ended: text("ended"),
  gameDate: text("gameDate"),
  scoreKeeper: text("scoreKeeper").references(() => users.id),
  player1: text("player1").references(() => users.id),
  player2: text("player2").references(() => users.id),
  player3: text("player3").references(() => users.id),
  player4: text("player4").references(() => users.id),
  player5: text("player5").references(() => users.id),
  player6: text("player6").references(() => users.id),
  player7: text("player7").references(() => users.id),
  player8: text("player8").references(() => users.id),
});

export const gamesInsertSchema = createInsertSchema(games);
export const gamesSelectSchema = createSelectSchema(games);

// PLAYERS
export const players = sqliteTable("players", {
  id: text("id").primaryKey(),
  playerId: text("playerId").references(() => users.id),
  r1bid: integer("r1bid"),
  r2bid: integer("r2bid"),
  r3bid: integer("r3bid"),
  r4bid: integer("r4bid"),
  r5bid: integer("r5bid"),
  r6bid: integer("r6bid"),
  r7bid: integer("r7bid"),
  r8bid: integer("r8bid"),
  r9bid: integer("r9bid"),
  r10bid: integer("r10bid"),
  r1tricks: integer("r1tricks"),
  r2tricks: integer("r2tricks"),
  r3tricks: integer("r3tricks"),
  r4tricks: integer("r4tricks"),
  r5tricks: integer("r5tricks"),
  r6tricks: integer("r6tricks"),
  r7tricks: integer("r7tricks"),
  r8tricks: integer("r8tricks"),
  r9tricks: integer("r9tricks"),
  r10tricks: integer("r10tricks"),
  r1bonus: integer("r1bonus"),
  r2bonus: integer("r2bonus"),
  r3bonus: integer("r3bonus"),
  r4bonus: integer("r4bonus"),
  r5bonus: integer("r5bonus"),
  r6bonus: integer("r6bonus"),
  r7bonus: integer("r7bonus"),
  r8bonus: integer("r8bonus"),
  r9bonus: integer("r9bonus"),
  r10bonus: integer("r10bonus"),
});

export const playersInsertSchema = createInsertSchema(players);
export const playersSelectSchema = createSelectSchema(players);

// FAVORITES
export const favorites = sqliteTable("favorites", {
  id: text("id").primaryKey(),
  userId: text("userId").references(() => users.id),
  favoriteId: text("favoriteId").references(() => users.id),
  createdDate: text("createdDate"),
});

export const favoritesInsertSchema = createInsertSchema(favorites);
export const favoritesSelectSchema = createSelectSchema(favorites);

// INVITE

export const invites = sqliteTable("invites", {
  id: text("id").primaryKey(),
  toId: text("toId").references(() => users.id),
  fromId: text("fromId").references(() => users.id),
  gameToken: text("gameToken").references(() => games.gameToken),
  gameId: text("gameId").references(() => games.id),
});

export const invitesInsertSchema = createInsertSchema(invites);
export const invitesSelectSchema = createSelectSchema(invites);
