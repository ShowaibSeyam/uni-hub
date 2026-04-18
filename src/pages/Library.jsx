import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ROUTES } from "../config/Routes";
import { FiArrowLeft, FiSearch, FiBook, FiExternalLink, FiBookOpen } from "react-icons/fi";

const books = [
  { title: "Introduction to Algorithms", author: "Cormen et al.", category: "CS", available: 3, total: 5, isbn: "978-0262033848" },
  { title: "Clean Code", author: "Robert C. Martin", category: "CS", available: 0, total: 3, isbn: "978-0132350884" },
  { title: "Database System Concepts", author: "Silberschatz", category: "CS", available: 2, total: 4, isbn: "978-0078022159" },
  { title: "Engineering Mathematics", author: "B.S. Grewal", category: "Math", available: 5, total: 8, isbn: "978-8174091955" },
  { title: "Operating System Concepts", author: "Silberschatz", category: "CS", available: 1, total: 3, isbn: "978-1118063330" },
  { title: "Computer Networks", author: "Andrew Tanenbaum", category: "CS", available: 0, total: 2, isbn: "978-0132126953" },
  { title: "Calculus", author: "James Stewart", category: "Math", available: 4, total: 6, isbn: "978-1285740621" },
  { title: "Physics for Scientists", author: "Serway & Jewett", category: "Science", available: 2, total: 4, isbn: "978-1133947271" },
];

const journals = [
  { name: "IEEE Xplore", desc: "Engineering & Computer Science research", url: "https://ieeexplore.ieee.org", color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Springer Link", desc: "Science, Technology & Medicine", url: "https://link.springer.com", color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Elsevier ScienceDirect", desc: "Scientific & technical research", url: "https://www.sciencedirect.com", color: "text-green-500", bg: "bg-green-50" },
  { name: "ACM Digital Library", desc: "Computing & Information Technology", url: "https://dl.acm.org", color: "text-red-500", bg: "bg-red-50" },
  { name: "JSTOR", desc: "Humanities, Social Sciences & more", url: "https://www.jstor.org", color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Google Scholar", desc: "Broad academic search engine", url: "https://scholar.google.com", color: "text-teal-500", bg: "bg-teal-50" },
];

function Library({ user }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("search");
  const [search, setSearch] = useState("");

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

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
              <h1 className="text-2xl font-black">Library Access</h1>
              <p className="text-sm text-base-content/50">Search books, check availability & access online journals</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="stat bg-base-100 rounded-2xl shadow-sm">
              <div className="stat-value text-2xl font-black">4,200</div>
              <div className="stat-desc">Total titles</div>
            </div>
            <div className="stat bg-base-100 rounded-2xl shadow-sm">
              <div className="stat-value text-2xl font-black text-success">
                {books.reduce((a, b) => a + b.available, 0)}
              </div>
              <div className="stat-desc">Available now</div>
            </div>
            <div className="stat bg-base-100 rounded-2xl shadow-sm">
              <div className="stat-value text-2xl font-black">{journals.length}</div>
              <div className="stat-desc">Journal databases</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs tabs-boxed mb-6 w-fit">
            <button onClick={() => setTab("search")} className={`tab gap-2 ${tab === "search" ? "tab-active" : ""}`}>
              <FiSearch className="w-4 h-4" /> Book Search
            </button>
            <button onClick={() => setTab("journals")} className={`tab gap-2 ${tab === "journals" ? "tab-active" : ""}`}>
              <FiBookOpen className="w-4 h-4" /> Online Journals
            </button>
          </div>

          {/* Book Search */}
          {tab === "search" && (
            <>
              <label className="input input-bordered flex items-center gap-2 mb-5">
                <FiSearch className="opacity-50" />
                <input
                  type="text"
                  placeholder="Search by title, author or category…"
                  className="grow"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <div className="card bg-base-100 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Availability</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((b, i) => (
                        <tr key={i}>
                          <td className="font-medium">{b.title}</td>
                          <td className="text-base-content/60 text-sm">{b.author}</td>
                          <td><span className="badge badge-ghost badge-sm">{b.category}</span></td>
                          <td>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-sm ${b.available > 0 ? "text-success" : "text-error"}`}>
                                {b.available}/{b.total}
                              </span>
                              <span className={`badge badge-xs ${b.available > 0 ? "badge-success" : "badge-error"}`}>
                                {b.available > 0 ? "Available" : "All issued"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <button className="btn btn-xs btn-primary btn-outline" disabled={b.available === 0}>
                              {b.available > 0 ? "Reserve" : "Waitlist"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Journals */}
          {tab === "journals" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {journals.map((j, i) => (
                <div key={i} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="card-body gap-3 p-5">
                    <div className={`w-12 h-12 rounded-2xl ${j.bg} flex items-center justify-center`}>
                      <FiBook className={`w-5 h-5 ${j.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{j.name}</h3>
                      <p className="text-xs text-base-content/50">{j.desc}</p>
                    </div>
                    <a href={j.url} target="_blank" rel="noopener noreferrer"
                      className="btn btn-xs btn-outline btn-primary gap-1 w-fit">
                      Access <FiExternalLink className="w-3 h-3" />
                    </a>
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

export default Library;