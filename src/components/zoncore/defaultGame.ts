import { z } from "zod";

export enum availableColors {
  green = "green",
  yellow = "yellow",
  blue = "blue",
  red = "red",
  orange = "orange",
}

export const z_availableColors = z.nativeEnum(availableColors);

export const wildsZod = z
  .object({
    available: z.number(),
    selected: z.number(),
  })
  .transform((val, ctx) => {
    if (val.available + val.selected !== 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Sum of available and selected must equal 8.",
      });

      // This is a special symbol you can use to
      // return early from the transform function.
      // It has type `never` so it does not affect the
      // inferred return type.
      return z.NEVER;
    }
    return val;
  });

export type wildsObject = z.infer<typeof wildsZod>;

export const defaultWilds = { available: 8, selected: 0 };

export const totals = z.object({
  star: z.number().min(0).default(15),
  green: z.number().max(21).default(0),
  yellow: z.number().max(21).default(0),
  blue: z.number().max(21).default(0),
  red: z.number().max(21).default(0),
  orange: z.number().max(21).default(0),
  available: z.object({
    green: z.boolean().default(true),
    yellow: z.boolean().default(true),
    blue: z.boolean().default(true),
    red: z.boolean().default(true),
    orange: z.boolean().default(true),
  }),
});

export type totalsObject = z.infer<typeof totals>;

export const defaultTotals = {
  star: 15,
  green: 0,
  yellow: 0,
  blue: 0,
  red: 0,
  orange: 0,
  available: {
    green: true,
    yellow: true,
    blue: true,
    red: true,
    orange: true,
  },
};

export const cellZod = z.record(
  z.string(),
  z.object({
    color: z.enum(["red", "green", "blue", "orange", "yellow"]).default("red"),
    selected: z.boolean().default(false),
    star: z.boolean().default(false),
    clickable: z.boolean(),
  }),
);

export const boardColumnZod = z.object({
  minPoints: z.number(),
  maxPoints: z.number(),
  maxAvailable: z.boolean().default(false),
  colCompleted: z.boolean().default(false),
  cells: cellZod,
});

export const boardZod = z.record(z.string(), boardColumnZod);

export type boardObject = z.infer<typeof boardZod>;

export const defaultGame = {
  a: {
    minPoints: 3,
    maxPoints: 5,
    maxAvailable: true,
    colCompleted: false,
    wilds: {
      available: 8,
      selected: 0,
    },
    cells: {
      0: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "blue",
        selected: false,
        star: true,
        clickable: false,
      },
      3: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      6: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  b: {
    minPoints: 2,
    maxPoints: 3,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "blue",
        selected: false,
        star: true,
        clickable: false,
      },
      6: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  c: {
    minPoints: 2,
    maxPoints: 3,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "yellow",
        selected: false,
        star: true,
        clickable: false,
      },
      2: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      6: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  d: {
    minPoints: 2,
    maxPoints: 3,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "red",
        selected: false,
        star: true,
        clickable: false,
      },
      6: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  e: {
    minPoints: 1,
    maxPoints: 2,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "yellow",
        selected: false,
        star: true,
        clickable: false,
      },
      2: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      6: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  f: {
    minPoints: 1,
    maxPoints: 2,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "orange",
        selected: false,
        star: true,
        clickable: false,
      },
      4: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      6: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  g: {
    minPoints: 1,
    maxPoints: 2,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "green",
        selected: false,
        star: true,
        clickable: false,
      },
      3: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      6: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  h: {
    minPoints: 0,
    maxPoints: 1,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "green",
        selected: false,
        star: true,
        clickable: true,
      },
      1: {
        color: "orange",
        selected: false,
        star: false,
        clickable: true,
      },
      2: {
        color: "red",
        selected: false,
        star: false,
        clickable: true,
      },
      3: {
        color: "blue",
        selected: false,
        star: false,
        clickable: true,
      },
      4: {
        color: "blue",
        selected: false,
        star: false,
        clickable: true,
      },
      5: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: true,
      },
      6: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: true,
      },
    },
  },
  i: {
    minPoints: 1,
    maxPoints: 2,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "yellow",
        selected: false,
        star: true,
        clickable: false,
      },
      6: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  j: {
    minPoints: 1,
    maxPoints: 2,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "blue",
        selected: false,
        star: true,
        clickable: false,
      },
      2: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      6: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  k: {
    minPoints: 1,
    maxPoints: 2,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "red",
        selected: false,
        star: true,
        clickable: false,
      },
      6: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  l: {
    minPoints: 2,
    maxPoints: 3,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "orange",
        selected: false,
        star: true,
        clickable: false,
      },
      1: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      6: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  m: {
    minPoints: 2,
    maxPoints: 3,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      6: {
        color: "green",
        selected: false,
        star: true,
        clickable: false,
      },
    },
  },
  n: {
    minPoints: 2,
    maxPoints: 3,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "red",
        selected: false,
        star: true,
        clickable: false,
      },
      4: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      6: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
  o: {
    minPoints: 3,
    maxPoints: 5,
    maxAvailable: true,
    colCompleted: false,
    cells: {
      0: {
        color: "yellow",
        selected: false,
        star: false,
        clickable: false,
      },
      1: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      2: {
        color: "green",
        selected: false,
        star: false,
        clickable: false,
      },
      3: {
        color: "blue",
        selected: false,
        star: false,
        clickable: false,
      },
      4: {
        color: "red",
        selected: false,
        star: false,
        clickable: false,
      },
      5: {
        color: "orange",
        selected: false,
        star: true,
        clickable: false,
      },
      6: {
        color: "orange",
        selected: false,
        star: false,
        clickable: false,
      },
    },
  },
};
