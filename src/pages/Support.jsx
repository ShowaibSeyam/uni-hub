import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ROUTES } from "../config/Routes";
import {
  FiArrowLeft, FiMonitor, FiAward,
  FiHeart, FiUsers, FiMail, FiPhone, FiExternalLink
} from "react-icons/fi";

const itFaqs = [
  { q: "Can't connect to university WiFi?", a: "Try forgetting the network and reconnecting with your student ID credentials. Contact IT if it persists." },
  { q: "Forgot ERP password?", a: "Click 'Forgot Password' on the ERP login page. A reset link will be sent to your university email." },
  { q: "Software installation issues?", a: "Submit a ticket below. Our team responds within 24 hours on working days." },
];

const scholarships = [
  { name: "Merit Scholarship", amount: "৳ 20,000/yr", deadline: "Apr 30, 2025", eligibility: "CGPA ≥ 3.75", status: "Open" },
  { name: "Need-Based Grant", amount: "৳ 15,000/yr", deadline: "May 15, 2025", eligibility: "Family income < ৳ 3L", status: "Open" },
  { name: "Sports Excellence", amount: "৳ 10,000/yr", deadline: "Jun 1, 2025", eligibility: "National level athlete", status: "Open" },
  { name: "Research Fellowship", amount: "৳ 25,000/yr", deadline: "Mar 31, 2025", eligibility: "Final year students", status: "Closed" },
];

const clubs = [
  { name: "Coding Club", category: "Technical", members: 120, icon: "💻" },
  { name: "Photography Society", category: "Arts", members: 85, icon: "📷" },
  { name: "Debate Team", category: "Literary", members: 60, icon: "🎙️" },
  { name: "Robotics Club", category: "Technical", members: 95, icon: "🤖" },
  { name: "Music Club", category: "Arts", members: 70, icon: "🎵" },
  { name: "Environmental Society", category: "Social", members: 50, icon: "🌱" },
];

const mentalHealthResources = [
  { title: "Free Counselling Sessions", desc: "Book a confidential 1-on-1 session with a licensed counsellor.", icon: "🧠", cta: "Book Session" },
  { title: "Peer Support Groups", desc: "Weekly group sessions every Thursday 5–6 PM in Room C-204.", icon: "🤝", cta: "Join Group" },
  { title: "Mindfulness & Meditation", desc: "Guided sessions every Monday morning. No experience needed.", icon: "🧘", cta: "Learn More" },
  { title: "24/7 Crisis Helpline", desc: "Call 16789 anytime — free, confidential, and always available.", icon: "📞", cta: "Call Now" },
];

function Support({ user }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar user={user} />
        <main className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto w-full">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => navigate(ROUTES.DASHBOARD)} className="btn btn-ghost btn-sm btn-circle">
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black">Support Services</h1>
              <p className="text-sm text-base-content/50">IT help, scholarships, mental health & clubs</p>
            </div>
          </div>

          {/* IT Support */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiMonitor className="text-primary w-5 h-5" />
              <h2 className="text-lg font-bold">IT Support</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <h3 className="font-bold mb-3">Common Issues</h3>
                  <div className="join join-vertical w-full">
                    {itFaqs.map((f, i) => (
                      <div key={i} className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="it-faq" defaultChecked={i === 0} />
                        <div className="collapse-title text-sm font-medium">{f.q}</div>
                        <div className="collapse-content text-sm text-base-content/60">{f.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                  <h3 className="font-bold">Contact IT Helpdesk</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <FiMail className="text-primary" />
                    <span>it.support@unihub.edu.bd</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FiPhone className="text-primary" />
                    <span>+880 1234-567890 (9am – 5pm)</span>
                  </div>
                  <div className="divider my-0"></div>
                  <h3 className="font-bold">Submit a Ticket</h3>
                  <input type="text" placeholder="Describe your issue…" className="input input-bordered input-sm w-full" />
                  <button className="btn btn-primary btn-sm">Submit Ticket</button>
                </div>
              </div>
            </div>
          </section>

          {/* Scholarships */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiAward className="text-amber-500 w-5 h-5" />
              <h2 className="text-lg font-bold">Scholarships</h2>
            </div>
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-0">
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr><th>Scholarship</th><th>Amount</th><th>Deadline</th><th>Eligibility</th><th>Status</th><th></th></tr>
                    </thead>
                    <tbody>
                      {scholarships.map((s, i) => (
                        <tr key={i}>
                          <td className="font-medium">{s.name}</td>
                          <td className="font-bold text-amber-600">{s.amount}</td>
                          <td className="text-base-content/60 text-sm">{s.deadline}</td>
                          <td className="text-sm">{s.eligibility}</td>
                          <td>
                            <span className={`badge badge-sm ${s.status === "Open" ? "badge-success" : "badge-ghost"}`}>
                              {s.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-xs btn-outline btn-primary" disabled={s.status === "Closed"}>
                              Apply
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Mental Health */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiHeart className="text-rose-500 w-5 h-5" />
              <h2 className="text-lg font-bold">Mental Health Support</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {mentalHealthResources.map((r, i) => (
                <div key={i} className="card bg-base-100 shadow-sm">
                  <div className="card-body gap-3 p-5">
                    <div className="text-3xl">{r.icon}</div>
                    <h3 className="font-bold text-sm">{r.title}</h3>
                    <p className="text-xs text-base-content/50 flex-1">{r.desc}</p>
                    <button className="btn btn-xs btn-outline btn-rose-500 mt-1">{r.cta}</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Clubs */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FiUsers className="text-purple-500 w-5 h-5" />
              <h2 className="text-lg font-bold">Clubs & Extracurriculars</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {clubs.map((c, i) => (
                <div key={i} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="card-body flex-row items-center gap-4 p-4">
                    <div className="text-3xl">{c.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">{c.name}</h3>
                      <p className="text-xs text-base-content/50">{c.category} · {c.members} members</p>
                    </div>
                    <button className="btn btn-xs btn-outline btn-primary">Join</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default Support;