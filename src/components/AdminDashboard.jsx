import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Inbox,
  LogOut,
  Menu,
  MessageSquareText,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import "../Admin.css";

const STATUS_OPTIONS = ["new", "contacted", "in_progress", "completed"];

const statusLabel = (status) => ({
  new: "New",
  contacted: "Contacted",
  in_progress: "In progress",
  in_review: "In progress",
  completed: "Completed",
  closed: "Completed",
}[status] || status);

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadSession = async () => {
    if (!supabase) {
      setError("Supabase environment variables are not configured.");
      setCheckingSession(false);
      return;
    }
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    setCheckingSession(false);
  };

  const verifyAdmin = async (currentSession) => {
    if (!currentSession || !supabase) return;
    const { data, error: rpcError } = await supabase.rpc("is_adnov_admin");
    if (rpcError) {
      setError(rpcError.message);
      setAuthorized(false);
      return;
    }
    setAuthorized(data === true);
  };

  const loadEnquiries = async () => {
    if (!supabase || !authorized) return;
    setLoading(true);
    const { data, error: queryError } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (queryError) setError(queryError.message);
    else setEnquiries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadSession();
    if (!supabase) return undefined;
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthorized(false);
      if (!newSession) setEnquiries([]);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    verifyAdmin(session);
  }, [session]);

  useEffect(() => {
    if (authorized) loadEnquiries();
  }, [authorized]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    if (!supabase) {
      setError("Supabase environment variables are not configured.");
      return;
    }
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) setError(loginError.message);
    else {
      setSession(data.session);
      await verifyAdmin(data.session);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setAuthorized(false);
  };

  const updateStatus = async (id, status) => {
    setError("");
    const { error: updateError } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (updateError) setError(updateError.message);
    else {
      setEnquiries((current) => current.map((item) => item.id === id ? { ...item, status } : item));
      setSelected((current) => current?.id === id ? { ...current, status } : current);
    }
  };

  const deleteEnquiry = async (item) => {
    if (!window.confirm(`Delete the enquiry from ${item.full_name}?`)) return;
    const { error: deleteError } = await supabase.from("enquiries").delete().eq("id", item.id);
    if (deleteError) setError(deleteError.message);
    else {
      setEnquiries((current) => current.filter((entry) => entry.id !== item.id));
      setSelected(null);
    }
  };

  const stats = useMemo(() => ({
    total: enquiries.length,
    new: enquiries.filter((item) => item.status === "new").length,
    contacted: enquiries.filter((item) => item.status === "contacted").length,
    progress: enquiries.filter((item) => ["in_progress", "in_review"].includes(item.status)).length,
    completed: enquiries.filter((item) => ["completed", "closed"].includes(item.status)).length,
  }), [enquiries]);

  const visibleEnquiries = useMemo(() => enquiries.filter((item) => {
    const matchesStatus = statusFilter === "all"
      || (statusFilter === "in_progress" && ["in_progress", "in_review"].includes(item.status))
      || (statusFilter === "completed" && ["completed", "closed"].includes(item.status))
      || item.status === statusFilter;
    const text = `${item.full_name} ${item.email} ${item.phone || ""} ${item.service} ${item.company || ""}`.toLowerCase();
    return matchesStatus && text.includes(search.toLowerCase());
  }), [enquiries, search, statusFilter]);

  if (checkingSession) return <main className="admin-auth-shell"><div className="admin-loader" /></main>;

  if (!session || !authorized) {
    return (
      <main className="admin-auth-shell">
        <div className="admin-auth-orb admin-auth-orb-one" />
        <div className="admin-auth-orb admin-auth-orb-two" />
        <form className="admin-auth-card" onSubmit={handleLogin}>
          <img src="/adnov.png" alt="ADNOV" className="admin-logo" />
          <div>
            <span className="admin-eyebrow">SECURE ACCESS</span>
            <h1>Admin Dashboard</h1>
            <p>Sign in with an authorized ADNOV account.</p>
          </div>
          {session && !authorized && <div className="admin-error">This account is not authorized to access the dashboard.</div>}
          {error && <div className="admin-error">{error}</div>}
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
          <button className="admin-primary-button" type="submit"><LogOut size={17} /> Sign in</button>
        </form>
      </main>
    );
  }

  const statCards = [
    ["Total enquiries", stats.total, Inbox], ["New", stats.new, Clock3],
    ["Contacted", stats.contacted, MessageSquareText], ["In progress", stats.progress, BarChart3],
    ["Completed", stats.completed, CheckCircle2],
  ];

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-brand"><img src="/adnov.png" alt="ADNOV" /><button aria-label="Close navigation" onClick={() => setSidebarOpen(false)}><X /></button></div>
        <nav><a className="active" href="#overview"><BarChart3 size={18} /> Overview</a><a href="#enquiries"><Inbox size={18} /> Enquiries</a></nav>
        <div className="admin-user"><div>{session.user.email?.[0]?.toUpperCase() || <UserRound size={18} />}</div><span><strong>Administrator</strong><small>{session.user.email}</small></span></div>
        <button className="admin-logout" type="button" onClick={handleLogout}><LogOut size={17} /> Sign out</button>
      </aside>
      {sidebarOpen && <button className="admin-sidebar-backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}

      <main className="admin-main">
        <header className="admin-topbar"><button className="admin-menu-button" type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu /></button><div><span>ADNOV CONTROL CENTER</span><h1>Enquiry Dashboard</h1></div></header>
        {error && <div className="admin-error admin-page-error">{error}</div>}
        <section className="admin-stats" id="overview">
          {statCards.map(([label, value, Icon]) => <article className="admin-stat-card" key={label}><div className="admin-stat-icon"><Icon size={20} /></div><span>{label}</span><strong>{value}</strong></article>)}
        </section>

        <section className="admin-panel" id="enquiries">
          <div className="admin-panel-heading"><div><span>INBOX</span><h2>Enquiries</h2></div><button className="admin-refresh" type="button" onClick={loadEnquiries} disabled={loading}>{loading ? "Loading..." : "Refresh"}</button></div>
          <div className="admin-toolbar"><label className="admin-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, phone or service" /></label><label className="admin-filter"><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option>{STATUS_OPTIONS.map((status) => <option value={status} key={status}>{statusLabel(status)}</option>)}</select><ChevronDown size={16} /></label></div>
          <div className="admin-table-wrap"><table><thead><tr><th>Customer</th><th>Service</th><th>Date</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{visibleEnquiries.map((item) => <tr key={item.id} onClick={() => setSelected(item)}><td><strong>{item.full_name}</strong><span>{item.email}</span></td><td>{item.service}</td><td>{item.created_at ? new Date(item.created_at).toLocaleDateString() : "—"}</td><td><select className={`admin-status status-${item.status}`} value={item.status === "in_review" ? "in_progress" : item.status === "closed" ? "completed" : item.status} onChange={(event) => { event.stopPropagation(); updateStatus(item.id, event.target.value); }}><option value="new">New</option><option value="contacted">Contacted</option><option value="in_progress">In progress</option><option value="completed">Completed</option></select></td><td><button type="button" className="admin-delete" aria-label={`Delete enquiry from ${item.full_name}`} onClick={(event) => { event.stopPropagation(); deleteEnquiry(item); }}><Trash2 size={16} /></button></td></tr>)}</tbody></table>{visibleEnquiries.length === 0 && <div className="admin-empty">No enquiries match these filters.</div>}</div>
        </section>
      </main>

      {selected && <div className="admin-detail-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><aside className="admin-detail"><button className="admin-detail-close" type="button" aria-label="Close details" onClick={() => setSelected(null)}><X /></button><span className="admin-eyebrow">ENQUIRY DETAILS</span><h2>{selected.full_name}</h2><p className="admin-detail-meta">{selected.email}<br />{selected.phone}</p><dl><div><dt>Company</dt><dd>{selected.company || "Not provided"}</dd></div><div><dt>Service</dt><dd>{selected.service}</dd></div><div><dt>Budget</dt><dd>{selected.budget || "Not specified"}</dd></div><div><dt>Preferred contact</dt><dd>{selected.contact_method}</dd></div></dl><h3>Project message</h3><p className="admin-message">{selected.message}</p><label>Status<select value={selected.status === "in_review" ? "in_progress" : selected.status === "closed" ? "completed" : selected.status} onChange={(event) => updateStatus(selected.id, event.target.value)}>{STATUS_OPTIONS.map((status) => <option value={status} key={status}>{statusLabel(status)}</option>)}</select></label><button className="admin-delete-detail" type="button" onClick={() => deleteEnquiry(selected)}><Trash2 size={16} /> Delete enquiry</button></aside></div>}
    </div>
  );
}
