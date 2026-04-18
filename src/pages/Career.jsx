import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ROUTES } from "../config/Routes";
import {
  FiArrowLeft, FiBriefcase, FiUsers,
  FiFileText, FiExternalLink, FiMapPin, FiClock
} from "react-icons/fi";

const jobs = [
  { title: "Junior Software Engineer", company: "TechBD Ltd.", type: "Full-time", location: "Dhaka", deadline: "Apr 30", tag: "badge-primary" },
  { title: "Frontend Intern", company: "StartupXYZ", type: "Internship", location: "Remote", deadline: "May 5", tag: "badge-secondary" },
  { title: "Data Analyst", company: "Analytics Corp", type: "Full-time", location: "Chittagong", deadline: "May 10", tag: "badge-primary" },
  { title: "Network Engineer Intern", company: "Grameenphone", type: "Internship", location: "Dhaka", deadline: "May 15", tag: "badge-secondary" },
  { title: "UI/UX Designer", company: "CreativeHouse", type: "Part-time", location: "Remote", deadline: "May 20", tag: "badge-accent" },
  { title: "Machine Learning Engineer", company: "AI Ventures", type: "Full-time", location: "Dhaka", deadline: "Jun 1", tag: "badge-primary" },
];

const alumni = [
  { name: "Arif Hossain", batch: "CSE 2019", role: "SWE @ Google", photo: null },
  { name: "Tasnim Akter", batch: "EEE 2020", role: "Data Scientist @ Pathao", photo: null },
  { name: "Raihan Kabir", batch: "CSE 2018", role: "CTO @ LocalStartup", photo: null },
  { name: "Mitu Rahman", batch: "BBA 2021", role: "Product Manager @ bKash", photo: null },
  { name: "Shakil Ahmed", batch: "CSE 2017", role: "ML Engineer @ Samsung", photo: null },
  { name: "Nusrat Jahan", batch: "CSE 2020", role: "Frontend Dev @ Shajgoj", photo: null },
];

const resources = [
  { title: "Resume Writing Guide", desc: "Templates and tips for a strong CV", icon: "📄" },
  { title: "Interview Preparation", desc: "Common questions & how to answer them", icon: "🎤" },
  { title: "LinkedIn Profile Tips", desc: "Build a profile that gets noticed", icon: "💼" },
  { title: "Salary Negotiation", desc: "How to negotiate your first offer", icon: "💰" },
];

function Career({ user }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("jobs");
  const [filter, setFilter] = useState("All");

  const types = ["All", "Full-time", "Internship", "Part-time"];
  const filtered = jobs.filter((j) => filter === "All" || j.type === filter);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar user={user} />
      <div className="flex flex-1">
        <Sidebar user={user} />
        <main className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto w-full">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(ROUTES.DASHBOARD)} className="btn btn-ghost btn-sm btn-circle">
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black">Alumni & Career</h1>
              <p className="text-sm text-base-content/50">Jobs, internships, alumni network & career resources</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs tabs-boxed mb-6 w-fit">
            {[
              { key: "jobs", icon: <FiBriefcase className="w-4 h-4" />, label: "Jobs & Internships" },
              { key: "alumni", icon: <FiUsers className="w-4 h-4" />, label: "Alumni Network" },
              { key: "resources", icon: <FiFileText className="w-4 h-4" />, label: "Career Resources" },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`tab gap-2 ${tab === t.key ? "tab-active" : ""}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Jobs tab */}
          {tab === "jobs" && (
            <>
              <div className="flex gap-2 mb-5 flex-wrap">
                {types.map((t) => (
                  <button key={t} onClick={() => setFilter(t)}
                    className={`btn btn-sm ${filter === t ? "btn-primary" : "btn-outline"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((j, i) => (
                  <div key={i} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="card-body p-5 gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold">{j.title}</h3>
                          <p className="text-sm text-base-content/60">{j.company}</p>
                        </div>
                        <span className={`badge ${j.tag} badge-sm shrink-0`}>{j.type}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-base-content/50">
                        <span className="flex items-center gap-1"><FiMapPin className="w-3 h-3" />{j.location}</span>
                        <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />Deadline: {j.deadline}</span>
                      </div>
                      <div className="card-actions justify-end">
                        <button className="btn btn-xs btn-primary gap-1">
                          Apply <FiExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Alumni tab */}
          {tab === "alumni" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {alumni.map((a, i) => (
                <div key={i} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="card-body flex-row items-center gap-4 p-5">
                    <div className="avatar placeholder shrink-0">
                      <div className="bg-primary text-primary-content rounded-full w-12">
                        <span className="text-lg font-bold">{a.name[0]}</span>
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold text-sm truncate">{a.name}</p>
                      <p className="text-xs text-base-content/50">{a.batch}</p>
                      <p className="text-xs text-primary mt-0.5 truncate">{a.role}</p>
                    </div>
                    <button className="btn btn-xs btn-outline btn-primary shrink-0">Connect</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Resources tab */}
          {tab === "resources" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resources.map((r, i) => (
                <div key={i} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="card-body flex-row items-center gap-4 p-5">
                    <div className="text-4xl">{r.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold">{r.title}</h3>
                      <p className="text-sm text-base-content/50">{r.desc}</p>
                    </div>
                    <FiExternalLink className="text-base-content/30 w-5 h-5 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Career;