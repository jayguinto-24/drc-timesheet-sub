export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const baseUrl = (process.env.SIMPRO_URL || "").replace(/\/$/, "");
  const token = process.env.SIMPRO_API_KEY;

  if (!baseUrl || !token) {
    return res.status(500).json({ error: "Simpro credentials not configured." });
  }

  try {
    const { jobs } = await fetchAllJobs(baseUrl, token);
    return res.status(200).json({ jobs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function fetchAllJobs(baseUrl, token) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  let page = 1;
  let all = [];

  while (true) {
    const url = `${baseUrl}/api/v1.0/companies/0/jobs/?columns=ID,Name,OrderNo,Status&pageSize=250&page=${page}`;
    const resp = await fetch(url, { headers });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Simpro API returned ${resp.status}: ${text.slice(0, 200)}`);
    }

    const data = await resp.json();
    if (!Array.isArray(data) || data.length === 0) break;

    all = all.concat(data);
    if (data.length < 250) break;
    page++;
  }

  const jobs = all.map((job) => {
    const jobNo = job.OrderNo && job.OrderNo !== "0" ? job.OrderNo : String(job.ID);
    const name = job.Name || "";

    // Status is an object: { ID, Name, Color }
    const statusObj = job.Status || {};
    const statusName = statusObj.Name || "";
    const statusColor = statusObj.Color || "";

    // Strip the "Category : " prefix Simpro adds (e.g. "Job : New Job" → "New Job")
    const displayStatus = statusName.includes(" : ") ? statusName.split(" : ").slice(1).join(" : ") : statusName;

    // Mark as closed if the status name contains close/complete/cancel keywords
    const closed = /complet|cancel|closed|finish|paid/i.test(statusName);

    return {
      id: jobNo,
      label: name ? `${jobNo} – ${name}` : jobNo,
      description: name,
      status: closed ? "closed" : "open",
      simproStatus: displayStatus,
      simproColor: statusColor,
      manager: "",
      budget: "",
      headerJob: "",
      source: "simpro",
    };
  });

  return { jobs };
}
