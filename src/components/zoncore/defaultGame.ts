import { z } from "zod";

export const cellZod = z.object({
  color: z.enum(["red", "green", "blue", "orange", "yellow"]).default("red"),
  selected: z.boolean().default(false),
  star: z.boolean().default(false),
  clickable: z.boolean(),
});

export const arrayCellZod = z.array(cellZod);

export const boardColumnZod = z.object({
  minPoints: z.number(),
  maxPoints: z.number(),
  marked: z.enum(["none", "min", "max"]).default("none"),
  cells: arrayCellZod,
});

export const boardZod = z.record(z.string(), boardColumnZod);

export type boardObject = z.infer<typeof boardZod>;

export const defaultGame = {
  a: {
    minPoints: 3,
    maxPoints: 5,
    marked: "none",
    cells: [
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  b: {
    minPoints: 2,
    maxPoints: 3,
    marked: "none",
    cells: [
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  c: {
    minPoints: 2,
    maxPoints: 3,
    marked: "none",
    cells: [
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  d: {
    minPoints: 2,
    maxPoints: 3,
    marked: "none",
    cells: [
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  e: {
    minPoints: 1,
    maxPoints: 2,
    marked: "none",
    cells: [
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  f: {
    minPoints: 1,
    maxPoints: 2,
    marked: "none",
    cells: [
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  g: {
    minPoints: 1,
    maxPoints: 2,
    marked: "none",
    cells: [
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  h: {
    minPoints: 0,
    maxPoints: 1,
    marked: "none",
    cells: [
      {
        color: "green",
        selected: false,
        star: true,
        clickable: true,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: true,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: true,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: true,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: true,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: true,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: true,
      },
    ],
  },
  i: {
    minPoints: 1,
    maxPoints: 2,
    marked: "none",
    cells: [
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  j: {
    minPoints: 1,
    maxPoints: 2,
    marked: "none",
    cells: [
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  k: {
    minPoints: 1,
    maxPoints: 2,
    marked: "none",
    cells: [
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  l: {
    minPoints: 2,
    maxPoints: 3,
    marked: "none",
    cells: [
      {
        color: "orange",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  m: {
    minPoints: 2,
    maxPoints: 3,
    marked: "none",
    cells: [
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: true,
        clickable: false,
      },
    ],
  },
  n: {
    minPoints: 2,
    maxPoints: 3,
    marked: "none",
    cells: [
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
  o: {
    minPoints: 3,
    maxPoints: 5,
    marked: "none",
    cells: [
      {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: true,
        clickable: false,
      },
      {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
    ],
  },
};
