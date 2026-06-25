const fs = require('fs');
let txt = fs.readFileSync('pages/index.js', 'utf8');
// Normalize to LF so all replacements work regardless of file's mixed endings
txt = txt.replace(/\r\n/g, '\n');

function check(label, old) {
  if (!txt.includes(old)) { console.error('FAIL [' + label + ']: search string not found'); process.exit(1); }
}

// ── 1. Add rejectingEntry state ────────────────────────────────────────────
const S1_OLD = `const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);`;
const S1_NEW = `const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);
  const [rejectingEntry, setRejectingEntry] = useState(null);`;
check('1', S1_OLD); txt = txt.replace(S1_OLD, S1_NEW);
console.log('1. rejectingEntry state');

// ── 2. Reject modal (insert before Page header comment) ────────────────────
const S2_OLD = `      {/* Page header */}`;
const S2_NEW = `      {/* Reject modal */}
      {rejectingEntry && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 28, width: 440, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Reject Timesheet</h3>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: "#64748b" }}>
              <strong>{rejectingEntry.entry.employee?.name}</strong> — period {fmtDisplay(rejectingEntry.entry.periodStart)}
            </p>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Reason for rejection (shown to employee)</label>
            <textarea
              value={rejectingEntry.comment}
              onChange={e => setRejectingEntry(prev => ({ ...prev, comment: e.target.value }))}
              rows={3}
              placeholder="e.g. Missing job allocations for Monday, please resubmit."
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", outline: "none" }}
              autoFocus
            />
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                onClick={() => {
                  const updated = { ...rejectingEntry.entry, status: "rejected", statusComment: rejectingEntry.comment.trim(), reviewedAt: new Date().toISOString() };
                  onUpdate(rejectingEntry.idx, updated);
                  setRejectingEntry(null);
                }}
                style={{ padding: "9px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>
                Confirm Reject
              </button>
              <button onClick={() => setRejectingEntry(null)}
                style={{ padding: "9px 18px", background: "#fff", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page header */}`;
check('2', S2_OLD); txt = txt.replace(S2_OLD, S2_NEW);
console.log('2. Reject modal');

// ── 3. Status badge column in submission row (after Submitted td, before hours) ──
const S3_OLD = `                              <td style={{ padding: "9px 14px", color: "#64748b", fontSize: 12 }}>
                                Submitted {new Date(entry.submittedAt).toLocaleDateString("en-AU")}
                              </td>
                              <td style={{ padding: "9px 14px", fontWeight: 700, color: Number(entry.totalHours) >= 76 ? "#16a34a" : "#1e293b" }}>
                                {Number(entry.totalHours).toFixed(1)}h
                              </td>`;
const S3_NEW = `                              <td style={{ padding: "9px 14px", color: "#64748b", fontSize: 12 }}>
                                Submitted {new Date(entry.submittedAt).toLocaleDateString("en-AU")}
                              </td>
                              <td style={{ padding: "9px 14px" }}>
                                {(() => {
                                  const st = entry.status || "pending";
                                  const cfg = { pending: { bg: "#fef9c3", color: "#92400e", label: "Pending" }, approved: { bg: "#dcfce7", color: "#15803d", label: "Approved" }, rejected: { bg: "#fee2e2", color: "#dc2626", label: "Rejected" } }[st] || { bg: "#f1f5f9", color: "#64748b", label: st };
                                  return <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{cfg.label}</span>;
                                })()}
                              </td>
                              <td style={{ padding: "9px 14px", fontWeight: 700, color: Number(entry.totalHours) >= 76 ? "#16a34a" : "#1e293b" }}>
                                {Number(entry.totalHours).toFixed(1)}h
                              </td>`;
check('3', S3_OLD); txt = txt.replace(S3_OLD, S3_NEW);
console.log('3. Status badge in submission row');

// ── 4. Approve / Reject / Undo buttons ────────────────────────────────────
const S4_OLD = `                                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                                  <button onClick={() => exportEntryCSV(entry)} style={btnSm("#1d4ed8", "#eff6ff", "1px solid #bfdbfe")}>↓ CSV</button>
                                  <button onClick={() => setEditingEntry({ idx: entry._idx, entry })} style={btnSm("#1e293b", "#f1f5f9", "1px solid #e2e8f0")}>Edit</button>
                                  <button onClick={() => setConfirmDeleteIdx(entry._idx)} style={btnSm("#dc2626", "#fef2f2", "1px solid #fecaca")}>Delete</button>
                                </div>`;
