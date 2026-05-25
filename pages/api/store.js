import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const KEY = "drc_store";

const DEFAULT_STORE = { extraEmployees: [], passwords: {}, importedJobs: [], entries: [] };

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await redis.get(KEY);
    return res.status(200).json(data || DEFAULT_STORE);
  }
  if (req.method === "POST") {
    const current = (await redis.get(KEY)) || DEFAULT_STORE;
    const updated = { ...current, ...req.body };
    await redis.set(KEY, updated);
    return res.status(200).json(updated);
  }
  res.status(405).end();
}
