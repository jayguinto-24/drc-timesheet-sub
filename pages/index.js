import { useState, useEffect } from "react";

const JOBS = [
  { id: "AP2601101", label: "AP2601101 – Switchboard Install A", status: "open" },
  { id: "AP2601102", label: "AP2601102 – Panel Wiring B", status: "open" },
  { id: "AP2602103", label: "AP2602103 – Site Inspection C", status: "open" },
  { id: "AP2602104", label: "AP2602104 – Factory Test D", status: "open" },
  { id: "AP2510201", label: "AP2510201 – Completed Job X", status: "closed" },
  { id: "AP2511202", label: "AP2511202 – Completed Job Y", status: "closed" },
];

const EMPLOYEES = [
  { id: "E001", name: "Nicole Campbell", type: "permanent", contract: "full-time", email: "nicolehaig32@gmail.com" },
  { id: "E002", name: "Brett Campbell", type: "permanent", contract: "full-time", email: "brett@drcswitchboards.com.au" },
  { id: "E003", name: "Dennis Rozanic", type: "permanent", contract: "full-time", email: "dennis.rozanic@bigpond.com" },
  { id: "E004", name: "David Webb", type: "permanent", contract: "full-time", email: "david@drcswitchboards.com.au" },
  { id: "E005", name: "Matthew Webb", type: "permanent", contract: "full-time", email: "m.webb@live.com.au" },
  { id: "E006", name: "Kyle Davidson", type: "permanent", contract: "full-time", email: "kyle.davidson86@yahoo.com" },
  { id: "E007", name: "Aaron Mellington", type: "permanent", contract: "full-time", email: "ezmel@hotmail.com" },
  { id: "E008", name: "Stuart Wallis", type: "permanent", contract: "full-time", email: "stuart@murtarapark.com" },
  { id: "E009", name: "Benjamin Keen", type: "permanent", contract: "full-time", email: "benkeen@hotmail.com" },
  { id: "E010", name: "David Epps", type: "permanent", contract: "full-time", email: "depps@drcswitchboards.com.au" },
  { id: "E011", name: "Lester Aguinaldo", type: "permanent", contract: "full-time", email: "l.aguinaldo@yahoo.com" },
  { id: "E012", name: "Rodney Slow", type: "permanent", contract: "full-time", email: "rodney.slow@icloud.com" },
  { id: "E013", name: "Kristy-Anne Campbell", type: "permanent", contract: "full-time", email: "kristy.ac.85@gmail.com" },
  { id: "E014", name: "Susan Stevens", type: "permanent", contract: "full-time", email: "sacurlis@gmail.com" },
  { id: "E015", name: "Quentin Cook", type: "permanent", contract: "full-time", email: "quentin@bigpond.com" },
  { id: "E016", name: "Gillian Blunsom", type: "permanent", contract: "full-time", email: "jill.blunsom@gmail.com" },
  { id: "E017", name: "Everad Seller", type: "permanent", contract: "full-time", email: "regan9slr@gmail.com" },
  { id: "E018", name: "Prodromos Daglaroglou", type: "permanent", contract: "full-time", email: "mobprodromos@gmail.com" },
  { id: "E019", name: "Kalapu Gamage", type: "permanent", contract: "full-time", email: "malakatharindu11@gmail.com" },
  { id: "E020", name: "Yohan Gishan Perera", type: "permanent", contract: "full-time", email: "shevanthap@gmail.com" },
  { id: "E021", name: "Mark Arena", type: "permanent", contract: "full-time", email: "markfunk76@gmail.com" },
  { id: "E022", name: "Ofer Notkovitch", type: "permanent", contract: "full-time", email: "notfer@yahoo.com" },
  { id: "E023", name: "Stuart Wallis (DRC)", type: "permanent", contract: "full-time", email: "stuart@drcswitchboards.com.au" },
  { id: "E024", name: "Callum Donnelly", type: "permanent", contract: "full-time", email: "cal2k12@gmail.com" },
  { id: "E025", name: "Chipo Hwani", type: "permanent", contract: "full-time", email: "cahwani@gmail.com" },
  { id: "E026", name: "Camdyn Gaskin", type: "permanent", contract: "full-time", email: "camdyngaskin@gmail.com" },
  { id: "E027", name: "Troy Henderson", type: "permanent", contract: "full-time", email: "hendersontroyj@gmail.com" },
  { id: "E028", name: "Rangana Gunasekara", type: "permanent", contract: "full-time", email: "anushkirangana@gmail.com" },
  { id: "E029", name: "Luke Ryan", type: "permanent", contract: "full-time", email: "ryan.s.luke4@gmail.com" },
  { id: "E030", name: "Matthew Benstead", type: "permanent", contract: "full-time", email: "matt_benstead@yahoo.com" },
  { id: "E031", name: "Erol Savas", type: "permanent", contract: "full-time", email: "zentraderau@icloud.com" },
  { id: "E032", name: "Jade Martinet-Andrieux", type: "permanent", contract: "full-time", email: "jade.martinet.a@gmail.com" },
  { id: "E033", name: "Josiah Simpson", type: "permanent", contract: "full-time", email: "jtksimpson@gmail.com" },
  { id: "E034", name: "Kresimir Vrabec", type: "permanent", contract: "full-time", email: "vrabeck@yahoo.com.au" },
  { id: "E035", name: "Adam Moran", type: "permanent", contract: "full-time", email: "goapeshit505@gmail.com" },
  { id: "E036", name: "Jozef Beska", type: "permanent", contract: "full-time", email: "jozef.beska10@gmail.com" },
  { id: "E037", name: "Brian Joseph", type: "permanent", contract: "full-time", email: "brianbs28@yahoo.com" },
  { id: "E038", name: "Jared Foy", type: "permanent", contract: "full-time", email: "jazza-29@hotmail.com" },
  { id: "E039", name: "Mick Thompson", type: "permanent", contract: "full-time", email: "micksparky13@gmail.com" },
  { id: "E040", name: "Jennifer Campbell", type: "permanent", contract: "full-time", email: "jenny@drcswitchboards.com.au" },
];

const LEAVE_TYPES = [
  "Annual Leave",
  "Personal Leave",
  "Public Holiday",
  "Roster Day Off",
];

// Pay cycle: Thursday to Wednesday, fortnightly (9-day fortnight)
// RDO falls on every alternate Monday — determined by the pay period start date
// RDO_MONDAYS: all RDO Mondays in 2026 extracted from DRC RDO Calendar
const RDO_MONDAYS_2026 = new Set([
  "2026-01-12","2026-01-26","2026-02-09","2026-02-23",
  "2026-03-09","2026-03-23","2026-04-06","2026-04-20",
  "2026-05-04","2026-05-18","2026-06-01","2026-06-15",
  "2026-06-29","2026-07-06","2026-07-20","2026-08-03",
  "2026-08-17","2026-08-31","2026-09-14","2026-09-28",
  "2026-10-12","2026-11-02","2026-11-16","2026-11-30",
  "2026-12-07",
]);

// Public Holidays 2026 (QLD / national)
const PUBLIC_HOLIDAYS_2026 = new Set([
  "2026-01-01","2026-01-26","2026-03-09","2026-04-03",
  "2026-04-06","2026-06-08","2026-12-25","2026-12-26",
]);

// Fortnight structure — days relative to period start (Thursday = day 0)
// Offsets from period start Thursday:
// Thu(0) Fri(1) Sat(2) Sun(3) Mon(4) Tue(5) Wed(6) Thu(7) Fri(8)
// Sat(9) Sun(10) Mon(11) Tue(12) Wed(13)
const FORTNIGHT_OFFSETS = [
  { label: "Thu",              offset: 0,  week: 1, defaultHours: 8.5 },
  { label: "Fri",              offset: 1,  week: 1, defaultHours: 8.5 },
  { label: "Sat",              offset: 2,  week: 1, defaultHours: 0, isWeekend: true },
  { label: "Sun",              offset: 3,  week: 1, defaultHours: 0, isWeekend: true },
  { label: "Mon",              offset: 4,  week: 1, defaultHours: 8.5 },
  { label: "Tue",              offset: 5,  week: 1, defaultHours: 8.5 },
  { label: "Wed",              offset: 6,  week: 1, defaultHours: 8.5 },
  { label: "Thu",              offset: 7,  week: 1, defaultHours: 8.5 },
  { label: "Fri",              offset: 8,  week: 1, defaultHours: 8.0 },
  { label: "Sat",              offset: 9,  week: 2, defaultHours: 0, isWeekend: true },
  { label: "Sun",              offset: 10, week: 2, defaultHours: 0, isWeekend: true },
  { label: "Mon",              offset: 11, week: 2, defaultHours: 0 }, // RDO Mon — dynamic
  { label: "Tue",              offset: 12, week: 2, defaultHours: 8.5 },
  { label: "Wed",              offset: 13, week: 2, defaultHours: 8.5 },
];

// Helper: format date as YYYY-MM-DD
function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}

// Build a fortnight template from a given period start date (Thursday)
function buildFortnightFromDate(periodStartStr) {
  if (!periodStartStr) {
    // Default static template (no date selected yet)
    return FORTNIGHT_OFFSETS.map(d => ({
      day: d.offset === 11 ? "Mon (RDO)" : d.label,
      week: d.week,
      isRDO: d.offset === 11,
      isWeekend: d.isWeekend || false,
      defaultHours: d.defaultHours,
    }));
  }
  const start = new Date(periodStartStr + "T00:00:00");
  return FORTNIGHT_OFFSETS.map(d => {
    const date = new Date(start);
    date.setDate(start.getDate() + d.offset);
    const dateStr = fmtDate(date);
    const isRDO = d.offset === 11 && RDO_MONDAYS_2026.has(dateStr);
    const isHoliday = PUBLIC_HOLIDAYS_2026.has(dateStr);
    const dayNum = date.getDate();
    const monthShort = date.toLocaleString("en-AU", { month: "short" });
    const label = `${d.label} ${dayNum} ${monthShort}`;
    return {
      day: label,
      week: d.week,
      isRDO,
      isHoliday,
      isWeekend: d.isWeekend || false,
      defaultHours: isRDO ? 0 : d.defaultHours,
      date: dateStr,
    };
  });
}

// Keep a static version for initial state
const FORTNIGHT_TEMPLATE = buildFortnightFromDate(null);

const openJobs = JOBS.filter((j) => j.status === "open"); // base — extended dynamically in App

function Badge({ type }) {
  const styles = {
    permanent: { bg: "#dcfce7", color: "#166534", label: "Permanent" },
    "labour-hire": { bg: "#fef9c3", color: "#92400e", label: "Labour Hire" },
    "full-time": { bg: "#dbeafe", color: "#1e40af", label: "Full-time" },
    "part-time": { bg: "#ede9fe", color: "#5b21b6", label: "Part-time" },
    casual: { bg: "#fee2e2", color: "#991b1b", label: "Casual" },
  };
  const s = styles[type] || styles.permanent;
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600, letterSpacing: 0.3 }}>
      {s.label}
    </span>
  );
}

function JobBadge({ status, simproStatus, simproColor }) {
  // Handle legacy format where simproStatus was stored as a full Simpro object
  const rawName = typeof simproStatus === "object" ? (simproStatus?.Name || "") : (simproStatus || "");
  const rawColor = typeof simproStatus === "object" ? (simproStatus?.Color || simproColor || "") : (simproColor || "");
  const displayName = rawName.includes(" : ") ? rawName.split(" : ").slice(1).join(" : ") : rawName;

  if (displayName) {
    const color = rawColor || "#64748b";
    return (
      <span style={{ display:"inline-flex", alignItems:"center", gap:5, background: color + "22", color, borderRadius:6, padding:"2px 10px", fontSize:11, fontWeight:600, maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
        <span style={{ width:7, height:7, borderRadius:"50%", background:color, flexShrink:0, display:"inline-block" }} />
        {displayName}
      </span>
    );
  }
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: status === "open" ? "#dcfce7" : "#f1f5f9",
      color: status === "open" ? "#166534" : "#64748b",
      borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: status === "open" ? "#22c55e" : "#94a3b8", display: "inline-block" }} />
      {status === "open" ? "Open" : "Closed"}
    </span>
  );
}