const S4_NEW = `                                <div style={{ display: "flex", gap: 5, justifyContent: "flex-end", flexWrap: "wrap" }}>
                                  <button onClick={() => exportEntryCSV(entry)} style={btnSm("#1d4ed8", "#eff6ff", "1px solid #bfdbfe")}>↓ CSV</button>
                                  {(entry.status || "pending") !== "approved" && (
                                    <button onClick={() => { onUpdate(entry._idx, { ...entry, status: "approved", statusComment: "", reviewedAt: new Date().toISOString() }); }} style={btnSm("#15803d", "#dcfce7", "1px solid #86efac")}>✓ Approve</button>
                                  )}
                                  {(entry.status || "pending") !== "rejected" && (
                                    <button onClick={() => setRejectingEntry({ idx: entry._idx, entry, comment: entry.statusComment || "" })} style={btnSm("#dc2626", "#fef2f2", "1px solid #fecaca")}>✗ Reject</button>
                                  )}
                                  {(entry.status || "pending") !== "pending" && (
                                    <button onClick={() => { onUpdate(entry._idx, { ...entry, status: "pending", statusComment: "", reviewedAt: null }); }} style={btnSm("#92400e", "#fef9c3", "1px solid #fde68a")}>↺ Reset</button>
                                  )}
                                  <button onClick={() => setEditingEntry({ idx: entry._idx, entry })} style={btnSm("#1e293b", "#f1f5f9", "1px solid #e2e8f0")}>Edit</button>
                                  <button onClick={() => setConfirmDeleteIdx(entry._idx)} style={btnSm("#dc2626", "#fef2f2", "1px solid #fecaca")}>Delete</button>
                                </div>`;
check('4', S4_OLD); txt = txt.replace(S4_OLD, S4_NEW);
console.log('4. Approve/Reject/Undo buttons');

// ── 5. Rejection note in daily detail tfoot ────────────────────────────────
const S5_OLD = `                                    <tfoot>
                                      <tr style={{ background: "#dbeafe", borderTop: "1px solid #93c5fd" }}>
                                        <td colSpan={2} style={{ padding: "7px 14px", fontWeight: 700, color: "#1d4ed8", fontSize: 12 }}>Period Total</td>
                                        <td style={{ padding: "7px 14px", fontWeight: 700, color: "#1d4ed8", fontSize: 13 }}>{Number(entry.totalHours).toFixed(1)}h</td>
                                        <td colSpan={4} />
                                      </tr>
                                    </tfoot>`;
const S5_NEW = `                                    <tfoot>
                                      <tr style={{ background: "#dbeafe", borderTop: "1px solid #93c5fd" }}>
                                        <td colSpan={2} style={{ padding: "7px 14px", fontWeight: 700, color: "#1d4ed8", fontSize: 12 }}>Period Total</td>
                                        <td style={{ padding: "7px 14px", fontWeight: 700, color: "#1d4ed8", fontSize: 13 }}>{Number(entry.totalHours).toFixed(1)}h</td>
                                        <td colSpan={4} />
                                      </tr>
                                      {entry.status === "rejected" && entry.statusComment && (
                                        <tr style={{ background: "#fef2f2" }}>
                                          <td colSpan={7} style={{ padding: "8px 14px", color: "#dc2626", fontSize: 12, fontStyle: "italic" }}>
                                            <strong>Rejection reason:</strong> {entry.statusComment}
                                          </td>
                                        </tr>
                                      )}
                                    </tfoot>`;
check('5', S5_OLD); txt = txt.replace(S5_OLD, S5_NEW);
console.log('5. Rejection note in detail tfoot');

// ── 6. Employee history table header: add Status column ───────────────────
const S6_OLD = `{["Fortnight Starting", "Total Hours", "Submitted", ""].map(h => (`;
const S6_NEW = `{["Fortnight Starting", "Total Hours", "Submitted", "Status", ""].map(h => (`;
check('6', S6_OLD); txt = txt.replace(S6_OLD, S6_NEW);
console.log('6. Status column in employee history header');

