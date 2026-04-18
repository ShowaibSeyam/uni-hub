import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { ROUTES } from "../config/Routes";
import Navbar from "../components/Navbar";
import { FiSettings, FiLogOut } from "react-icons/fi";

const modules = [
  { 
    title: "Academic Materials", 
    desc: "Syllabi, notes, PYQs, e-books", 
    icon: "📘", color: "text-blue-500", bg: "bg-blue-50", count: "128 resources", 
    route: ROUTES.ACADEMIC
  },
  { title: "Administration", desc: "Registration, fees, calendar", icon: "🗂️", color: "text-amber-500", bg: "bg-amber-50", count: "Reg. closes Apr 24", route: ROUTES.ADMIN },
  { title: "Support Services", desc: "IT help, scholarships, mental health", icon: "🤝", color: "text-green-500", bg: "bg-green-50", count: "IT queue: 0 wait", route: ROUTES.SUPPORT },
  { title: "Library Access", desc: "Digital library, book search, journals", icon: "📚", color: "text-rose-500", bg: "bg-rose-50", count: "4,200 titles", route: ROUTES.LIBRARY },
  { title: "Alumni & Career", desc: "Network, jobs, internships", icon: "🎓", color: "text-purple-500", bg: "bg-purple-50", count: "47 active listings", route: ROUTES.CAREER },
];

const stats = [
  { label: "Saved Resources", value: "14", icon: "🔖" },
  { label: "Pending Deadlines", value: "3", icon: "⏰" },
  { label: "New Notices", value: "2", icon: "🔔" },
  { label: "Open Jobs", value: "47", icon: "💼" },
];

const notices = [
  { tag: "Urgent", tagClass: "badge-error", text: "Exam timetable for May 2025 published", time: "2 hours ago" },
  { tag: "Info", tagClass: "badge-info", text: "Scholarship portal open until April 30", time: "Yesterday" },
  { tag: "Event", tagClass: "badge-success", text: "Tech Fest 2025 — registrations open", time: "3 days ago" },
];

const recent = [
  { name: "DS Algo — Unit 4 Notes.pdf", meta: "Academic · 2.1 MB", iconBg: "bg-red-100", icon: "📄" },
  { name: "DBMS Lecture 18 — Transactions", meta: "Academic · Dr. Sharma", iconBg: "bg-blue-100", icon: "📊" },
  { name: "Internship Application Guide", meta: "Career · Placement cell", iconBg: "bg-green-100", icon: "📝" },
];

function Dashboard({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate(ROUTES.HOME);
  };

  const firstName = user?.displayName?.split(" ")[0] ?? "Student";
  const initial = user?.displayName?.[0] ?? "U";

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">

      <Navbar user={user} />

      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="w-64 bg-base-100 shadow-sm min-h-full hidden lg:flex flex-col py-6 px-3 gap-1">
          <p className="text-xs font-semibold text-base-content/40 px-3 mb-2 uppercase tracking-widest">Modules</p>
          {modules.map((m) => (
            <button key={m.title} className="btn btn-ghost justify-start gap-3 font-normal text-sm">
              <span>{m.icon}</span>
              {m.title}
            </button>
          ))}
          <div className="divider my-2"></div>
          <button className="btn btn-ghost justify-start gap-3 font-normal text-sm">
            <FiSettings className="w-4 h-4" /> Settings
          </button>
          <button onClick={handleLogout} className="btn btn-ghost justify-start gap-3 font-normal text-sm text-error">
            <FiLogOut className="w-4 h-4" /> Logout
          </button>

          {/* User card */}
          <div className="mt-auto mx-2">
            <div className="bg-base-200 rounded-2xl p-3 flex items-center gap-3">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full" referrerPolicy="no-referrer" />
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-9">
                    <span className="font-bold text-sm">{initial}</span>
                  </div>
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{user?.displayName}</p>
                <p className="text-xs text-base-content/50 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto w-full">

          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-black">Good morning, {firstName}! 👋</h1>
            <p className="text-base-content/50 mt-1">Semester 2 · Week 11 · Here's what's happening today.</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="stat bg-base-100 rounded-2xl shadow-sm p-4">
                <div className="stat-figure text-2xl">{s.icon}</div>
                <div className="stat-value text-2xl font-black">{s.value}</div>
                <div className="stat-desc text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Module cards */}
          <h2 className="text-lg font-bold mb-4">Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {modules.map((m) => (
              <div key={m.title} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="card-body gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${m.bg} flex items-center justify-center text-2xl`}>
                    {m.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base group-hover:text-primary transition-colors">{m.title}</h3>
                    <p className="text-sm text-base-content/50">{m.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs font-semibold ${m.color}`}>{m.count}</span>
                    
                    {/* 👇 Replace the old button with this new one 👇 */}
                    <button 
                      onClick={() => m.route && navigate(m.route)} 
                      className="btn btn-xs btn-primary btn-outline"
                    >
                      Open →
                    </button>

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
                <h2 className="card-title text-base">Recent Notices</h2>
                <div className="divide-y divide-base-200">
                  {notices.map((n, i) => (
                    <div key={i} className="flex items-start gap-3 py-3">
                      <span className={`badge ${n.tagClass} badge-sm mt-0.5 shrink-0`}>{n.tag}</span>
                      <div>
                        <p className="text-sm font-medium leading-snug">{n.text}</p>
                        <p className="text-xs text-base-content/40 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent files */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-base">Recently Accessed</h2>
                <div className="divide-y divide-base-200">
                  {recent.map((r, i) => (
                    <div key={i} className="flex items-center gap-3 py-3">
                      <div className={`w-9 h-9 rounded-xl ${r.iconBg} flex items-center justify-center text-base shrink-0`}>
                        {r.icon}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">{r.name}</p>
                        <p className="text-xs text-base-content/40">{r.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;