function Nav({ current, onChange }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "timesheet", label: "Submit Timesheet" },
    { id: "review", label: "Review & Export" },
    { id: "jobs", label: "Job Register" },
    { id: "employees", label: "Employees" },
  ];
  return (
    <nav style={{ display: "flex", gap: 4, background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "0 24px" }}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          background: "none", border: "none", cursor: "pointer",
          padding: "14px 18px", fontSize: 13.5, fontWeight: current === t.id ? 600 : 400,
          color: current === t.id ? "#1e293b" : "#64748b",
          borderBottom: current === t.id ? "2px solid #1e293b" : "2px solid transparent",
          transition: "all 0.15s", fontFamily: "inherit"
        }}>
          {t.label}
        </button>
      ))}
    </nav>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px 20px", minWidth: 140 }}>
      <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: accent || "#1e293b", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Dashboard({ entries, extraEmployees = [], importedJobs = [] }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const allEmployees = [...EMPLOYEES, ...extraEmployees];
  const allJobs = [...JOBS, ...importedJobs];
  const allOpenJobs = allJobs.filter(j => j.status === "open");

  const permanentEmps = allEmployees.filter(e => e.type === "permanent");
  const labourHireEmps = allEmployees.filter(e => e.type === "labour-hire");

  const totalHours = entries.reduce((s, e) => s + Number(e.totalHours || 0), 0);
  const thisWeekEntries = entries.length;

  // Get unique periods from entries
  const periods = [...new Set(entries.map(e => e.periodStart).filter(Boolean))].sort().reverse();

  // Filter entries by period
  const periodFiltered = selectedPeriod === "all" ? entries : entries.filter(e => e.periodStart === selectedPeriod);

  // Hours per employee (for "All Report")
  const empHoursMap = {};
  periodFiltered.forEach(e => {
    const id = e.employee?.id;
    if (!id) return;
    if (!empHoursMap[id]) empHoursMap[id] = { emp: e.employee, hours: 0, entries: 0, jobs: new Set(), leaveTypes: [] };
    empHoursMap[id].hours += Number(e.totalHours || 0);
    empHoursMap[id].entries++;
    e.rows?.forEach(r => {
      const jobs = r.jobEntries || (r.jobCode ? [{ jobCode: r.jobCode }] : []);
      jobs.forEach(j => j.jobCode && empHoursMap[id].jobs.add(j.jobCode));
      if (r.leaveType) empHoursMap[id].leaveTypes.push(r.leaveType);
    });
  });

  const empRows = Object.values(empHoursMap).sort((a, b) => b.hours - a.hours);
  const labourHireRows = empRows.filter(r => r.emp?.type === "labour-hire");
  const permanentRows = empRows.filter(r => r.emp?.type === "permanent");

  // Individual employee detail
  const empDetail = selectedEmployee !== "all"
    ? periodFiltered.filter(e => e.employee?.id === selectedEmployee)
    : [];

  const tabStyle = (id) => ({
    background: activeTab === id ? "#1e293b" : "#f1f5f9",
    color: activeTab === id ? "#fff" : "#64748b",
    border: "none", borderRadius: 8, padding: "7px 18px",
    fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  });

  const card = (children, style = {}) => (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20, ...style }}>
      {children}
    </div>
  );

  const sectionTitle = (text) => (
    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>{text}</h3>
  );

  return (
    <div style={{ padding: "28px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>DRC Switchboards – Admin Dashboard</h2>
        <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}>Fortnight cycle: Thursday → Wednesday &nbsp;|&nbsp; 9-day fortnight (RDO every 2nd Monday)</p>
      </div>

      {/* Top stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
        <StatCard label="Total Hours Logged" value={totalHours.toFixed(1)} sub="all submissions" accent="#2563eb" />
        <StatCard label="Open Jobs" value={allOpenJobs.length} sub="available to book" accent="#16a34a" />
        <StatCard label="Permanent" value={permanentEmps.length} sub="employees" accent="#7c3aed" />
        <StatCard label="Labour Hire" value={labourHireEmps.length} sub="employees" accent="#f59e0b" />
        <StatCard label="Timesheet Submissions" value={thisWeekEntries} sub="total submitted" />
      </div>

      {/* Period filter */}
      {periods.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>Filter by period:</label>
          <select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}
            style={{ padding: "6px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#1e293b", background: "#fff" }}>
            <option value="all">All periods</option>
            {periods.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      )}

      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { id: "overview", label: "📊 Overview" },
          { id: "everyone", label: "👥 All Employees Report" },
          { id: "labourhire", label: "🏗️ Labour Hire Report" },
          { id: "individual", label: "🔍 Individual Report" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={tabStyle(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {card(<>
            {sectionTitle("Open Jobs")}
            {allOpenJobs.length === 0
              ? <p style={{ color: "#94a3b8", fontSize: 13 }}>No open jobs.</p>
              : allOpenJobs.map(j => (
                <div key={j.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{j.id}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{j.description || j.label?.split("–")[1]?.trim()}</div>
                  </div>
                  <JobBadge status={j.status} simproStatus={j.simproStatus} simproColor={j.simproColor} />
                </div>
              ))
            }
          </>)}

          {card(<>
            {sectionTitle("Pay Cycle Overview")}
            {FORTNIGHT_TEMPLATE.filter(d => !d.isWeekend).map((d, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #f8fafc", opacity: d.isRDO ? 0.45 : 1 }}>
                <span style={{ fontSize: 12, color: "#475569", width: 130 }}>Week {d.week} – {d.day}</span>
                {d.isRDO
                  ? <span style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic" }}>Roster Day Off</span>
                  : <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{d.defaultHours}h</span>
                }
              </div>
            ))}
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Total Fortnight</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#2563eb" }}>76.0h</span>
            </div>
          </>)}

          {card(<>
            {sectionTitle("Workforce Summary")}
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1, background: "#f0fdf4", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#16a34a" }}>{permanentEmps.length}</div>
                <div style={{ fontSize: 12, color: "#15803d", fontWeight: 600 }}>Permanent</div>
              </div>
              <div style={{ flex: 1, background: "#fffbeb", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#d97706" }}>{labourHireEmps.length}</div>
                <div style={{ fontSize: 12, color: "#b45309", fontWeight: 600 }}>Labour Hire</div>
              </div>
            </div>
            {labourHireEmps.slice(0, 6).map(e => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 13, color: "#1e293b" }}>{e.name}</div>
                <Badge type="labour-hire" />
              </div>
            ))}
            {labourHireEmps.length > 6 && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 8 }}>+{labourHireEmps.length - 6} more labour hire</div>}
          </>, { gridColumn: "1 / -1" })}
        </div>
      )}

      {/* ── ALL EMPLOYEES REPORT ── */}
      {activeTab === "everyone" && (
        <div>
          {empRows.length === 0
            ? card(<p style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>No timesheet submissions yet.</p>)
            : <>
              {/* Summary table */}
              {card(<>
                {sectionTitle(`All Employees — ${selectedPeriod === "all" ? "All Periods" : `Period: ${selectedPeriod}`} (${empRows.length} employees)`)}
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {["Employee", "Type", "Contract", "Submissions", "Total Hours", "Jobs Worked", "Leave Types"].map(h => (
                          <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, color: "#475569", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {empRows.map((row, i) => (
                        <tr key={row.emp?.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafcff", borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "9px 12px", fontWeight: 600, color: "#1e293b" }}>{row.emp?.name}</td>
                          <td style={{ padding: "9px 12px" }}><Badge type={row.emp?.type} /></td>
                          <td style={{ padding: "9px 12px" }}><Badge type={row.emp?.contract} /></td>
                          <td style={{ padding: "9px 12px", color: "#64748b" }}>{row.entries}</td>
                          <td style={{ padding: "9px 12px", fontWeight: 700, color: "#2563eb" }}>{row.hours.toFixed(1)}h</td>
                          <td style={{ padding: "9px 12px" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                              {[...row.jobs].slice(0, 3).map(j => (
                                <span key={j} style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: 5, padding: "1px 7px", fontSize: 11, fontWeight: 600 }}>{j}</span>
                              ))}
                              {row.jobs.size > 3 && <span style={{ fontSize: 11, color: "#94a3b8" }}>+{row.jobs.size - 3}</span>}
                            </div>
                          </td>
                          <td style={{ padding: "9px 12px", fontSize: 11, color: "#64748b" }}>
                            {[...new Set(row.leaveTypes)].join(", ") || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ borderTop: "2px solid #e2e8f0", background: "#f8fafc" }}>
                        <td colSpan={4} style={{ padding: "9px 12px", fontWeight: 700, color: "#1e293b" }}>TOTAL</td>
                        <td style={{ padding: "9px 12px", fontWeight: 700, color: "#2563eb", fontSize: 14 }}>
                          {empRows.reduce((s, r) => s + r.hours, 0).toFixed(1)}h
                        </td>
                        <td colSpan={2} />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>)}
            </>
          }
        </div>
      )}

      {/* ── LABOUR HIRE REPORT ── */}
      {activeTab === "labourhire" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Summary cards */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <StatCard label="Labour Hire Total" value={labourHireEmps.length} sub="employees on file" accent="#f59e0b" />
            <StatCard label="Hours Logged" value={labourHireRows.reduce((s,r)=>s+r.hours,0).toFixed(1)} sub="labour hire hours" accent="#f59e0b" />
            <StatCard label="Submissions" value={labourHireRows.reduce((s,r)=>s+r.entries,0)} sub="total entries" />
          </div>

          {labourHireRows.length === 0
            ? card(<p style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>No labour hire timesheet submissions yet.</p>)
            : card(<>
                {sectionTitle(`Labour Hire Report — ${selectedPeriod === "all" ? "All Periods" : selectedPeriod}`)}
                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#92400e" }}>
                  ⚠️ Labour hire timesheets are required for invoice reconciliation with agencies.
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: "#fffbeb" }}>
                        {["Employee", "Contract", "Periods Submitted", "Total Hours", "Jobs", "Leave Used"].map(h => (
                          <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, color: "#92400e", borderBottom: "1px solid #fde68a", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {labourHireRows.map((row, i) => (
                        <tr key={row.emp?.id} style={{ background: i % 2 === 0 ? "#fff" : "#fffdf5", borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "9px 12px" }}>
                            <div style={{ fontWeight: 700, color: "#1e293b" }}>{row.emp?.name}</div>
                            {row.emp?.email && <div style={{ fontSize: 11, color: "#94a3b8" }}>{row.emp.email}</div>}
                          </td>
                          <td style={{ padding: "9px 12px" }}><Badge type={row.emp?.contract} /></td>
                          <td style={{ padding: "9px 12px", color: "#64748b" }}>{row.entries}</td>
                          <td style={{ padding: "9px 12px", fontWeight: 700, color: "#d97706", fontSize: 15 }}>{row.hours.toFixed(1)}h</td>
                          <td style={{ padding: "9px 12px" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                              {[...row.jobs].map(j => (
                                <span key={j} style={{ background: "#fef9c3", color: "#92400e", borderRadius: 5, padding: "1px 7px", fontSize: 11, fontWeight: 600 }}>{j}</span>
                              ))}
                              {row.jobs.size === 0 && <span style={{ color: "#94a3b8", fontSize: 11 }}>—</span>}
                            </div>
                          </td>
                          <td style={{ padding: "9px 12px", fontSize: 11, color: "#64748b" }}>
                            {[...new Set(row.leaveTypes)].join(", ") || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ borderTop: "2px solid #fde68a", background: "#fffbeb" }}>
                        <td colSpan={3} style={{ padding: "9px 12px", fontWeight: 700, color: "#92400e" }}>TOTAL LABOUR HIRE</td>
                        <td style={{ padding: "9px 12px", fontWeight: 700, color: "#d97706", fontSize: 14 }}>
                          {labourHireRows.reduce((s, r) => s + r.hours, 0).toFixed(1)}h
                        </td>
                        <td colSpan={2} />
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Labour hire employees not yet submitted */}
                {(() => {
                  const submitted = new Set(labourHireRows.map(r => r.emp?.id));
                  const notSubmitted = labourHireEmps.filter(e => !submitted.has(e.id));
                  if (!notSubmitted.length) return null;
                  return (
                    <div style={{ marginTop: 20, padding: "14px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10 }}>
                      <div style={{ fontWeight: 700, color: "#dc2626", fontSize: 13, marginBottom: 8 }}>⚠ Not yet submitted ({notSubmitted.length})</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {notSubmitted.map(e => (
                          <span key={e.id} style={{ background: "#fff", border: "1px solid #fecaca", color: "#dc2626", borderRadius: 7, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>
                            {e.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </>)
          }
        </div>
      )}

      {/* ── INDIVIDUAL REPORT ── */}
      {activeTab === "individual" && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Select Employee</label>
              <select value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#1e293b", background: "#fff", minWidth: 220 }}>
                <option value="all">— choose employee —</option>
                {allEmployees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.type === "labour-hire" ? "Labour Hire" : "Permanent"})</option>)}
              </select>
            </div>
          </div>

          {selectedEmployee === "all"
            ? card(<p style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>Select an employee above to view their individual report.</p>)
            : (() => {
                const emp = allEmployees.find(e => e.id === selectedEmployee);
                const empEntries = periodFiltered.filter(e => e.employee?.id === selectedEmployee);
                const totalH = empEntries.reduce((s, e) => s + Number(e.totalHours || 0), 0);
                const allJobsWorked = new Set();
                const leaveUsed = [];
                empEntries.forEach(e => {
                  e.rows?.forEach(r => {
                    const jobs = r.jobEntries || (r.jobCode ? [{ jobCode: r.jobCode }] : []);
                    jobs.forEach(j => j.jobCode && allJobsWorked.add(j.jobCode));
                    if (r.leaveType) leaveUsed.push(r.leaveType);
                  });
                });
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Employee header */}
                    {card(<>
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                        <div style={{ width: 52, height: 52, borderRadius: "50%", background: emp?.type === "labour-hire" ? "#fef9c3" : "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, color: emp?.type === "labour-hire" ? "#92400e" : "#1d4ed8" }}>
                          {emp?.name?.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{emp?.name}</div>
                          <div style={{ display: "flex", gap: 6, marginTop: 4 }}><Badge type={emp?.type} /><Badge type={emp?.contract} /></div>
                          {emp?.email && <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{emp.email}</div>}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <StatCard label="Total Hours" value={totalH.toFixed(1)} sub="logged" accent="#2563eb" />
                        <StatCard label="Submissions" value={empEntries.length} sub="periods" />
                        <StatCard label="Jobs Worked" value={allJobsWorked.size} sub="unique jobs" accent="#16a34a" />
                      </div>
                    </>)}

                    {empEntries.length === 0
                      ? card(<p style={{ color: "#94a3b8", textAlign: "center", padding: "20px 0" }}>No submissions found for this employee.</p>)
                      : empEntries.map((entry, ei) => card(<>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                            <div>
                              <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 14 }}>Period: {entry.periodStart}</div>
                              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                                {Number(entry.totalHours).toFixed(1)}h total · Submitted {new Date(entry.submittedAt).toLocaleDateString("en-AU")}
                              </div>
                            </div>
                          </div>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                            <thead>
                              <tr style={{ background: "#f8fafc" }}>
                                {["Day", "Hours", "Jobs", "Comments", "Rate", "Leave"].map(h => (
                                  <th key={h} style={{ padding: "7px 10px", textAlign: "left", fontWeight: 600, color: "#475569", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {entry.rows?.filter(r => !r.isRDO || r.leaveType).map((r, ri) => {
                                const jobs = r.jobEntries || (r.jobCode ? [{ jobCode: r.jobCode, hours: r.hours }] : []);
                                return (
                                  <tr key={ri} style={{ borderBottom: "1px solid #f8fafc", background: ri % 2 === 0 ? "#fff" : "#fafcff", verticalAlign: "top" }}>
                                    <td style={{ padding: "7px 10px", color: "#475569", whiteSpace: "nowrap" }}>{r.day}</td>
                                    <td style={{ padding: "7px 10px", fontWeight: 600, color: "#1e293b" }}>{r.isRDO ? "RDO" : `${r.totalHours || r.hours || 0}h`}</td>
                                    <td style={{ padding: "7px 10px" }}>
                                      {jobs.filter(j => j.jobCode).length > 0
                                        ? <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                            {jobs.filter(j => j.jobCode).map((j, k) => (
                                              <div key={k} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                                <span style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: 4, padding: "1px 7px", fontSize: 11, fontWeight: 600 }}>{j.jobCode}</span>
                                                <span style={{ fontSize: 11, color: "#64748b" }}>{j.hours}h</span>
                                              </div>
                                            ))}
                                          </div>
                                        : <span style={{ color: "#cbd5e1" }}>—</span>
                                      }
                                    </td>
                                    <td style={{ padding: "7px 10px", color: "#64748b", fontStyle: "italic", fontSize: 11 }}>{r.comment || "—"}</td>
                                    <td style={{ padding: "7px 10px" }}>
                                      {r.overtimeType ? <span style={{ background: "#fef3c7", color: "#b45309", borderRadius: 4, padding: "1px 7px", fontSize: 11, fontWeight: 600 }}>{r.overtimeType}</span> : <span style={{ color: "#cbd5e1" }}>—</span>}
                                    </td>
                                    <td style={{ padding: "7px 10px" }}>
                                      {r.leaveType ? <span style={{ background: "#fef9c3", color: "#92400e", borderRadius: 4, padding: "1px 7px", fontSize: 11, fontWeight: 600 }}>{r.leaveType}</span> : <span style={{ color: "#cbd5e1" }}>—</span>}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </>, { key: ei }))
                    }
                  </div>
                );
              })()
          }
        </div>
      )}
    </div>
  );
}

function TimesheetForm({ onSubmit, lockedEmployee, importedJobs = [] }) {
  const [employee, setEmployee] = useState(lockedEmployee || "");
  const [periodStart, setPeriodStart] = useState("");

  // Data model: one row per JOB LINE (not per day)
  // Each row: { day, week, isRDO, isHoliday, isWeekend, defaultHours, date, jobCode, hours, comment, overtimeType, leaveType }
  // Days are grouped visually; the first row for a day shows the day label with rowSpan

  const makeDefaultRows = (dateStr) => {
    const template = buildFortnightFromDate(dateStr || null);
    return template.map((d) => ({
      day: d.day,
      week: d.week,
      isRDO: d.isRDO || false,
      isHoliday: d.isHoliday || false,
      isWeekend: d.isWeekend || false,
      defaultHours: d.defaultHours,
      date: d.date || null,
      jobCode: "",
      hours: (d.isRDO || d.isWeekend) ? 0 : d.defaultHours,
      comment: "",
      overtimeType: "",
      leaveType: d.isHoliday ? "Public Holiday" : "",
    }));
  };

  const [rows, setRows] = useState(() => makeDefaultRows(""));

  // All open jobs (built-in + imported)
  const allOpenJobs = [...openJobs, ...importedJobs.filter(j => j.status === "open")];

  // Group rows by day key for rendering
  // Returns array of { day, week, isRDO, isWeekend, defaultHours, lines: [rowIdx, ...] }
  const groupedDays = () => {
    const groups = [];
    const seen = {};
    rows.forEach((r, i) => {
      const key = r.day + "_" + r.week;
      if (seen[key] === undefined) {
        seen[key] = groups.length;
        groups.push({ day: r.day, week: r.week, isRDO: r.isRDO, isHoliday: r.isHoliday, isWeekend: r.isWeekend, defaultHours: r.defaultHours, lines: [i] });
      } else {
        groups[seen[key]].lines.push(i);
      }
    });
    return groups;
  };

  const updateRow = (i, field, val) =>
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));

  const addLine = (dayKey, week) => {
    setRows(prev => {
      // Find last index belonging to this day
      const dayRows = prev.map((r, i) => ({ r, i })).filter(({ r }) => r.day === dayKey && r.week === week);
      const insertAfter = dayRows[dayRows.length - 1].i;
      const template = prev[dayRows[0].i]; // inherit day/week/isRDO from first row of day
      const newLine = { day: dayKey, week, isRDO: template.isRDO, isHoliday: false, isWeekend: template.isWeekend, defaultHours: template.defaultHours, date: null, jobCode: "", hours: 0, comment: "", overtimeType: "", leaveType: "" };
      const next = [...prev];
      next.splice(insertAfter + 1, 0, newLine);
      return next;
    });
  };

  const removeLine = (i) => {
    setRows(prev => {
      const day = prev[i].day, week = prev[i].week;
      const dayCount = prev.filter(r => r.day === day && r.week === week).length;
      if (dayCount <= 1) return prev; // keep at least one line per day
      return prev.filter((_, idx) => idx !== i);
    });
  };

  const totalHours = rows.reduce((s, r) => s + Number(r.hours || 0), 0);

  const handleSubmit = () => {
    if (!employee || !periodStart) return alert("Please select employee and period start date.");
    const emp = [...EMPLOYEES].find(e => e.id === employee);
    // Build summary rows grouped by day for backward compat with Review/History
    const grouped = groupedDays().map(g => ({
      day: g.day,
      week: g.week,
      isRDO: g.isRDO,
      isHoliday: g.isHoliday || false,
      isWeekend: g.isWeekend,
      totalHours: rows.filter((r, i) => g.lines.includes(i)).reduce((s, r) => s + Number(r.hours || 0), 0),
      jobEntries: rows.filter((r, i) => g.lines.includes(i)).map(r => ({ jobCode: r.jobCode, hours: r.hours })),
      lines: rows.filter((r, i) => g.lines.includes(i)),
      comment: rows.filter((r, i) => g.lines.includes(i)).map(r => r.comment).filter(Boolean).join("; "),
      overtimeType: rows.find((r, i) => g.lines.includes(i) && r.overtimeType)?.overtimeType || "",
      leaveType: rows.find((r, i) => g.lines.includes(i) && r.leaveType)?.leaveType || "",
    }));
    onSubmit({ employee: emp, periodStart, rows: grouped, totalHours, submittedAt: new Date().toISOString() });
    alert("Timesheet submitted successfully!");
  };

  const cellPad = { padding: "6px 10px", verticalAlign: "middle" };
  const inp = { border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12, fontFamily: "inherit", color: "#1e293b", background: "#fff" };

  const groups = groupedDays();

  // ── Incomplete day detection ──────────────────────────────────────────────
  // A day is "incomplete" if it's a regular work day, has no leave type,
  // and total logged hours < defaultHours
  const incompleteDays = groups.filter(g => {
    if (g.isRDO || g.isWeekend) return false;
    const dayHours = rows.filter((r, i) => g.lines.includes(i)).reduce((s, r) => s + Number(r.hours || 0), 0);
    const hasLeave = rows.filter((r, i) => g.lines.includes(i)).some(r => r.leaveType);
    return !hasLeave && dayHours < g.defaultHours;
  });

  return (
    <div style={{ padding: "28px 24px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>Submit Fortnightly Timesheet</h2>

      {/* Employee + Period */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Employee</label>
          {lockedEmployee
            ? <div style={{ padding: "8px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, background: "#f8fafc", color: "#1e293b", minWidth: 220, display: "inline-block" }}>
                {EMPLOYEES.find(e => e.id === lockedEmployee)?.name}
              </div>
            : <select value={employee} onChange={e => setEmployee(e.target.value)}
                style={{ padding: "8px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#1e293b", minWidth: 220 }}>
                <option value="">Select employee…</option>
                {EMPLOYEES.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.type})</option>)}
              </select>
          }
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Period Start (Thursday)</label>
          <input type="date" value={periodStart} onChange={e => { const d = e.target.value; setPeriodStart(d); setRows(makeDefaultRows(d)); }}
            style={{ padding: "8px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#1e293b", background: "#fff" }} />
        </div>
      </div>

      {/* Timesheet table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["Wk", "Day", "Hours", "Job Code", "Comments", "Rate", "Leave / Other", ""].map((h, i) => (
                <th key={i} style={{ padding: "9px 10px", textAlign: "left", fontWeight: 600, color: "#475569", borderBottom: "2px solid #e2e8f0", whiteSpace: "nowrap", fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group, gi) => {
              const dayTotal = rows.filter((r, i) => group.lines.includes(i)).reduce((s, r) => s + Number(r.hours || 0), 0);
              const rowCount = group.lines.length;
              const hasLeave = rows.filter((r, i) => group.lines.includes(i)).some(r => r.leaveType);
              const isIncomplete = !group.isRDO && !group.isWeekend && !hasLeave && dayTotal < group.defaultHours;
              const bgDay = group.isRDO ? "#fafafa" : group.isHoliday ? "#fff5f5" : group.isWeekend ? "#f8f4ff" : isIncomplete ? "#fffbeb" : gi % 2 === 0 ? "#fff" : "#fafcff";
              const borderTop = gi > 0 ? "2px solid #e2e8f0" : "none";

              return group.lines.map((rowIdx, li) => {
                const r = rows[rowIdx];
                const isFirst = li === 0;
                const isLast = li === rowCount - 1;

                return (
                  <tr key={rowIdx} style={{ background: bgDay, borderTop: isFirst ? borderTop : "none", borderBottom: isLast ? "none" : "1px solid #f1f5f9" }}>

                    {/* Wk — only on first line of day */}
                    {isFirst && (
                      <td rowSpan={rowCount} style={{ ...cellPad, color: "#94a3b8", fontSize: 11, borderRight: "1px solid #f1f5f9", verticalAlign: "top", paddingTop: 10, whiteSpace: "nowrap" }}>
                        Wk {group.week}
                      </td>
                    )}

                    {/* Day label — only on first line, spans all lines of that day */}
                    {isFirst && (
                      <td rowSpan={rowCount} style={{ ...cellPad, fontWeight: 600, color: group.isRDO ? "#94a3b8" : group.isWeekend ? "#7c3aed" : isIncomplete ? "#b45309" : "#1e293b", fontStyle: group.isRDO ? "italic" : "normal", borderRight: "1px solid #f1f5f9", verticalAlign: "top", paddingTop: 10, whiteSpace: "nowrap", minWidth: 90 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          {isIncomplete && <span title="Hours incomplete" style={{ fontSize: 13 }}>⚠️</span>}
                          <span>{group.day}</span>
                        </div>
                        {!group.isRDO && !group.isWeekend && rowCount > 1 && (
                          <div style={{ fontSize: 10, color: isIncomplete ? "#f59e0b" : "#94a3b8", marginTop: 3 }}>{dayTotal.toFixed(1)}h / {group.defaultHours}h</div>
                        )}
                        {isIncomplete && !hasLeave && (
                          <div style={{ fontSize: 10, color: "#f59e0b", marginTop: 2, fontWeight: 600 }}>
                            {(group.defaultHours - dayTotal).toFixed(1)}h missing
                          </div>
                        )}
                        {group.isRDO && <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>RDO{rowCount > 1 ? ` · ${dayTotal.toFixed(1)}h worked` : ""}</div>}
                        {group.isHoliday && <div style={{ fontSize: 10, background: "#fee2e2", color: "#dc2626", borderRadius: 4, padding: "1px 5px", marginTop: 3, display: "inline-block", fontWeight: 600 }}>Public Holiday</div>}
                        {group.isWeekend && <div style={{ fontSize: 10, color: "#a78bfa", marginTop: 2 }}>Weekend</div>}
                      </td>
                    )}

                    {/* Hours */}
                    <td style={{ ...cellPad, minWidth: 72 }}>
                      {group.isRDO && isFirst
                        ? <span style={{ color: "#94a3b8", fontSize: 11 }}>—</span>
                        : <input type="number" step="0.5" min="0" max="16" value={r.hours}
                            onChange={e => updateRow(rowIdx, "hours", e.target.value)}
                            style={{ ...inp, width: 60, padding: "4px 8px", textAlign: "center",
                              border: isIncomplete && !hasLeave ? "1.5px solid #f59e0b" : "1px solid #e2e8f0",
                              background: group.isWeekend && Number(r.hours) === 0 ? "#f8f4ff" : "#fff" }} />
                      }
                    </td>

                    {/* Job Code */}
                    <td style={{ ...cellPad, minWidth: 180 }}>
                      {(!group.isRDO || !isFirst) && (
                        <select value={r.jobCode} onChange={e => updateRow(rowIdx, "jobCode", e.target.value)}
                          style={{ ...inp, padding: "4px 8px", minWidth: 175 }}>
                          <option value="">— select job —</option>
                          {allOpenJobs.map(jb => (
                            <option key={jb.id} value={jb.id}>
                              {jb.id}{jb.description ? " – " + jb.description.slice(0, 28) : ""}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    {/* Comment */}
                    <td style={{ ...cellPad, minWidth: 140 }}>
                      {(!group.isRDO || !isFirst) && (
                        <input type="text" value={r.comment} onChange={e => updateRow(rowIdx, "comment", e.target.value)}
                          placeholder="note…"
                          style={{ ...inp, padding: "4px 8px", width: 140 }} />
                      )}
                    </td>

                    {/* Rate (Overtime) */}
                    <td style={{ ...cellPad, minWidth: 130 }}>
                      {(!group.isRDO || !isFirst) && (
                        <select value={r.overtimeType} onChange={e => updateRow(rowIdx, "overtimeType", e.target.value)}
                          style={{ ...inp, padding: "4px 8px", minWidth: 125 }}>
                          <option value="">— none —</option>
                          <option value="Ordinary">Ordinary</option>
                          <option value="Overtime">Overtime</option>
                          <option value="Overtime 1.5x">Overtime 1.5x</option>
                          <option value="Overtime 2x">Overtime 2x</option>
                        </select>
                      )}
                    </td>

                    {/* Leave / Other */}
                    <td style={{ ...cellPad, minWidth: 140 }}>
                      {(!group.isRDO || !isFirst) && (
                        <select value={r.leaveType} onChange={e => updateRow(rowIdx, "leaveType", e.target.value)}
                          style={{ ...inp, padding: "4px 8px", minWidth: 135 }}>
                          <option value="">— none —</option>
                          {LEAVE_TYPES.map(lt => <option key={lt} value={lt}>{lt}</option>)}
                        </select>
                      )}
                    </td>

                    {/* Actions column */}
                    <td style={{ ...cellPad, whiteSpace: "nowrap" }}>
                      {group.isRDO ? (
                        // RDO day: first slot shows "+ line" to add work; added lines show × and further + line
                        isFirst && rowCount === 1 ? (
                          <button onClick={() => addLine(group.day, group.week)} title="Log hours worked on RDO"
                            style={{ background: "none", border: "1px dashed #94a3b8", borderRadius: 5, color: "#64748b", fontSize: 11, cursor: "pointer", padding: "2px 8px", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                            + line
                          </button>
                        ) : !isFirst ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <button onClick={() => removeLine(rowIdx)} title="Remove this line"
                              style={{ background: "none", border: "none", cursor: "pointer", color: "#e11d48", fontSize: 16, lineHeight: 1, padding: "2px 4px" }}>
                              ×
                            </button>
                            {isLast && (
                              <button onClick={() => addLine(group.day, group.week)} title="Add another line"
                                style={{ background: "none", border: "1px dashed #94a3b8", borderRadius: 5, color: "#64748b", fontSize: 11, cursor: "pointer", padding: "2px 8px", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                                + line
                              </button>
                            )}
                          </div>
                        ) : null
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {rowCount > 1 && (
                            <button onClick={() => removeLine(rowIdx)} title="Remove this line"
                              style={{ background: "none", border: "none", cursor: "pointer", color: "#e11d48", fontSize: 16, lineHeight: 1, padding: "2px 4px" }}>
                              ×
                            </button>
                          )}
                          {isLast && (
                            <button onClick={() => addLine(group.day, group.week)} title="Add another line for this day"
                              style={{ background: "none", border: "1px dashed #94a3b8", borderRadius: 5, color: "#64748b", fontSize: 11, cursor: "pointer", padding: "2px 8px", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                              + line
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "2px solid #e2e8f0", background: "#f8fafc" }}>
              <td colSpan={2} style={{ padding: "10px 12px", fontWeight: 700, color: "#1e293b", fontSize: 13 }}>Total Hours</td>
              <td style={{ padding: "10px 12px", fontWeight: 700, color: totalHours === 76 ? "#16a34a" : "#dc2626", fontSize: 15 }}>
                {Number(totalHours).toFixed(1)}h
              </td>
              <td colSpan={5} style={{ padding: "10px 12px", fontSize: 12, color: "#94a3b8" }}>
                {totalHours === 76 ? "✓ Standard fortnight" : `Expected 76h – ${totalHours < 76 ? "short by" : "over by"} ${Math.abs(76 - totalHours).toFixed(1)}h`}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Incomplete days warning banner */}
        {incompleteDays.length > 0 && (
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <span style={{ fontWeight: 700, color: "#92400e", fontSize: 14 }}>
                {incompleteDays.length} day{incompleteDays.length > 1 ? "s" : ""} with incomplete hours
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {incompleteDays.map((g, i) => {
                const dayHours = rows.filter((r, ri) => g.lines.includes(ri)).reduce((s, r) => s + Number(r.hours || 0), 0);
                const missing = (g.defaultHours - dayHours).toFixed(1);
                return (
                  <div key={i} style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 7, padding: "5px 12px", fontSize: 12, color: "#92400e" }}>
                    <strong>{g.day}</strong> — {dayHours.toFixed(1)}h of {g.defaultHours}h &nbsp;
                    <span style={{ fontWeight: 700, color: "#b45309" }}>({missing}h missing)</span>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 12, color: "#92400e", marginTop: 10 }}>
              Please complete all hours or add a Leave / Other type before submitting.
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={handleSubmit}
            disabled={incompleteDays.length > 0}
            title={incompleteDays.length > 0 ? "Complete all day hours before submitting" : ""}
            style={{
              padding: "10px 28px",
              background: incompleteDays.length > 0 ? "#94a3b8" : "#1e293b",
              color: "#fff", border: "none", borderRadius: 8,
              cursor: incompleteDays.length > 0 ? "not-allowed" : "pointer",
              fontSize: 14, fontWeight: 600, fontFamily: "inherit",
              opacity: incompleteDays.length > 0 ? 0.7 : 1,
            }}>
            Submit Timesheet
          </button>
          <button onClick={() => setRows(makeDefaultRows(periodStart))} style={{ padding: "10px 20px", background: "#fff", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Labour Hire Timesheet (Mon–Sun, weekly, flexible hours) ─────────────────
const LH_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildWeekFromMonday(mondayStr) {
  if (!mondayStr) return LH_DAYS.map(d => ({ label: d, date: null, isWeekend: d === "Sat" || d === "Sun" }));
  const start = new Date(mondayStr + "T00:00:00");
  return LH_DAYS.map((d, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const dateStr = fmtDate(date);
    const dayNum = date.getDate();
    const monthShort = date.toLocaleString("en-AU", { month: "short" });
    return { label: `${d} ${dayNum} ${monthShort}`, date: dateStr, isWeekend: i >= 5 };
  });
}

function LabourHireTimesheetForm({ onSubmit, lockedEmployee, importedJobs = [] }) {
  const emp = [...EMPLOYEES].find(e => e.id === lockedEmployee);
  const [weekStart, setWeekStart] = useState("");
  const allOpenJobs = [...openJobs, ...importedJobs.filter(j => j.status === "open")];

  const makeRows = (mondayStr) =>
    buildWeekFromMonday(mondayStr || null).map(d => ({
      label: d.label, date: d.date, isWeekend: d.isWeekend,
      lines: [{ jobCode: "", hours: 0, comment: "" }],
    }));

  const [days, setDays] = useState(() => makeRows(""));

  const totalHours = days.reduce((s, d) => s + d.lines.reduce((ls, l) => ls + Number(l.hours || 0), 0), 0);
  const TARGET = 38;

  const updateLine = (di, li, field, val) =>
    setDays(prev => prev.map((d, i) => i !== di ? d : {
      ...d, lines: d.lines.map((l, j) => j !== li ? l : { ...l, [field]: val }),
    }));

  const addLine = (di) =>
    setDays(prev => prev.map((d, i) => i !== di ? d : {
      ...d, lines: [...d.lines, { jobCode: "", hours: 0, comment: "" }],
    }));

  const removeLine = (di, li) =>
    setDays(prev => prev.map((d, i) => i !== di ? d : {
      ...d, lines: d.lines.length <= 1 ? d.lines : d.lines.filter((_, j) => j !== li),
    }));

  const handleSubmit = () => {
    if (!weekStart) return alert("Please select the week start (Monday).");
    const rows = days.map(d => ({
      day: d.label,
      date: d.date,
      isWeekend: d.isWeekend,
      isRDO: false,
      isHoliday: false,
      totalHours: d.lines.reduce((s, l) => s + Number(l.hours || 0), 0),
      jobEntries: d.lines.map(l => ({ jobCode: l.jobCode, hours: l.hours })),
      lines: d.lines,
      comment: d.lines.map(l => l.comment).filter(Boolean).join("; "),
      overtimeType: "",
      leaveType: "",
    }));
    onSubmit({ employee: emp, periodStart: weekStart, rows, totalHours, submittedAt: new Date().toISOString() });
    alert("Timesheet submitted successfully!");
  };

  const inp = { border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12, fontFamily: "inherit", color: "#1e293b", background: "#fff" };
  const cellPad = { padding: "6px 10px", verticalAlign: "middle" };

  return (
    <div style={{ padding: "28px 24px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Submit Weekly Timesheet</h2>
      <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Labour hire · Monday – Sunday</p>

      {/* Employee + Week Start */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Employee</label>
          <div style={{ padding: "8px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, background: "#f8fafc", color: "#1e293b", minWidth: 220, display: "inline-block" }}>
            {emp?.name || "—"}
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6 }}>Week Start (Monday)</label>
          <input type="date" value={weekStart}
            onChange={e => { const d = e.target.value; setWeekStart(d); setDays(makeRows(d)); }}
            style={{ padding: "8px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#1e293b", background: "#fff" }} />
        </div>
        {/* Hours progress */}
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>Total hours</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: totalHours >= TARGET ? "#16a34a" : "#1e293b" }}>
            {totalHours.toFixed(1)} <span style={{ fontSize: 14, fontWeight: 400, color: "#94a3b8" }}>/ {TARGET}h</span>
          </div>
          <div style={{ width: 140, height: 5, background: "#e2e8f0", borderRadius: 99, marginTop: 5, marginLeft: "auto" }}>
            <div style={{ width: `${Math.min(100, (totalHours / TARGET) * 100)}%`, height: "100%", background: totalHours >= TARGET ? "#16a34a" : "#2563eb", borderRadius: 99, transition: "width 0.2s" }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["Day", "Hours", "Job Code", "Comments", ""].map((h, i) => (
                <th key={i} style={{ padding: "9px 10px", textAlign: "left", fontWeight: 600, color: "#475569", borderBottom: "2px solid #e2e8f0", whiteSpace: "nowrap", fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, di) => {
              const dayTotal = day.lines.reduce((s, l) => s + Number(l.hours || 0), 0);
              const rowCount = day.lines.length;
              const bg = day.isWeekend ? "#f8f4ff" : di % 2 === 0 ? "#fff" : "#fafcff";
              return day.lines.map((line, li) => {
                const isFirst = li === 0;
                const isLast = li === rowCount - 1;
                return (
                  <tr key={`${di}-${li}`} style={{ background: bg, borderTop: isFirst && di > 0 ? "2px solid #e2e8f0" : "none", borderBottom: isLast ? "none" : "1px solid #f1f5f9" }}>
                    {isFirst && (
                      <td rowSpan={rowCount} style={{ ...cellPad, fontWeight: 600, color: day.isWeekend ? "#7c3aed" : "#1e293b", borderRight: "1px solid #f1f5f9", verticalAlign: "top", paddingTop: 10, whiteSpace: "nowrap", minWidth: 110 }}>
                        <div>{day.label}</div>
                        {day.isWeekend && <div style={{ fontSize: 10, color: "#a78bfa", marginTop: 2 }}>Weekend</div>}
                        {rowCount > 1 && <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{dayTotal.toFixed(1)}h total</div>}
                      </td>
                    )}
                    <td style={{ ...cellPad, minWidth: 72 }}>
                      <input type="number" step="0.5" min="0" max="16" value={line.hours}
                        onChange={e => updateLine(di, li, "hours", e.target.value)}
                        style={{ ...inp, width: 60, padding: "4px 8px", textAlign: "center" }} />
                    </td>
                    <td style={{ ...cellPad, minWidth: 180 }}>
                      <select value={line.jobCode} onChange={e => updateLine(di, li, "jobCode", e.target.value)}
                        style={{ ...inp, padding: "4px 8px", minWidth: 175 }}>
                        <option value="">— select job —</option>
                        {allOpenJobs.map(jb => (
                          <option key={jb.id} value={jb.id}>{jb.id}{jb.description ? " – " + jb.description.slice(0, 28) : ""}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ ...cellPad, minWidth: 140 }}>
                      <input type="text" value={line.comment} onChange={e => updateLine(di, li, "comment", e.target.value)}
                        placeholder="note…" style={{ ...inp, padding: "4px 8px", width: 140 }} />
                    </td>
                    <td style={{ ...cellPad, whiteSpace: "nowrap" }}>
                      {isLast && (
                        <button onClick={() => addLine(di)} title="Add job line"
                          style={{ marginRight: 4, background: "#f1f5f9", border: "none", borderRadius: 5, width: 24, height: 24, cursor: "pointer", fontSize: 14, color: "#475569", lineHeight: 1 }}>+</button>
                      )}
                      {rowCount > 1 && (
                        <button onClick={() => removeLine(di, li)} title="Remove line"
                          style={{ background: "#fef2f2", border: "none", borderRadius: 5, width: 24, height: 24, cursor: "pointer", fontSize: 14, color: "#dc2626", lineHeight: 1 }}>×</button>
                      )}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button onClick={handleSubmit}
          style={{ padding: "10px 28px", background: "#1e293b", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
          Submit Timesheet
        </button>
        <button onClick={() => setDays(makeRows(weekStart))}
          style={{ padding: "10px 20px", background: "#fff", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>
          Reset
        </button>
      </div>
    </div>
  );
}

function ReviewPage({ entries }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? entries : entries.filter((e) => e.employee?.type === filter);

  const exportCSV = () => {
    if (!filtered.length) return alert("No entries to export.");
    const headers = ["Employee", "Type", "Period Start", "Day", "Week", "Hours", "Job Allocations", "Comments", "Rate", "Leave Type", "Submitted At"];
    const lines = [headers.join(",")];
    filtered.forEach((e) => {
      e.rows.forEach((r) => {
        const jobs = r.jobEntries || (r.jobCode ? [{ jobCode: r.jobCode, hours: r.hours }] : []);
        const jobSummary = jobs.filter(je => je.jobCode).map(je => `${je.jobCode}(${je.hours}h)`).join("; ") || "";
        lines.push([
          e.employee?.name, e.employee?.type, e.periodStart,
          r.day, r.week, r.totalHours || r.hours || 0, jobSummary, r.comment || "", r.overtimeType || "", r.leaveType || "",
          new Date(e.submittedAt).toLocaleString()
        ].join(","));
      });
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "drc_timesheets.csv"; a.click();
  };

  return (
    <div style={{ padding: "28px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Review & Export</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: "7px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fff" }}>
            <option value="all">All employees</option>
            <option value="permanent">Permanent only</option>
            <option value="labour-hire">Labour hire only</option>
          </select>
          <button onClick={exportCSV} style={{ padding: "7px 18px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>
            Export CSV
          </button>
        </div>
      </div>

      {filtered.length === 0
        ? <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8", fontSize: 15 }}>No timesheets submitted yet. Use the Submit Timesheet tab.</div>
        : filtered.map((entry, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: 15 }}>{entry.employee?.name}</span>
                <Badge type={entry.employee?.type} />
                <Badge type={entry.employee?.contract} />
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>
                Period: {entry.periodStart} &nbsp;|&nbsp; {Number(entry.totalHours).toFixed(1)}h total &nbsp;|&nbsp; Submitted: {new Date(entry.submittedAt).toLocaleDateString()}
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Day", "Total Hrs", "Job Allocations", "Comments", "Rate", "Leave / Other"].map((h) => (
                    <th key={h} style={{ padding: "7px 16px", textAlign: "left", color: "#64748b", fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entry.rows.filter((r) => !r.isRDO || r.leaveType).map((r, j) => {
                  const jobs = r.jobEntries || (r.jobCode ? [{ jobCode: r.jobCode, hours: r.hours }] : []);
                  return (
                    <tr key={j} style={{ borderBottom: "1px solid #f8fafc", verticalAlign: "top" }}>
                      <td style={{ padding: "8px 16px", color: "#475569" }}>{r.day} (Wk {r.week})</td>
                      <td style={{ padding: "8px 16px", fontWeight: 600, color: "#1e293b" }}>{r.isRDO ? "RDO" : `${r.totalHours || r.hours || 0}h`}</td>
                      <td style={{ padding: "8px 16px" }}>
                        {r.isRDO ? <span style={{ color: "#cbd5e1" }}>—</span>
                          : jobs.filter(je => je.jobCode).length > 0
                            ? <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {jobs.filter(je => je.jobCode).map((je, k) => (
                                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{je.jobCode}</span>
                                    <span style={{ fontSize: 11, color: "#64748b" }}>{je.hours}h</span>
                                  </div>
                                ))}
                              </div>
                            : <span style={{ color: "#cbd5e1" }}>—</span>
                        }
                      </td>
                      <td style={{ padding: "8px 16px", color: "#475569", fontStyle: "italic", fontSize: 11 }}>
                        {r.comment || <span style={{ color: "#cbd5e1" }}>—</span>}
                      </td>
                      <td style={{ padding: "8px 16px" }}>
                        {r.overtimeType
                          ? <span style={{ background: "#fef3c7", color: "#b45309", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{r.overtimeType}</span>
                          : <span style={{ color: "#cbd5e1" }}>—</span>}
                      </td>
                      <td style={{ padding: "8px 16px" }}>
                        {r.leaveType
                          ? <span style={{ background: "#fef9c3", color: "#92400e", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{r.leaveType}</span>
                          : <span style={{ color: "#cbd5e1" }}>—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))
      }
    </div>
  );
}

function JobRegister({ importedJobs, setImportedJobs }) {
  const [showImport, setShowImport] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [parseResult, setParseResult] = useState(null);
  const [importError, setImportError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [confirmClear, setConfirmClear] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  const handleSimproSync = async () => {
    setSyncing(true);
    setSyncMsg("");
    try {
      const res = await fetch("/api/simpro-sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sync failed");
      setImportedJobs(prev => {
        const kept = prev.filter(p => p.source !== "simpro");
        return [...kept, ...data.jobs];
      });
      setSyncMsg(`Synced ${data.jobs.length} jobs from Simpro.`);
    } catch (err) {
      setSyncMsg(`Error: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const allJobs = [...JOBS, ...importedJobs];
  const filtered = allJobs.filter(j => {
    const s = search.toLowerCase();
    const matchSearch = !s || j.id.toLowerCase().includes(s) || (j.description || "").toLowerCase().includes(s) || (j.label || "").toLowerCase().includes(s);
    const matchStatus = statusFilter === "all" || j.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // ── MYOB CSV parser ──────────────────────────────────────────────────────
  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return { jobs: [], error: "File is empty or has no data rows." };

    const splitCSVLine = (line) => {
      const cells = []; let cur = "", inQ = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') { inQ = !inQ; }
        else if (ch === ',' && !inQ) { cells.push(cur.trim()); cur = ""; }
        else { cur += ch; }
      }
      cells.push(cur.trim());
      return cells.map(c => c.replace(/^"|"$/g, "").trim());
    };

    const headers = splitCSVLine(lines[0]).map(h => h.toLowerCase());

    const col = (...names) => {
      for (const n of names) { const i = headers.indexOf(n.toLowerCase()); if (i !== -1) return i; }
      return -1;
    };

    const iJobNo   = col("job number","job no","job no.","job id","number","jobno");
    const iName    = col("name","job name","title");
    const iDesc    = col("description","notes","detail","long description","job description");
    const iStatus  = col("status","job status","active","is active");
    const iMgr     = col("manager","job manager","contact","responsible");
    const iBudget  = col("budget","budgeted amount","job budget","estimated amount");
    const iHdr     = col("header job","header","parent job","parent");

    if (iJobNo === -1 && iName === -1) {
      return { jobs: [], error: "No 'Job Number' or 'Name' column found. Export from MYOB: Lists → Jobs → Export." };
    }

    const jobs = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const c = splitCSVLine(lines[i]);
      const get = (idx) => (idx !== -1 && idx < c.length) ? c[idx] : "";
      const jobNo = get(iJobNo);
      const name  = get(iName);
      if (!jobNo && !name) continue;

      const rawStatus = get(iStatus).toLowerCase();
      const status = (rawStatus === "closed" || rawStatus === "inactive" || rawStatus === "false" || rawStatus === "no") ? "closed" : "open";

      const id = jobNo || name;
      const description = get(iDesc) || name || "";
      jobs.push({ id, label: name ? `${id} – ${name}` : id, description, status, manager: get(iMgr), budget: get(iBudget), headerJob: get(iHdr), source: "myob" });
    }

    if (!jobs.length) return { jobs: [], error: "No valid job rows found after the header." };
    return { jobs, error: null };
  };

  const handleFile = (file) => {
    setImportError(""); setParseResult(null);
    if (!file) return;
    if (!file.name.match(/\.(csv|txt)$/i)) { setImportError("Please upload a .csv or .txt file."); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = parseCSV(e.target.result);
      if (result.error && !result.jobs.length) { setImportError(result.error); }
      else { setParseResult({ ...result, filename: file.name }); }
    };
    reader.readAsText(file);
  };

  const confirmImport = () => {
    if (!parseResult?.jobs?.length) return;
    setImportedJobs(prev => {
      const kept = prev.filter(p => !parseResult.jobs.find(nj => nj.id === p.id));
      const next = [...kept, ...parseResult.jobs];
      return next;
    });
    setShowImport(false); setParseResult(null);
  };

  const clearImported = () => {
    setImportedJobs([]);
    setConfirmClear(false);
  };

  const downloadTemplate = () => {
    const csv = [
      "Job Number,Name,Description,Status,Manager,Budget,Header Job",
      "AP2601101,Switchboard Install A,Main switchboard installation at site,Open,David Webb,15000,",
      "AP2601102,Panel Wiring B,Panel wiring and terminations,Open,Brett Campbell,8000,",
      "AP2602103,Site Inspection C,Periodic site inspection,Open,Dennis Rozanic,,",
      "AP2510201,Completed Project X,Legacy project – finished,Closed,,,",
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "myob_jobs_template.csv"; a.click();
  };

  const pill = (active) => ({
    padding: "5px 14px", border: "none", borderRadius: 6, cursor: "pointer",
    fontSize: 12, fontWeight: 600, fontFamily: "inherit",
    background: active ? "#1e293b" : "#f1f5f9", color: active ? "#fff" : "#64748b",
  });

  return (
    <div style={{ padding: "28px 24px" }}>

      {/* Import modal */}
      {showImport && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
          <div style={{ background:"#fff", borderRadius:16, padding:32, width:560, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ fontSize:17, fontWeight:700, color:"#0f172a", margin:0 }}>Import Jobs from MYOB</h3>
              <button onClick={() => { setShowImport(false); setParseResult(null); setImportError(""); }}
                style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#94a3b8", lineHeight:1 }}>×</button>
            </div>

            {/* MYOB instructions */}
            <div style={{ background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:10, padding:"12px 16px", marginBottom:20, fontSize:12, color:"#0369a1", lineHeight:1.8 }}>
              <strong>How to export from MYOB AccountRight:</strong><br />
              1. Go to <b>Lists → Jobs</b><br />
              2. Click <b>Export</b> button (top toolbar) → <b>Export Data</b><br />
              3. Choose <b>Tab-delimited (.txt)</b> or <b>CSV</b> and save the file<br />
              4. Upload the file below — columns detected automatically
              <div style={{ marginTop:10 }}>
                <button onClick={downloadTemplate} style={{ background:"none", border:"1px solid #7dd3fc", borderRadius:6, color:"#0369a1", fontSize:11, padding:"4px 12px", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>
                  ↓ Download sample CSV template
                </button>
              </div>
            </div>

            {/* Supported columns info */}
            <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:8, padding:"10px 14px", marginBottom:16, fontSize:11, color:"#64748b" }}>
              <strong style={{ color:"#475569" }}>Supported MYOB columns (auto-detected):</strong>&nbsp;
              Job Number · Name · Description · Status · Manager · Budget · Header Job
            </div>

            {/* Drop zone */}
            {!parseResult && (
              <>
                <div
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onClick={() => document.getElementById("job-file-inp").click()}
                  style={{ border:`2px dashed ${dragOver ? "#2563eb" : "#cbd5e1"}`, borderRadius:12, padding:"40px 20px", textAlign:"center", background: dragOver ? "#eff6ff" : "#f8fafc", cursor:"pointer", transition:"all 0.15s" }}
                >
                  <div style={{ fontSize:36, marginBottom:10 }}>📂</div>
                  <div style={{ fontWeight:600, color:"#1e293b", marginBottom:4 }}>Drop your MYOB export here</div>
                  <div style={{ fontSize:12, color:"#94a3b8" }}>or click to browse · .csv and .txt supported</div>
                  <input id="job-file-inp" type="file" accept=".csv,.txt" style={{ display:"none" }}
                    onChange={(e) => handleFile(e.target.files[0])} />
                </div>
                {importError && (
                  <div style={{ marginTop:12, background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#dc2626" }}>
                    ⚠ {importError}
                  </div>
                )}
              </>
            )}

            {/* Preview */}
            {parseResult && (
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14, padding:"12px 14px", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10 }}>
                  <span style={{ fontSize:24 }}>✅</span>
                  <div>
                    <div style={{ fontWeight:700, color:"#0f172a", fontSize:14 }}>{parseResult.filename}</div>
                    <div style={{ fontSize:12, color:"#64748b" }}>
                      {parseResult.jobs.length} jobs found · {parseResult.jobs.filter(j=>j.status==="open").length} open · {parseResult.jobs.filter(j=>j.status==="closed").length} closed
                    </div>
                  </div>
                </div>
                {parseResult.error && (
                  <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:8, padding:"8px 12px", fontSize:12, color:"#92400e", marginBottom:12 }}>⚠ {parseResult.error}</div>
                )}
                <div style={{ border:"1px solid #e2e8f0", borderRadius:10, overflow:"hidden", maxHeight:220, overflowY:"auto", marginBottom:16 }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                    <thead>
                      <tr style={{ background:"#f8fafc" }}>
                        {["Job No.", "Description", "Manager", "Status"].map(h => (
                          <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontWeight:600, color:"#475569", borderBottom:"1px solid #e2e8f0" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {parseResult.jobs.map((j, i) => (
                        <tr key={i} style={{ borderBottom:"1px solid #f1f5f9", background: i%2===0?"#fff":"#fafcff" }}>
                          <td style={{ padding:"7px 12px", fontFamily:"monospace", fontWeight:600, color:"#1e293b", fontSize:11 }}>{j.id}</td>
                          <td style={{ padding:"7px 12px", color:"#475569" }}>{j.description || "—"}</td>
                          <td style={{ padding:"7px 12px", color:"#64748b" }}>{j.manager || "—"}</td>
                          <td style={{ padding:"7px 12px" }}><JobBadge status={j.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button onClick={confirmImport} style={{ flex:1, padding:"11px", background:"#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                    ✓ Import {parseResult.jobs.length} Jobs
                  </button>
                  <button onClick={() => { setParseResult(null); setImportError(""); }} style={{ flex:1, padding:"11px", background:"#fff", color:"#64748b", border:"1px solid #e2e8f0", borderRadius:8, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
                    Upload different file
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirm clear modal */}
      {confirmClear && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
          <div style={{ background:"#fff", borderRadius:16, padding:32, width:360, textAlign:"center", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🗑️</div>
            <h3 style={{ fontSize:16, fontWeight:700, color:"#0f172a", marginBottom:8 }}>Clear all imported jobs?</h3>
            <p style={{ fontSize:13, color:"#64748b", marginBottom:24 }}>
              This removes all {importedJobs.length} MYOB-imported jobs. The {JOBS.length} built-in jobs remain.
            </p>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={clearImported} style={{ flex:1, padding:"10px", background:"#dc2626", color:"#fff", border:"none", borderRadius:8, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Clear all</button>
              <button onClick={() => setConfirmClear(false)} style={{ flex:1, padding:"10px", background:"#fff", color:"#64748b", border:"1px solid #e2e8f0", borderRadius:8, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Page header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:700, color:"#0f172a", margin:0 }}>Job Register</h2>
          <p style={{ color:"#64748b", fontSize:13, margin:"4px 0 0" }}>
            {allJobs.length} total · {allJobs.filter(j=>j.status==="open").length} open · {importedJobs.length} imported from MYOB
          </p>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs…"
            style={{ padding:"8px 12px", border:"1px solid #e2e8f0", borderRadius:8, fontSize:13, fontFamily:"inherit", color:"#1e293b", background:"#fff", width:180 }} />
          <div style={{ display:"flex", gap:4 }}>
            {["all","open","closed"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={pill(statusFilter===s)}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
          {importedJobs.length > 0 && (
            <button onClick={() => setConfirmClear(true)} style={{ padding:"8px 14px", background:"#fff", color:"#dc2626", border:"1px solid #fecaca", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
              Clear Imported
            </button>
          )}
          <button onClick={() => setShowImport(true)} style={{ padding:"8px 20px", background:"#2563eb", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
            ↑ Import from MYOB
          </button>
          <button onClick={handleSimproSync} disabled={syncing} style={{ padding:"8px 20px", background: syncing ? "#6b7280" : "#16a34a", color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:600, cursor: syncing ? "not-allowed" : "pointer", fontFamily:"inherit" }}>
            {syncing ? "Syncing…" : "⟳ Sync from Simpro"}
          </button>
        </div>
      </div>
      {syncMsg && (
        <div style={{ marginBottom:12, padding:"8px 14px", borderRadius:8, fontSize:13, background: syncMsg.startsWith("Error") ? "#fef2f2" : "#f0fdf4", color: syncMsg.startsWith("Error") ? "#dc2626" : "#166534", border: `1px solid ${syncMsg.startsWith("Error") ? "#fecaca" : "#bbf7d0"}` }}>
          {syncMsg}
        </div>
      )}

      {/* Job table */}
      <div style={{ border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ background:"#f8fafc" }}>
              {["Job Number","Description","Manager","Budget","Status","Source"].map(h => (
                <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontWeight:600, color:"#475569", borderBottom:"1px solid #e2e8f0", whiteSpace:"nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0
              ? <tr><td colSpan={6} style={{ padding:40, textAlign:"center", color:"#94a3b8" }}>No jobs match your search.</td></tr>
              : filtered.map((j, i) => (
                <tr key={j.id} style={{ background: i%2===0?"#fff":"#fafcff", borderBottom:"1px solid #f1f5f9" }}>
                  <td style={{ padding:"10px 14px", fontWeight:700, fontFamily:"monospace", fontSize:12, color:"#1e293b" }}>{j.id}</td>
                  <td style={{ padding:"10px 14px", color:"#475569" }}>{j.description || j.label?.split("–")[1]?.trim() || "—"}</td>
                  <td style={{ padding:"10px 14px", color:"#64748b", fontSize:12 }}>{j.manager || "—"}</td>
                  <td style={{ padding:"10px 14px", color:"#64748b", fontSize:12, fontFamily:"monospace" }}>
                    {j.budget ? `$${Number(j.budget.replace(/[^0-9.]/g,"")).toLocaleString()}` : "—"}
                  </td>
                  <td style={{ padding:"10px 14px" }}><JobBadge status={j.status} simproStatus={j.simproStatus} simproColor={j.simproColor} /></td>
                  <td style={{ padding:"10px 14px" }}>
                    {j.source === "myob"
                      ? <span style={{ background:"#eff6ff", color:"#2563eb", borderRadius:5, padding:"2px 9px", fontSize:11, fontWeight:700 }}>MYOB</span>
                      : j.source === "simpro"
                      ? <span style={{ background:"#f0fdf4", color:"#166534", borderRadius:5, padding:"2px 9px", fontSize:11, fontWeight:700 }}>Simpro</span>
                      : <span style={{ background:"#f1f5f9", color:"#64748b", borderRadius:5, padding:"2px 9px", fontSize:11, fontWeight:600 }}>Built-in</span>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Convention note */}
      <div style={{ marginTop:20, padding:16, background:"#f0fdf4", borderRadius:10, border:"1px solid #bbf7d0" }}>
        <div style={{ fontSize:13, fontWeight:600, color:"#166534", marginBottom:4 }}>MYOB Job Numbering (DRC Format)</div>
        <div style={{ fontSize:12, color:"#15803d", lineHeight:1.7 }}>
          <b>AP</b> = Project prefix &nbsp;|&nbsp; <b>YY</b> = Year (e.g. 26 = 2026) &nbsp;|&nbsp; <b>MM</b> = Month created (e.g. 02 = Feb) &nbsp;|&nbsp; <b>SEQ</b> = Sequence — e.g. <b>AP2602101</b><br />
          Imported open jobs appear immediately in the employee timesheet job dropdown.
        </div>
      </div>
    </div>
  );
}

function EmployeesPage({ extraEmployees, setExtraEmployees, passwords, setPasswords }) {
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = add new, else employee object
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", type: "permanent", contract: "full-time" });
  const [formError, setFormError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const allEmployees = [...EMPLOYEES, ...extraEmployees];
  const filtered = allEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    (e.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({ name: "", email: "", type: "permanent", contract: "full-time" });
    setEditTarget(null);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (emp) => {
    setForm({ name: emp.name, email: emp.email || "", type: emp.type, contract: emp.contract });
    setEditTarget(emp);
    setFormError("");
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) { setFormError("Name is required."); return; }
    if (editTarget) {
      // Edit existing extra employee
      setExtraEmployees(prev => prev.map(e => e.id === editTarget.id
        ? { ...e, name: form.name.trim(), email: form.email.trim(), type: form.type, contract: form.contract }
        : e
      ));
    } else {
      // Add new
      const newId = "X" + Date.now();
      setExtraEmployees(prev => [...prev, {
        id: newId,
        name: form.name.trim(),
        email: form.email.trim(),
        type: form.type,
        contract: form.contract,
      }]);
      // Set default password
      setPasswords(prev => {
        const updated = { ...prev, [newId]: "drc2026" };
        return updated;
      });
    }
    setShowForm(false);
    setEditTarget(null);
  };

  const handleDelete = (emp) => {
    if (EMPLOYEES.find(e => e.id === emp.id)) return; // can't delete built-in
    setExtraEmployees(prev => prev.filter(e => e.id !== emp.id));
    setPasswords(prev => {
      const updated = { ...prev };
      delete updated[emp.id];
      return updated;
    });
    setConfirmDelete(null);
  };

  const isNew = (emp) => extraEmployees.some(e => e.id === emp.id);

  const inputStyle = {
    width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0",
    borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#1e293b",
    background: "#fff", boxSizing: "border-box",
  };

  return (
    <div style={{ padding: "28px 24px" }}>
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>Employees</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>{allEmployees.length} total · {filtered.length} shown</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            style={{ ...inputStyle, width: 220, padding: "8px 12px" }}
          />
          <button onClick={openAdd} style={{
            padding: "9px 20px", background: "#111827", color: "#fff",
            border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13,
            fontWeight: 600, fontFamily: "inherit", whiteSpace: "nowrap",
          }}>
            + Add Employee
          </button>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>
              {editTarget ? "Edit Employee" : "Add New Employee"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Full Name *</label>
                <input value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setFormError(""); }}
                  placeholder="e.g. Sarah Johnson" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Email</label>
                <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="e.g. sarah@drcswitchboards.com.au" style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Employment Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={inputStyle}>
                    <option value="permanent">Permanent</option>
                    <option value="labour-hire">Labour Hire</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Contract</label>
                  <select value={form.contract} onChange={e => setForm(f => ({ ...f, contract: e.target.value }))} style={inputStyle}>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>
              </div>
              {!editTarget && (
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#166534" }}>
                  Default password will be set to <strong>drc2026</strong>. Employee must change it on first login.
                </div>
              )}
              {formError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#dc2626" }}>
                  {formError}
                </div>
              )}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={handleSave} style={{
                  flex: 1, padding: "11px", background: "#111827", color: "#fff",
                  border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
                }}>
                  {editTarget ? "Save Changes" : "Add Employee"}
                </button>
                <button onClick={() => { setShowForm(false); setEditTarget(null); }} style={{
                  flex: 1, padding: "11px", background: "#fff", color: "#64748b",
                  border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit"
                }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Remove employee?</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>
              <strong>{confirmDelete.name}</strong> will be removed from the portal. This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => handleDelete(confirmDelete)} style={{
                flex: 1, padding: "10px", background: "#dc2626", color: "#fff",
                border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
              }}>Remove</button>
              <button onClick={() => setConfirmDelete(null)} style={{
                flex: 1, padding: "10px", background: "#fff", color: "#64748b",
                border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer", fontFamily: "inherit"
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Employee grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 16 }}>
        {filtered.map((emp) => (
          <div key={emp.id} style={{
            background: "#fff", border: `1px solid ${isNew(emp) ? "#bbf7d0" : "#e2e8f0"}`,
            borderRadius: 12, padding: 20, position: "relative"
          }}>
            {isNew(emp) && (
              <span style={{
                position: "absolute", top: 12, right: 12,
                background: "#dcfce7", color: "#166534", fontSize: 10,
                fontWeight: 700, padding: "2px 8px", borderRadius: 20, letterSpacing: 0.5
              }}>NEW</span>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: emp.type === "labour-hire" ? "#fef9c3" : "#dbeafe",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 15,
                color: emp.type === "labour-hire" ? "#92400e" : "#1d4ed8"
              }}>
                {emp.name.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.name}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>ID: {emp.id}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
              <Badge type={emp.type} />
              <Badge type={emp.contract} />
            </div>
            {emp.email && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, wordBreak: "break-all" }}>{emp.email}</div>}
            {emp.type === "labour-hire" && (
              <div style={{ marginTop: 10, padding: "7px 10px", background: "#fffbeb", borderRadius: 7, fontSize: 11, color: "#92400e", border: "1px solid #fde68a" }}>
                Timesheet required for labour hire invoice reconciliation
              </div>
            )}
            {/* Action buttons — only for added employees */}
            {isNew(emp) && (
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button onClick={() => openEdit(emp)} style={{
                  flex: 1, padding: "6px 0", background: "#f8fafc", border: "1px solid #e2e8f0",
                  borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "inherit", color: "#475569", fontWeight: 600
                }}>✏️ Edit</button>
                <button onClick={() => setConfirmDelete(emp)} style={{
                  flex: 1, padding: "6px 0", background: "#fef2f2", border: "1px solid #fecaca",
                  borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "inherit", color: "#dc2626", fontWeight: 600
                }}>🗑️ Remove</button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
            No employees match your search.
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, padding: 16, background: "#eff6ff", borderRadius: 10, border: "1px solid #bfdbfe" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1d4ed8", marginBottom: 4 }}>9-Day Fortnight Arrangement</div>
        <div style={{ fontSize: 12, color: "#1e40af", lineHeight: 1.7 }}>
          Permanent employees work a 9-day fortnight (76 hours). They work extra hours Mon–Thu in week 1 so every second Monday is a Roster Day Off (RDO). Pay cycle runs <b>Thursday → Wednesday</b>.
        </div>
      </div>
    </div>
  );
}

// ── Shared header ──────────────────────────────────────────────────────────
function AppHeader({ user, onLogout, onChangePassword }) {
  return (
    <header style={{ background: "#111827", color: "#fff", padding: "0 24px", display: "flex", alignItems: "center", height: 64, gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img src="data:image/png;base64,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" alt="DRC Switchboards" style={{ height: 48, objectFit: "contain" }} />
        <div style={{ width: 1, height: 32, background: "#374151" }} />
        <span style={{ color: "#9ca3af", fontSize: 13, letterSpacing: 0.3 }}>Timesheet Portal</span>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, color: "#f9fafb", fontWeight: 600 }}>{user.name}</div>
          <div style={{ fontSize: 11, color: "#6b7280" }}>{user.role === "admin" ? "Administrator" : "Employee"}</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: user.role === "admin" ? "#dc2626" : "#2563eb",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 13, color: "#fff"
        }}>
          {user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <button onClick={onLogout} style={{
          padding: "6px 14px", background: "transparent", border: "1px solid #374151",
          borderRadius: 7, color: "#9ca3af", fontSize: 12, cursor: "pointer", fontFamily: "inherit"
        }}>Sign out</button>
        {onChangePassword && (
          <button onClick={onChangePassword} style={{
            padding: "6px 14px", background: "transparent", border: "1px solid #374151",
            borderRadius: 7, color: "#9ca3af", fontSize: 12, cursor: "pointer", fontFamily: "inherit"
          }}>Change password</button>
        )}
      </div>
    </header>
  );
}

// ── Login screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, passwords, extraEmployees = [] }) {
  const [mode, setMode] = useState(null); // null | "admin" | "employee"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = () => {
    if (username === "admin" && password === "drc2026") {
      onLogin({ role: "admin", name: "Administrator", id: "ADMIN" });
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleEmployeeLogin = () => {
    const allEmps = [...EMPLOYEES, ...extraEmployees];
    const emp = allEmps.find(e => e.id === employeeId);
    if (!emp) { setError("Employee not found. Please select your name."); return; }
    const stored = (passwords && passwords[emp.id]) || "drc2026";
    if (password === stored) {
      onLogin({ role: "employee", name: emp.name, id: emp.id, employeeData: emp });
    } else {
      setError("Incorrect password.");
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0",
    borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: "#1e293b",
    background: "#fff", boxSizing: "border-box", outline: "none",
  };
  const btnPrimary = {
    width: "100%", padding: "11px", background: "#111827", color: "#fff",
    border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit", marginTop: 4,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <img src="data:image/png;base64,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" alt="DRC Switchboards" style={{ height: 64, objectFit: "contain" }} />
      </div>

      {!mode ? (
        <div style={{ width: 360 }}>
          <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>Timesheet Portal</h2>
          <p style={{ textAlign: "center", color: "#64748b", fontSize: 13, marginBottom: 28 }}>Select how you'd like to sign in</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <button onClick={() => { setMode("admin"); setError(""); }} style={{
              padding: "18px 24px", background: "#fff", border: "1px solid #e2e8f0",
              borderRadius: 12, cursor: "pointer", textAlign: "left", fontFamily: "inherit",
              transition: "box-shadow 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔐</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>Admin Login</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Review, export & manage timesheets</div>
                </div>
              </div>
            </button>
            <button onClick={() => { setMode("employee"); setError(""); }} style={{
              padding: "18px 24px", background: "#fff", border: "1px solid #e2e8f0",
              borderRadius: 12, cursor: "pointer", textAlign: "left", fontFamily: "inherit",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👷</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>Employee Login</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Submit your fortnightly timesheet</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div style={{ width: 360, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 32 }}>
          <button onClick={() => { setMode(null); setError(""); setPassword(""); setUsername(""); setEmployeeId(""); }}
            style={{ background: "none", border: "none", color: "#64748b", fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: 20, display: "flex", alignItems: "center", gap: 4 }}>
            ← Back
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: mode === "admin" ? "#fef2f2" : "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              {mode === "admin" ? "🔐" : "👷"}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>{mode === "admin" ? "Admin Login" : "Employee Login"}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{mode === "admin" ? "Administrator access" : "Staff access"}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "admin" ? (
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Username</label>
                <input value={username} onChange={e => { setUsername(e.target.value); setError(""); }} placeholder="admin" style={inputStyle} />
              </div>
            ) : (
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Your Name</label>
                <select value={employeeId} onChange={e => { setEmployeeId(e.target.value); setError(""); }} style={{ ...inputStyle }}>
                  <option value="">Select your name…</option>
                  {[...EMPLOYEES, ...extraEmployees].map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>
            )}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && (mode === "admin" ? handleAdminLogin() : handleEmployeeLogin())}
                placeholder="••••••••" style={inputStyle} />
            </div>
            {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#dc2626" }}>{error}</div>}
            <button onClick={mode === "admin" ? handleAdminLogin : handleEmployeeLogin} style={btnPrimary}>
              Sign in
            </button>
          </div>
          <div style={{ marginTop: 16, padding: "10px 12px", background: "#f8fafc", borderRadius: 8, fontSize: 11, color: "#94a3b8", textAlign: "center" }}>
            Demo credentials — password: <strong>drc2026</strong>{mode === "admin" ? " · username: admin" : ""}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Admin nav ───────────────────────────────────────────────────────────────
function AdminNav({ current, onChange }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "review", label: "Review & Export" },
    { id: "jobs", label: "Job Register" },
    { id: "employees", label: "Employees" },
  ];
  return (
    <nav style={{ display: "flex", gap: 4, background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "0 24px" }}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          background: "none", border: "none", cursor: "pointer",
          padding: "14px 18px", fontSize: 13.5, fontWeight: current === t.id ? 600 : 400,
          color: current === t.id ? "#1e293b" : "#64748b",
          borderBottom: current === t.id ? "2px solid #dc2626" : "2px solid transparent",
          transition: "all 0.15s", fontFamily: "inherit"
        }}>
          {t.label}
        </button>
      ))}
    </nav>
  );
}

// ── Employee view (submit only their own timesheet) ─────────────────────────
function EmployeePortal({ user, entries, onSubmit, importedJobs = [] }) {
  const myEntries = entries.filter(e => e.employee?.id === user.id);
  const [view, setView] = useState("submit"); // "submit" | "history"

  return (
    <div>
      <nav style={{ display: "flex", gap: 4, background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "0 24px" }}>
        {[{ id: "submit", label: "Submit Timesheet" }, { id: "history", label: `My History (${myEntries.length})` }].map(t => (
          <button key={t.id} onClick={() => setView(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "14px 18px", fontSize: 13.5, fontWeight: view === t.id ? 600 : 400,
            color: view === t.id ? "#1e293b" : "#64748b",
            borderBottom: view === t.id ? "2px solid #2563eb" : "2px solid transparent",
            transition: "all 0.15s", fontFamily: "inherit"
          }}>{t.label}</button>
        ))}
      </nav>
      {view === "submit"
        ? (user.employeeData?.type === "labour-hire"
            ? <LabourHireTimesheetForm onSubmit={onSubmit} lockedEmployee={user.id} importedJobs={importedJobs} />
            : <TimesheetForm onSubmit={onSubmit} lockedEmployee={user.id} importedJobs={importedJobs} />
          )
        : (
          <div style={{ padding: "28px 24px" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>My Submitted Timesheets</h2>
            {myEntries.length === 0
              ? <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>No timesheets submitted yet.</div>
              : myEntries.map((entry, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 14, overflow: "hidden" }}>
                  <div style={{ padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600, color: "#1e293b", fontSize: 14 }}>Period starting {entry.periodStart}</span>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{Number(entry.totalHours).toFixed(1)}h · Submitted {new Date(entry.submittedAt).toLocaleDateString("en-AU")}</span>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead><tr style={{ background: "#f8fafc" }}>
                      {["Day", "Total Hrs", "Job Allocations", "Comments", "Rate", "Leave"].map(h => <th key={h} style={{ padding: "7px 16px", textAlign: "left", color: "#64748b", fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {entry.rows.filter(r => !r.isRDO).map((r, j) => {
                        const jobs = r.jobEntries || (r.jobCode ? [{ jobCode: r.jobCode, hours: r.hours }] : []);
                        return (
                        <tr key={j} style={{ borderBottom: "1px solid #f8fafc", verticalAlign: "top" }}>
                          <td style={{ padding: "6px 16px", color: "#475569" }}>{r.day}</td>
                          <td style={{ padding: "6px 16px", fontWeight: 600 }}>{r.totalHours || r.hours || 0}h</td>
                          <td style={{ padding: "6px 16px" }}>
                            {jobs.filter(je => je.jobCode).length > 0
                              ? <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                  {jobs.filter(je => je.jobCode).map((je, k) => (
                                    <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                      <span style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{je.jobCode}</span>
                                      <span style={{ fontSize: 11, color: "#64748b" }}>{je.hours}h</span>
                                    </div>
                                  ))}
                                </div>
                              : <span style={{ color: "#cbd5e1" }}>—</span>}
                          </td>
                          <td style={{ padding: "6px 16px", color: "#475569", fontStyle: "italic", fontSize: 11 }}>{r.comment || <span style={{ color: "#cbd5e1" }}>—</span>}</td>
                          <td style={{ padding: "6px 16px" }}>{r.overtimeType ? <span style={{ background: "#fef3c7", color: "#b45309", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{r.overtimeType}</span> : <span style={{ color: "#cbd5e1" }}>—</span>}</td>
                          <td style={{ padding: "6px 16px" }}>{r.leaveType ? <span style={{ background: "#fef9c3", color: "#92400e", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{r.leaveType}</span> : <span style={{ color: "#cbd5e1" }}>—</span>}</td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
}

// ── Change Password screen ──────────────────────────────────────────────────
function ChangePasswordScreen({ user, passwords, onSave }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const isFirstLogin = passwords[user.id] === "drc2026";

  const inputStyle = {
    width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0",
    borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: "#1e293b",
    background: "#fff", boxSizing: "border-box",
  };

  const handleSave = () => {
    const stored = passwords[user.id] || "drc2026";
    if (current !== stored) { setError("Current password is incorrect."); return; }
    if (next.length < 6) { setError("New password must be at least 6 characters."); return; }
    if (next !== confirm) { setError("Passwords do not match."); return; }
    if (next === "drc2026") { setError("Please choose a password different from the default."); return; }
    onSave(next);
    setDone(true);
  };

  if (done) return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 40, textAlign: "center", border: "1px solid #e2e8f0", width: 360 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Password updated!</h2>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>Your new password has been saved.</p>
        <button onClick={() => onSave(null)} style={{ padding: "10px 28px", background: "#111827", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
          Continue to portal
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0", width: 380 }}>
        <div style={{ marginBottom: 24 }}>
          {isFirstLogin && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#92400e" }}>
              <strong>Welcome!</strong> You're using the default password. Please set a personal password before continuing.
            </div>
          )}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
            {isFirstLogin ? "Set your password" : "Change password"}
          </h2>
          <p style={{ fontSize: 13, color: "#64748b" }}>Hi {user.name.split(" ")[0]} — keep your account secure.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Current password</label>
            <input type="password" value={current} onChange={e => { setCurrent(e.target.value); setError(""); }} placeholder="••••••••" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>New password</label>
            <input type="password" value={next} onChange={e => { setNext(e.target.value); setError(""); }} placeholder="At least 6 characters" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Confirm new password</label>
            <input type="password" value={confirm} onChange={e => { setConfirm(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleSave()}
              placeholder="••••••••" style={inputStyle} />
          </div>
          {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#dc2626" }}>{error}</div>}
          <button onClick={handleSave} style={{ padding: "11px", background: "#111827", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>
            Save new password
          </button>
          {!isFirstLogin && (
            <button onClick={() => onSave(null)} style={{ padding: "10px", background: "none", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Root app ────────────────────────────────────────────────────────────────
const DEFAULT_PASSWORD = "drc2026";

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [entries, setEntries] = useState([]);
  const [changingPassword, setChangingPassword] = useState(false);

  const [importedJobs, setImportedJobs] = useState([]);
  const [extraEmployees, setExtraEmployees] = useState([]);
  const [passwords, setPasswords] = useState({});

  // Load all shared data from the server on mount
  useEffect(() => {
    fetch("/api/store")
      .then(r => r.json())
      .then(data => {
        if (data.extraEmployees) setExtraEmployees(data.extraEmployees);
        if (data.passwords) setPasswords(data.passwords);
        if (data.importedJobs) setImportedJobs(data.importedJobs);
        if (data.entries) setEntries(data.entries);
      })
      .catch(() => {});
  }, []);

  const saveToServer = (patch) => {
    fetch("/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(() => {});
  };

  const updateExtraEmployees = (updater) => {
    setExtraEmployees(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToServer({ extraEmployees: next });
      return next;
    });
  };

  const updatePasswords = (updater) => {
    setPasswords(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToServer({ passwords: next });
      return next;
    });
  };

  const updateImportedJobs = (updater) => {
    setImportedJobs(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToServer({ importedJobs: next });
      return next;
    });
  };

  const getPassword = (id) => passwords[id] || DEFAULT_PASSWORD;

  const savePassword = (id, newPw) => {
    updatePasswords(prev => ({ ...prev, [id]: newPw }));
  };

  const handleLogin = (u) => {
    setUser(u);
    setTab(u.role === "admin" ? "dashboard" : "submit");
    // Force password change if still on default
    if (u.role === "employee" && getPassword(u.id) === DEFAULT_PASSWORD) {
      setChangingPassword(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setTab("dashboard");
    setChangingPassword(false);
  };

  const handleSubmit = (entry) => {
    setEntries((prev) => {
      const next = [...prev, entry];
      saveToServer({ entries: next });
      return next;
    });
  };

  if (!user) return <LoginScreen onLogin={handleLogin} passwords={passwords} extraEmployees={extraEmployees} />;

  // Show password change screen
  if (changingPassword) return (
    <ChangePasswordScreen
      user={user}
      passwords={passwords}
      onSave={(newPw) => {
        if (newPw) savePassword(user.id, newPw);
        setChangingPassword(false);
      }}
    />
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <AppHeader user={user} onLogout={handleLogout} onChangePassword={user.role === "employee" ? () => setChangingPassword(true) : null} />

      {user.role === "admin" ? (
        <>
          <AdminNav current={tab} onChange={setTab} />
          <main>
            {tab === "dashboard" && <Dashboard entries={entries} extraEmployees={extraEmployees} importedJobs={importedJobs} />}
            {tab === "review" && <ReviewPage entries={entries} />}
            {tab === "jobs" && <JobRegister importedJobs={importedJobs} setImportedJobs={updateImportedJobs} />}
            {tab === "employees" && <EmployeesPage extraEmployees={extraEmployees} setExtraEmployees={updateExtraEmployees} passwords={passwords} setPasswords={updatePasswords} />}
          </main>
        </>
      ) : (
        <EmployeePortal user={user} entries={entries} onSubmit={handleSubmit} importedJobs={importedJobs} />
      )}
    </div>
  );
}