import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../config/firebase";
import { ROUTES } from "../config/routes";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  FiBook, FiClipboard, FiLifeBuoy,
  FiBookOpen, FiBriefcase, FiArrowRight,
  FiUpload, FiBell, FiClock
} from "react-icons/fi";

const modules = [
  { title: "Academic Materials", desc: "Syllabi, notes, PYQs, e-books", icon: <FiBook />, color: "text-blue-500", bg: "bg-blue-50", route: ROUTES.ACADEMIC, countKey: "academic" },
  { title: "Administration", desc: "Registration, fees, calendar", icon: <FiClipboard />, color: "text-amber-500", bg: "bg-amber-50", route: ROUTES.ADMIN, countKey: null },
  { title: "Support Services", desc: "IT help, scholarships, mental health", icon: <FiLifeBuoy />, color: "text-green-500", bg: "bg-green-50", route: ROUTES.SUPPORT, countKey: null },
  { title: "Library Access", desc: "Digital library, book search, journals", icon: <FiBookOpen />, color: "text-rose-500", bg: "bg-rose-50", route: ROUTES.LIBRARY, countKey: null },
  { title: "Alumni & Career", desc: "Network, jobs, internships", icon: <FiBriefcase />, color: "text-purple-500", bg: "bg-purple-50", route: ROUTES.CAREER, countKey: null },
];

const notices = [
  { tag: "Urgent", tagClass: "badge-error", text: "Exam timetable for May 2025 published", time: "2 hours ago" },
  { tag: "Info", tagClass: "badge-info", text: "Scholarship portal open until April 30", time: "Yesterday" },
  { tag: "Event", tagClass: "badge-success", text: "Tech Fest 2025 — registrations open", time: "3 days ago" },
];

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [academicCount, setAcademicCount] = useState(0);
  const [recentFiles, setRecentFiles] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "nord");
  const [loading, setLoading] = useState(true);

  // Fetch real Firestore data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Total academic files count
        const allDocs = await getDocs(collection(db, "academic"));
        setAcademicCount(allDocs.size);

        // 3 most recent files
        const q = query(collection(db, "academic"), orderBy("createdAt", "desc"), limit(3));
        const snap = await getDocs(q);
        setRecentFiles(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Dark mode toggle
  const toggleTheme = () => {
    const next = theme === "nord" ? "night" : "nord";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const firstName = user?.displayName?.split(" ")[0] ?? "Student";

  const getHour = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const stats = [
    { label: "Academic Files", value: loading ? "..." : academicCount, icon: <FiBook className="w-5 h-5" />, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Open Jobs", value: "47", icon: <FiBriefcase className="w-5 h-5" />, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "New Notices", value: "3", icon: <FiBell className="w-5 h-5" />, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Library Titles", value: "4,200", icon: <FiBookOpen className="w-5 h-5" />, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar user={user} onToggleTheme={toggleTheme} theme={theme} />
      <div className="flex flex-1">
        <Sidebar user={user} />
        <main className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto w-full">

          {/* Welcome banner */}
          <div className="rounded-2xl bg-primary text-primary-content p-6 mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">{getHour()}, {firstName}! 👋</h1>
              <p className="opacity-75 mt-1 text-sm">Semester 2 · Week 11 · Here's what's happening today.</p>
            </div>
            <button
              onClick={() => navigate(ROUTES.ACADEMIC)}
              className="btn btn-sm bg-white text-primary border-none gap-2 hidden sm:flex"
            >
              <FiUpload className="w-4 h-4" /> Upload File
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="card bg-base-100 shadow-sm">
                <div className="card-body p-4 flex-row items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center ${s.color} shrink-0`}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-black">{s.value}</p>
                    <p className="text-xs text-base-content/50">{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Module cards */}
          <h2 className="text-lg font-bold mb-4">Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {modules.map((m) => (
              <div
                key={m.title}
                onClick={() => navigate(m.route)}
                className="card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
              >
                <div className="card-body gap-3 p-5">
                  <div className={`w-12 h-12 rounded-2xl ${m.bg} flex items-center justify-center ${m.color} text-xl`}>
                    {m.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors">{m.title}</h3>
                    <p className="text-sm text-base-content/50">{m.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs font-semibold ${m.color}`}>
                      {m.countKey === "academic" ? `${academicCount} files` : "Open →"}
                    </span>
                    <FiArrowRight className={`w-4 h-4 ${m.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Notices */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="card-title text-base">Recent Notices</h2>
                  <button onClick={() => navigate(ROUTES.ADMIN)} className="btn btn-ghost btn-xs text-primary">View all</button>
                </div>
                <div className="divide-y divide-base-200">
                  {notices.map((n, i) => (
                    <div key={i} className="flex items-start gap-3 py-3">
                      <span className={`badge ${n.tagClass} badge-sm mt-0.5 shrink-0`}>{n.tag}</span>
                      <div>
                        <p className="text-sm font-medium leading-snug">{n.text}</p>
                        <p className="text-xs text-base-content/40 mt-0.5 flex items-center gap-1">
                          <FiClock className="w-3 h-3" />{n.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent uploads from Firestore */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="card-title text-base">Recently Uploaded</h2>
                  <button onClick={() => navigate(ROUTES.ACADEMIC)} className="btn btn-ghost btn-xs text-primary">View all</button>
                </div>
                {loading ? (
                  <div className="flex justify-center py-6">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </div>
                ) : recentFiles.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-base-content/30 gap-2">
                    <FiBook className="w-10 h-10" />
                    <p className="text-sm">No files uploaded yet</p>
                    <button onClick={() => navigate(ROUTES.ACADEMIC)} className="btn btn-xs btn-primary mt-1">
                      Upload your first file
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-base-200">
                    {recentFiles.map((r) => (
                      <div key={r.id} className="flex items-center gap-3 py-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                          <FiBook className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden flex-1">
                          <p className="text-sm font-medium truncate">{r.title}</p>
                          <p className="text-xs text-base-content/40">{r.subject} · {r.fileSize}</p>
                        </div>
                        <a href={r.url} target="_blank" rel="noopener noreferrer"
                          className="btn btn-xs btn-ghost text-primary shrink-0">
                          Open
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;