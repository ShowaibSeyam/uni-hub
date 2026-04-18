import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, orderBy, serverTimestamp
} from "firebase/firestore";
import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject
} from "firebase/storage";
import { db, storage } from "../config/firebase";
import { ROUTES } from "../config/Routes";
import Navbar from "../components/Navbar";
import {
  FiUpload, FiDownload, FiTrash2, FiFile,
  FiFilter, FiArrowLeft, FiBookOpen,
  FiFileText, FiHelpCircle, FiBook, FiSearch
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const CATEGORIES = [
  { label: "All", value: "all", icon: <FiFile /> },
  { label: "Syllabus", value: "syllabus", icon: <FiBookOpen /> },
  { label: "Lecture Notes", value: "notes", icon: <FiFileText /> },
  { label: "PYQ Papers", value: "pyq", icon: <FiHelpCircle /> },
  { label: "E-Books", value: "ebook", icon: <FiBook /> },
];

function Academic({ user }) {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Upload form state
  const [form, setForm] = useState({ title: "", category: "notes", subject: "", file: null });

  // Fetch files from Firestore
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "academic"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setFiles(data);
      setFiltered(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  // Filter whenever category or search changes
  useEffect(() => {
    let result = files;
    if (category !== "all") result = result.filter((f) => f.category === category);
    if (search) result = result.filter((f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.subject.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [category, search, files]);

  // Upload handler
  const handleUpload = async () => {
    if (!form.file || !form.title || !form.subject) {
      alert("Please fill all fields and select a file.");
      return;
    }
    setUploading(true);
    const storageRef = ref(storage, `academic/${Date.now()}_${form.file.name}`);
    const task = uploadBytesResumable(storageRef, form.file);

    task.on("state_changed",
      (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      (err) => { console.error(err); setUploading(false); },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        await addDoc(collection(db, "academic"), {
          title: form.title,
          category: form.category,
          subject: form.subject,
          fileName: form.file.name,
          fileSize: (form.file.size / 1024 / 1024).toFixed(2) + " MB",
          fileType: form.file.name.split(".").pop().toUpperCase(),
          url,
          storagePath: task.snapshot.ref.fullPath,
          uploadedBy: user.displayName,
          uploadedByPhoto: user.photoURL,
          createdAt: serverTimestamp(),
        });
        setUploading(false);
        setProgress(0);
        setForm({ title: "", category: "notes", subject: "", file: null });
        setModalOpen(false);
        fetchFiles();
      }
    );
  };

  // Delete handler
  const handleDelete = async (item) => {
    if (!window.confirm("Delete this file?")) return;
    try {
      await deleteObject(ref(storage, item.storagePath));
      await deleteDoc(doc(db, "academic", item.id));
      fetchFiles();
    } catch (e) { console.error(e); }
  };

  const fileTypeColor = (type) => {
    const map = { PDF: "badge-error", PPT: "badge-warning", PPTX: "badge-warning", DOC: "badge-info", DOCX: "badge-info", ZIP: "badge-ghost" };
    return map[type] || "badge-neutral";
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(ROUTES.DASHBOARD)} className="btn btn-ghost btn-sm btn-circle">
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-black">Academic Materials</h1>
            <p className="text-sm text-base-content/50">Syllabi, lecture notes, PYQs, e-books & research papers</p>
          </div>
          <button onClick={() => setModalOpen(true)} className="btn btn-primary gap-2">
            <FiUpload className="w-4 h-4" /> Upload File
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <label className="input input-bordered flex items-center gap-2 flex-1">
            <FiSearch className="opacity-50" />
            <input
              type="text"
              placeholder="Search by title or subject…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="grow"
            />
          </label>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`btn btn-sm gap-1 ${category === c.value ? "btn-primary" : "btn-outline"}`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {CATEGORIES.slice(1).map((c) => (
            <div key={c.value} className="stat bg-base-100 rounded-xl shadow-sm py-3 px-5 flex-1 min-w-28">
              <div className="stat-value text-xl font-black">
                {files.filter((f) => f.category === c.value).length}
              </div>
              <div className="stat-desc text-xs">{c.label}</div>
            </div>
          ))}
        </div>

        {/* File grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-base-content/30">
            <FiFile className="w-16 h-16 mb-4" />
            <p className="text-lg font-semibold">No files found</p>
            <p className="text-sm">Upload the first file using the button above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="card-body gap-3 p-5">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`badge badge-sm ${fileTypeColor(item.fileType)}`}>{item.fileType}</span>
                      <span className="badge badge-sm badge-ghost">{CATEGORIES.find(c => c.value === item.category)?.label}</span>
                    </div>
                    <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-xs btn-circle text-error shrink-0">
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & subject */}
                  <div>
                    <h3 className="font-bold text-sm leading-snug">{item.title}</h3>
                    <p className="text-xs text-base-content/50 mt-0.5">{item.subject}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                      {item.uploadedByPhoto ? (
                        <img src={item.uploadedByPhoto} className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" alt="" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs">
                          {item.uploadedBy?.[0]}
                        </div>
                      )}
                      <span className="text-xs text-base-content/40">
                        {item.createdAt?.seconds
                          ? formatDistanceToNow(new Date(item.createdAt.seconds * 1000), { addSuffix: true })
                          : "just now"}
                      </span>
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-primary gap-1">
                      <FiDownload className="w-3 h-3" /> Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Upload Academic File</h3>

            <div className="flex flex-col gap-4">
              <label className="form-control">
                <div className="label"><span className="label-text">Title *</span></div>
                <input
                  type="text"
                  placeholder="e.g. Data Structures Unit 4 Notes"
                  className="input input-bordered"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </label>

              <label className="form-control">
                <div className="label"><span className="label-text">Subject *</span></div>
                <input
                  type="text"
                  placeholder="e.g. Data Structures & Algorithms"
                  className="input input-bordered"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </label>

              <label className="form-control">
                <div className="label"><span className="label-text">Category *</span></div>
                <select
                  className="select select-bordered"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="notes">Lecture Notes</option>
                  <option value="syllabus">Syllabus</option>
                  <option value="pyq">PYQ Paper</option>
                  <option value="ebook">E-Book</option>
                </select>
              </label>

              <label className="form-control">
                <div className="label"><span className="label-text">File *</span></div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                  onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
                />
                <div className="label"><span className="label-text-alt text-base-content/40">PDF, DOC, PPT, ZIP supported</span></div>
              </label>

              {/* Progress bar */}
              {uploading && (
                <div>
                  <p className="text-sm mb-1 text-base-content/60">Uploading… {progress}%</p>
                  <progress className="progress progress-primary w-full" value={progress} max="100"></progress>
                </div>
              )}
            </div>

            <div className="modal-action">
              <button onClick={() => setModalOpen(false)} className="btn btn-ghost" disabled={uploading}>
                Cancel
              </button>
              <button onClick={handleUpload} className="btn btn-primary gap-2" disabled={uploading}>
                {uploading ? <span className="loading loading-spinner loading-xs"></span> : <FiUpload className="w-4 h-4" />}
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !uploading && setModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
}

export default Academic;