import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getScriptIndex } from "../../../services/cohere";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const cohereRouter = createTRPCRouter({
  generateScript: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      const { body, statusCode } = await getScriptIndex(input.title);

      if (statusCode !== 200) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Bad Request" });
      }

      const generations = body.generations[0]?.text;

      return generations?.split("\n")
        .slice(1, 11)
        .map((line) => line.replace("  ", ""));
    }),
})