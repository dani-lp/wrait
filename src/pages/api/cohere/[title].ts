import { NextApiRequest, NextApiResponse } from "next";
import { getScriptIndex } from "../../../services/cohere";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;

  if (req.method === "GET") {
    const { body, statusCode } = await getScriptIndex(title as string)
    const generations = body.generations[0]?.text;

    const data = generations?.split("\n")
      .slice(1, 11)
      .map((line) => line.replace("  ", ""));

    res.status(200).json(data);
  }
  else {
    res.status(405)
  }

} 