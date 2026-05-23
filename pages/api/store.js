import fs from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "data", "store.json");

function readStore() {
  try {
    if (!fs.existsSync(STORE_PATH)) return { extraEmployees: [], passwords: {}, importedJobs: [] };
    return JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
  } catch {
    return { extraEmployees: [], passwords: {}, importedJobs: [] };
  }
}

function writeStore(data) {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(readStore());
  }
  if (req.method === "POST") {
    const current = readStore();
    const updated = { ...current, ...req.body };
    writeStore(updated);
    return res.status(200).json(updated);
  }
  res.status(405).end();
}
