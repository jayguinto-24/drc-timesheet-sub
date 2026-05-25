export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const baseUrl = (process.env.SIMPRO_URL || "").replace(/\/$/, "");
  const token = process.env.SIMPRO_API_KEY;

  if (!baseUrl || !token) {
    return res.status(500).json({ error: "Simpro credentials not configured." });
  }

  try {
    const { jobs, sample } = await fetchAllJobs(baseUrl, token);
    return res.status(200).json({ jobs, debug_sample: sample });
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

  const sample = all.slice(0, 3).map(j => ({ ID: j.ID, Name: j.Name, OrderNo: j.OrderNo, Status: j.Status, _raw_keys: Object.keys(j) }));

  const jobs = all.map((job) => {
    const jobNo = job.OrderNo && job.OrderNo !== "0" ? job.OrderNo : String(job.ID);
    const name = job.Name || "";
    const closed = ["Complete", "Cancel"].includes(job.Status);

    return {
      id: jobNo,
      label: name ? `${jobNo} – ${name}` : jobNo,
      description: name,
      status: closed ? "closed" : "open",
      simproStatus: job.Status || "",
      manager: "",
      budget: "",
      headerJob: "",
      source: "simpro",
    };
  });

  return { jobs, sample };
}
