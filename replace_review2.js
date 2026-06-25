const fs = require('fs');
let txt = fs.readFileSync('pages/index.js', 'utf8');

const START = 'function ReviewPage({ entries, onDelete, onUpdate, importedJobs = [] }) {';
const END = '\r\nfunction JobRegister(';
const startIdx = txt.indexOf(START);
const endIdx = txt.indexOf(END, startIdx);

const NEW_REVIEW = `function ReviewPage({ entries, onDelete, onUpdate, importedJobs = [] }) {
  const [filter, setFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedEmps, setExpandedEmps] = useState(new Set());
  const [expandedEntries, setExpandedEntries] = useState(new Set());
  const [editingEntry, setEditingEntry] = useState(null);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);

  const allOpenJobs = [...openJobs, ...importedJobs.filter(j => j.status === "open")];
  const allPeriods = [...new Set(entries.map(e => e.periodStart).filter(Boolean))].sort().reverse();

  const toggleEmp = (id) => setExpandedEmps(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleEntry = (key) => setExpandedEntries(prev => { const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s; });

  const withIdx = entries.map((e, i) => ({ ...e, _idx: i }));
  const filtered = withIdx
    .filter(e => filter === "all" || e.employee?.type === filter)
    .filter(e => periodFilter === "all" || e.periodStart === periodFilter)
    .filter(e => !search.trim() || (e.employee?.name || "").toLowerCase().includes(search.toLowerCase()));

  // Group by employee, sorted A→Z
  const grouped = Object.values(
    filtered.reduce((acc, entry) => {
      const id = entry.employee?.id || entry.employee?.name || "unknown";
      if (!acc[id]) acc[id] = { employee: entry.employee, submissions: [] };
      acc[id].submissions.push(entry);
      return acc;
    }, {})
  )
    .sort((a, b) => (a.employee?.name || "").localeCompare(b.employee?.name || ""))
    .map(g => ({
      ...g,
      submissions: g.submissions.slice().sort((a, b) => (b.periodStart || "").localeCompare(a.periodStart || "")),
    }));

  const totalFilteredHours = filtered.reduce((s, e) => s + Number(e.totalHours || 0), 0);

  const buildCSV = (ents) => {
    const headers = ["Employee", "Type", "Period Start", "Day", "Week", "Hours", "Job Allocations", "Comments", "Rate", "Leave Type", "Submitted At"];
    const lines = [headers.join(",")];
    ents.forEach(e => {
      e.rows.forEach(r => {
        const jobs = r.jobEntries || (r.jobCode ? [{ jobCode: r.jobCode, hours: r.hours }] : []);
        const jobSummary = jobs.filter(je => je.jobCode).map(je => \`\${je.jobCode}(\${je.hours}h)\`).join("; ");
        lines.push([
          e.employee?.name, e.employee?.type, e.periodStart,
          r.day, r.week || "", r.totalHours || r.hours || 0,
          jobSummary, r.comment || "", r.overtimeType || "", r.leaveType || "",
          new Date(e.submittedAt).toLocaleString(),
        ].map(v => \`"\${String(v ?? "").replace(/"/g, '""')}"\`).join(","));
      });
    });
    return lines.join("\\n");
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
  };

  const exportAllCSV = () => {
    if (!filtered.length) return alert("No entries to export.");
    downloadCSV(buildCSV(filtered), "drc_timesheets.csv");
  };

  const exportEmpCSV = (group) => {
    const name = (group.employee?.name || "employee").replace(/\\s+/g, "_");
    downloadCSV(buildCSV(group.submissions), \`\${name}_all.csv\`);
  };

  const exportEntryCSV = (entry) => {
    const name = (entry.employee?.name || "timesheet").replace(/\\s+/g, "_");
    downloadCSV(buildCSV([entry]), \`\${name}_\${entry.periodStart}.csv\`);
  };

  const inp = { padding: "7px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: "#fff", color: "#1e293b", outline: "none" };
  const btnSm = (color, bg, border) => ({ padding: "4px 10px", background: bg, color, border, borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit", whiteSpace: "nowrap" });

  return (
    <div style={{ padding: "28px 24px" }}>

      {/* Edit modal */}
      {editingEntry && (
        <EditTimesheetModal
          entry={editingEntry.entry}
          entryIdx={editingEntry.idx}
          allOpenJobs={allOpenJobs}
          onSave={(idx, updated) => { onUpdate(idx, updated); setEditingEntry(null); }}
          onClose={() => setEditingEntry(null)}
        />
      )}

      {/* Delete confirmation */}
      {confirmDeleteIdx !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 28, width: 400, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Delete Timesheet?</h3>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: "#64748b" }}>
              This will permanently remove the timesheet for <strong>{entries[confirmDeleteIdx]?.employee?.name}</strong> (period {entries[confirmDeleteIdx]?.periodStart}). This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { onDelete(confirmDeleteIdx); setConfirmDeleteIdx(null); }}
                style={{ padding: "9px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>
                Delete
              </button>
              <button onClick={() => setConfirmDeleteIdx(null)}
                style={{ padding: "9px 18px", background: "#fff", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>Review & Export</h2>
          <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}>
            {grouped.length} employee{grouped.length !== 1 ? "s" : ""} · {filtered.length} submission{filtered.length !== 1 ? "s" : ""} · {totalFilteredHours.toFixed(1)}h total
          </p>
        </div>
        <button onClick={exportAllCSV} style={{ padding: "8px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>
          ↓ Export All CSV
        </button>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee…"
          style={{ ...inp, minWidth: 190 }} />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={inp}>
          <option value="all">All types</option>
          <option value="permanent">Permanent</option>
          <option value="labour-hire">Labour Hire</option>
        </select>
        <select value={periodFilter} onChange={e => setPeriodFilter(e.target.value)} style={inp}>
          <option value="all">All periods</option>
          {allPeriods.map(p => <option key={p} value={p}>{fmtDisplay(p)}</option>)}
        </select>
        {(search || filter !== "all" || periodFilter !== "all") && (
          <button onClick={() => { setSearch(""); setFilter("all"); setPeriodFilter("all"); }}
            style={{ padding: "7px 12px", background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            ✕ Clear filters
          </button>
        )}
      </div>

      {/* Grouped table */}
      {grouped.length === 0
        ? <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8", fontSize: 15, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12 }}>
            {entries.length === 0 ? "No timesheets submitted yet." : "No results match your filters."}
          </div>
        : <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ width: 28 }} />
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#475569", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Employee</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#475569", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Type</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#475569", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Submissions</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#475569", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Hours</th>
                  <th style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: "#475569", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>Export</th>
                </tr>
              </thead>
              <tbody>
                {grouped.map((group, gi) => {
                  const empId = group.employee?.id || group.employee?.name || String(gi);
                  const isEmpOpen = expandedEmps.has(empId);
                  const empTotalHours = group.submissions.reduce((s, e) => s + Number(e.totalHours || 0), 0);

                  return (
                    <React.Fragment key={empId}>
                      {/* ── Employee header row ── */}
                      <tr
                        onClick={() => toggleEmp(empId)}
                        style={{
                          cursor: "pointer",
                          background: isEmpOpen ? "#1e293b" : gi % 2 === 0 ? "#f8fafc" : "#fff",
                          borderTop: gi > 0 ? "2px solid #e2e8f0" : "none",
                        }}
                      >
                        <td style={{ padding: "12px 0 12px 14px", color: isEmpOpen ? "#94a3b8" : "#64748b", fontSize: 12, userSelect: "none", fontWeight: 700 }}>
                          {isEmpOpen ? "▼" : "▶"}
                        </td>
                        <td style={{ padding: "12px 14px", fontWeight: 700, fontSize: 14, color: isEmpOpen ? "#fff" : "#0f172a" }}>
                          {group.employee?.name || "Unknown"}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <Badge type={group.employee?.type} />
                        </td>
                        <td style={{ padding: "12px 14px", color: isEmpOpen ? "#94a3b8" : "#64748b", fontSize: 13 }}>
                          {group.submissions.length} submission{group.submissions.length !== 1 ? "s" : ""}
                        </td>
                        <td style={{ padding: "12px 14px", fontWeight: 700, color: isEmpOpen ? "#60a5fa" : "#2563eb", fontSize: 14 }}>
                          {empTotalHours.toFixed(1)}h
                        </td>
                        <td style={{ padding: "12px 14px", textAlign: "right" }} onClick={e => e.stopPropagation()}>
                          <button onClick={() => exportEmpCSV(group)}
                            style={{ ...btnSm(isEmpOpen ? "#60a5fa" : "#1d4ed8", isEmpOpen ? "#1e3a5f" : "#eff6ff", isEmpOpen ? "1px solid #1d4ed8" : "1px solid #bfdbfe") }}>
                            ↓ CSV
                          </button>
                        </td>
                      </tr>

                      {/* ── Submissions list (when employee expanded) ── */}
                      {isEmpOpen && group.submissions.map((entry, si) => {
                        const entryKey = String(entry._idx);
                        const isEntryOpen = expandedEntries.has(entryKey);
                        const workRows = entry.rows.filter(r => !r.isRDO || r.leaveType || Number(r.totalHours || 0) > 0);

                        return (
                          <React.Fragment key={entryKey}>
                            {/* Period summary row */}
                            <tr
                              onClick={() => toggleEntry(entryKey)}
                              style={{ cursor: "pointer", background: isEntryOpen ? "#eff6ff" : si % 2 === 0 ? "#f8fbff" : "#f0f7ff", borderTop: "1px solid #e2e8f0" }}
                            >
                              <td style={{ padding: "9px 0 9px 28px", color: "#94a3b8", fontSize: 11, userSelect: "none" }}>
                                {isEntryOpen ? "▼" : "▶"}
                              </td>
                              <td style={{ padding: "9px 14px", color: "#475569", fontFamily: "monospace", fontSize: 12 }}>
                                {fmtDisplay(entry.periodStart)}
                              </td>
                              <td style={{ padding: "9px 14px" }}>
                                <span style={{ background: "#f1f5f9", color: "#64748b", borderRadius: 5, padding: "2px 8px", fontSize: 11 }}>
                                  {entry.employee?.type === "labour-hire" ? "Weekly" : "Fortnightly"}
                                </span>
                              </td>
                              <td style={{ padding: "9px 14px", color: "#64748b", fontSize: 12 }}>
                                Submitted {new Date(entry.submittedAt).toLocaleDateString("en-AU")}
                              </td>
                              <td style={{ padding: "9px 14px", fontWeight: 700, color: Number(entry.totalHours) >= 76 ? "#16a34a" : "#1e293b" }}>
                                {Number(entry.totalHours).toFixed(1)}h
                              </td>
                              <td style={{ padding: "9px 14px", textAlign: "right" }} onClick={e => e.stopPropagation()}>
                                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                                  <button onClick={() => exportEntryCSV(entry)} style={btnSm("#1d4ed8", "#eff6ff", "1px solid #bfdbfe")}>↓ CSV</button>
                                  <button onClick={() => setEditingEntry({ idx: entry._idx, entry })} style={btnSm("#1e293b", "#f1f5f9", "1px solid #e2e8f0")}>Edit</button>
                                  <button onClick={() => setConfirmDeleteIdx(entry._idx)} style={btnSm("#dc2626", "#fef2f2", "1px solid #fecaca")}>Delete</button>
                                </div>
                              </td>
                            </tr>

                            {/* Daily detail (when entry expanded) */}
                            {isEntryOpen && (
                              <tr style={{ background: "#f0f7ff" }}>
                                <td colSpan={6} style={{ padding: 0, borderTop: "1px solid #bfdbfe", borderBottom: "1px solid #bfdbfe" }}>
                                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                                    <thead>
                                      <tr style={{ background: "#dbeafe" }}>
                                        {["Wk", "Day", "Hours", "Job Allocations", "Comments", "Rate", "Leave / Other"].map(h => (
                                          <th key={h} style={{ padding: "6px 14px 6px 14px", textAlign: "left", fontWeight: 600, color: "#1d4ed8", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {workRows.map((r, j) => {
                                        const jobs = r.jobEntries || (r.jobCode ? [{ jobCode: r.jobCode, hours: r.hours }] : []);
                                        const hasJobs = jobs.filter(je => je.jobCode).length > 0;
                                        const bg = r.isRDO ? "#f8fafc" : r.isHoliday ? "#fff5f5" : r.isWeekend ? "#f5f3ff" : j % 2 === 0 ? "#f8fbff" : "#eef6ff";
                                        return (
                                          <tr key={j} style={{ background: bg, borderBottom: "1px solid #dbeafe" }}>
                                            <td style={{ padding: "7px 14px", color: "#64748b", fontSize: 11, whiteSpace: "nowrap", width: 48 }}>
                                              {r.week ? \`Wk \${r.week}\` : ""}
                                            </td>
                                            <td style={{ padding: "7px 14px", fontWeight: 500, color: r.isRDO ? "#94a3b8" : r.isWeekend ? "#7c3aed" : "#1e293b", whiteSpace: "nowrap", minWidth: 110 }}>
                                              {r.day}
                                              {r.isHoliday && <span style={{ marginLeft: 6, background: "#fee2e2", color: "#dc2626", borderRadius: 4, padding: "1px 5px", fontSize: 10, fontWeight: 700 }}>Holiday</span>}
                                              {r.isWeekend && <span style={{ marginLeft: 6, color: "#a78bfa", fontSize: 10 }}>Weekend</span>}
                                              {r.isRDO && <span style={{ marginLeft: 6, color: "#94a3b8", fontSize: 10 }}>RDO</span>}
                                            </td>
                                            <td style={{ padding: "7px 14px", fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap" }}>
                                              {r.isRDO && !Number(r.totalHours) ? <span style={{ color: "#94a3b8" }}>—</span> : \`\${r.totalHours || r.hours || 0}h\`}
                                            </td>
                                            <td style={{ padding: "7px 14px", minWidth: 180 }}>
                                              {hasJobs
                                                ? <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                                    {jobs.filter(je => je.jobCode).map((je, k) => (
                                                      <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#dbeafe", color: "#1d4ed8", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>
                                                        {je.jobCode} <span style={{ color: "#64748b", fontWeight: 400 }}>{je.hours}h</span>
                                                      </span>
                                                    ))}
                                                  </div>
                                                : <span style={{ color: "#cbd5e1" }}>—</span>
                                              }
                                            </td>
                                            <td style={{ padding: "7px 14px", color: "#475569", fontStyle: "italic", maxWidth: 160 }}>{r.comment || <span style={{ color: "#e2e8f0" }}>—</span>}</td>
                                            <td style={{ padding: "7px 14px" }}>
                                              {r.overtimeType ? <span style={{ background: "#fef3c7", color: "#b45309", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{r.overtimeType}</span> : <span style={{ color: "#e2e8f0" }}>—</span>}
                                            </td>
                                            <td style={{ padding: "7px 14px" }}>
                                              {r.leaveType ? <span style={{ background: "#fef9c3", color: "#92400e", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{r.leaveType}</span> : <span style={{ color: "#e2e8f0" }}>—</span>}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                    <tfoot>
                                      <tr style={{ background: "#dbeafe", borderTop: "1px solid #93c5fd" }}>
                                        <td colSpan={2} style={{ padding: "7px 14px", fontWeight: 700, color: "#1d4ed8", fontSize: 12 }}>Period Total</td>
                                        <td style={{ padding: "7px 14px", fontWeight: 700, color: "#1d4ed8", fontSize: 13 }}>{Number(entry.totalHours).toFixed(1)}h</td>
                                        <td colSpan={4} />
                                      </tr>
                                    </tfoot>
                                  </table>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background: "#f8fafc", borderTop: "2px solid #e2e8f0" }}>
                  <td colSpan={3} style={{ padding: "10px 14px", fontWeight: 700, color: "#1e293b", fontSize: 13 }}>
                    {grouped.length} employee{grouped.length !== 1 ? "s" : ""} · {filtered.length} submission{filtered.length !== 1 ? "s" : ""}
                  </td>
                  <td />
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: "#2563eb", fontSize: 14 }}>{totalFilteredHours.toFixed(1)}h</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
      }
    </div>
  );
}`;

txt = txt.slice(0, startIdx) + NEW_REVIEW + txt.slice(endIdx);
fs.writeFileSync('pages/index.js', txt, 'utf8');
console.log('OK: ReviewPage replaced with name-grouped layout');
