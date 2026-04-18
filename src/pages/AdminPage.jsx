import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ROUTES } from "../config/Routes";
import {
  FiArrowLeft, FiCalendar, FiDollarSign,
  FiBell, FiClipboard, FiChevronRight
} from "react-icons/fi";

const registrationSteps = [
  { step: "1", title: "Check eligibility", desc: "Confirm you have no outstanding dues or backlogs." },
  { step: "2", title: "Log in to ERP", desc: "Visit the university ERP portal and sign in." },
  { step: "3", title: "Select courses", desc: "Choose your courses for the upcoming semester." },
  { step: "4", title: "Pay fees", desc: "Complete tuition payment through the payment gateway." },
  { step: "5", title: "Confirmation", desc: "Download your registration confirmation slip." },
];

const feeStructure = [
  { label: "Tuition Fee", amount: "৳ 45,000", due: "Jul 15, 2025" },
  { label: "Library Fee", amount: "৳ 2,000", due: "Jul 15, 2025" },
  { label: "Lab Fee", amount: "৳ 5,000", due: "Aug 1, 2025" },
  { label: "Exam Fee", amount: "৳ 3,500", due: "Oct 1, 2025" },
];

const calendarEvents = [
  { date: "Apr 24", label: "Course registration deadline", type: "badge-error" },
  { date: "May 5", label: "Mid-semester exams begin", type: "badge-warning" },
  { date: "May 20", label: "Mid-semester exams end", type: "badge-warning" },
  { date: "Jun 1", label: "Summer recess begins", type: "badge-success" },
  { date: "Jul 15", label: "Fee payment deadline", type: "badge-error" },
  { date: "Aug 10", label: "New semester begins", type: "badge-info" },
];

const notices = [
  { tag: "Urgent", tagClass: "badge-error", title: "Exam timetable released", body: "May 2025 exam schedule is now live on the ERP portal.", time: "2 hrs ago" },
  { tag: "Fee", tagClass: "badge-warning", title: "Last date for fee payment", body: "Pay tuition fees before July 15 to avoid a late fine.", time: "Yesterday" },
  { tag: "General", tagClass: "badge-info", title: "Holiday notice", body: "University will remain closed on April 26 for a public holiday.", time: "3 days ago" },
  { tag: "Event", tagClass: "badge-success", title: "Annual Sports Day", body: "Sports day scheduled for May 10. Register at the sports office.", time: "4 days ago" },
];

function AdminPage({ user }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("notices");

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
              <h1 className="text-2xl font-black">Administration</h1>
              <p className="text-sm text-base-content/50">Course registration, fees, calendar & notices</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs tabs-boxed mb-6 w-fit">
            {[
              { key: "notices", icon: <FiBell className="w-4 h-4" />, label: "Notices" },
              { key: "registration", icon: <FiClipboard className="w-4 h-4" />, label: "Registration" },
              { key: "fees", icon: <FiDollarSign className="w-4 h-4" />, label: "Fees" },
              { key: "calendar", icon: <FiCalendar className="w-4 h-4" />, label: "Calendar" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`tab gap-2 ${tab === t.key ? "tab-active" : ""}`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Notices tab */}
          {tab === "notices" && (
            <div className="flex flex-col gap-4">
              {notices.map((n, i) => (
                <div key={i} className="card bg-base-100 shadow-sm">
                  <div className="card-body p-5 gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`badge badge-sm ${n.tagClass}`}>{n.tag}</span>
                      <span className="text-xs text-base-content/40">{n.time}</span>
                    </div>
                    <h3 className="font-bold">{n.title}</h3>
                    <p className="text-sm text-base-content/60">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Registration tab */}
          {tab === "registration" && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-4">Course Registration Steps</h2>
                <ul className="steps steps-vertical">
                  {registrationSteps.map((s) => (
                    <li key={s.step} className="step step-primary">
                      <div className="text-left ml-3">
                        <p className="font-semibold text-sm">{s.title}</p>
                        <p className="text-xs text-base-content/50">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="#" className="btn btn-primary gap-2">
                    Go to ERP Portal <FiChevronRight />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Fees tab */}
          {tab === "fees" && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-4">Fee Structure — 2024/25</h2>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Fee Type</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeStructure.map((f, i) => (
                        <tr key={i}>
                          <td className="font-medium">{f.label}</td>
                          <td className="font-bold text-primary">{f.amount}</td>
                          <td className="text-base-content/60">{f.due}</td>
                          <td><span className="badge badge-warning badge-sm">Pending</span></td>
                        </tr>
                      ))}
                      <tr className="font-black text-base">
                        <td>Total</td>
                        <td className="text-primary">৳ 55,500</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <button className="btn btn-success gap-2">
                    <FiDollarSign /> Pay Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Calendar tab */}
          {tab === "calendar" && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title mb-4">Academic Calendar 2025</h2>
                <ul className="timeline timeline-vertical">
                  {calendarEvents.map((e, i) => (
                    <li key={i}>
                      {i !== 0 && <hr />}
                      <div className="timeline-start text-sm font-bold text-base-content/60 w-16">{e.date}</div>
                      <div className="timeline-middle">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      </div>
                      <div className="timeline-end timeline-box text-sm">{e.label}</div>
                      {i !== calendarEvents.length - 1 && <hr />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default AdminPage;