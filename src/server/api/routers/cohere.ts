import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getScriptIndex } from "../../../services/cohere";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const cohereRouter = createTRPCRouter({
  generateScript: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      const { body, statusCode } = await getScriptIndex(input.title)

      if (statusCode !== 200) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Bad Request" });
      }

      return body.generations[0]?.text;
    }),
})