// ── 7. Employee summaryRow: add status badge ───────────────────────────────
// Use indexOf to find and replace (avoids template-literal escaping issues)
const S7_ANCHOR = 'const summaryRow = (';
const S7_END_MARKER = ');\n                        if (!isOpen) return [summaryRow];';
const anchorIdx = txt.indexOf(S7_ANCHOR, txt.indexOf('function EmployeePortal('));
if (anchorIdx < 0) { console.error('FAIL [7]: summaryRow anchor not found'); process.exit(1); }
const endIdx7 = txt.indexOf(S7_END_MARKER, anchorIdx);
if (endIdx7 < 0) { console.error('FAIL [7]: summaryRow end not found'); process.exit(1); }

// Replace from anchor to end of the );
const oldBlock7 = txt.slice(anchorIdx, endIdx7 + S7_END_MARKER.length);
const newBlock7 = `// Derive group-level status (rejected > pending > approved)
                        const statusRank = { rejected: 2, pending: 1, approved: 0 };
                        const groupStatus = group.entries.reduce((worst, e) => {
                          const s = e.status || "pending";
                          return statusRank[s] > statusRank[worst] ? s : worst;
                        }, "approved");
                        const groupRejectionComments = group.entries.filter(e => e.status === "rejected" && e.statusComment).map(e => e.statusComment);
                        const statusCfg = {
                          pending:  { bg: "#fef9c3", color: "#92400e", label: "Pending review" },
                          approved: { bg: "#dcfce7", color: "#15803d", label: "Approved" },
                          rejected: { bg: "#fee2e2", color: "#dc2626", label: "Rejected" },
                        }[groupStatus];
                        const summaryRow = (
                          <tr key={\`s-\${group.fnStart}\`} onClick={() => toggleExpand(group.fnStart)} style={{ borderBottom: isOpen ? "none" : "1px solid #e2e8f0", background: isOpen ? "#eff6ff" : "#fff", cursor: "pointer" }}>
                            <td style={{ padding: "12px 16px", fontWeight: 700, color: "#1e293b" }}>{group.fnStart}</td>
                            <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f172a" }}>{groupHours.toFixed(1)}h</td>
                            <td style={{ padding: "12px 16px", color: "#64748b", fontSize: 12 }}>{new Date(group.submittedAt).toLocaleDateString("en-AU")}</td>
                            <td style={{ padding: "12px 16px" }}>
                              <span style={{ background: statusCfg.bg, color: statusCfg.color, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{statusCfg.label}</span>
                            </td>
                            <td style={{ padding: "12px 16px", textAlign: "right", color: "#2563eb", fontSize: 12, fontWeight: 600 }}>{isOpen ? "▲ Hide" : "▼ Details"}</td>
                          </tr>
                        );
                        if (!isOpen) return [summaryRow];`;

txt = txt.slice(0, anchorIdx) + newBlock7 + txt.slice(anchorIdx + oldBlock7.length);
console.log('7. Status badge in employee summaryRow');

// ── 8. Employee: show rejection comment callout when expanded ─────────────
const S8_OLD = `                        return [summaryRow, ...detailRows];`;
const S8_NEW = `                        const rejectionBanner = (groupStatus === "rejected" && groupRejectionComments.length > 0) ? (
                          <tr key={\`rej-\${group.fnStart}\`} style={{ background: "#fef2f2" }}>
                            <td colSpan={5} style={{ padding: "10px 20px 10px 32px", borderBottom: "1px solid #fecaca" }}>
                              <div style={{ color: "#dc2626", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Rejection reason from admin:</div>
                              {groupRejectionComments.map((c, i) => (
                                <div key={i} style={{ color: "#991b1b", fontSize: 12, fontStyle: "italic" }}>{c}</div>
                              ))}
                            </td>
                          </tr>
                        ) : null;
                        return [summaryRow, ...[rejectionBanner, ...detailRows].filter(Boolean)];`;
check('8', S8_OLD); txt = txt.replace(S8_OLD, S8_NEW);
console.log('8. Rejection callout in employee history');

fs.writeFileSync('pages/index.js', txt, 'utf8');
console.log('\nDone — approval workflow applied.');
