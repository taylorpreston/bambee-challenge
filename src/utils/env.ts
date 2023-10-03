import z from "zod";

const envSchema = z.object({
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  PORT: z.string().default("3000").transform(Number),
  TEST_TOKEN: z.string().optional(),
});

export const env = envSchema.parse({
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  PORT: process.env.PORT,
  TEST_TOKEN: process.env.TEST_TOKEN,
});
