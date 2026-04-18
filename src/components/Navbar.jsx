import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { ROUTES } from "../config/Routes";
import { FiBell, FiSearch, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate(ROUTES.HOME);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-6 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex-1">
        <span className="text-2xl font-black text-primary tracking-tight">UniHub</span>
      </div>

      {/* Right: Search + Bell + Avatar */}
      <div className="flex items-center gap-3">

        {/* Search bar */}
        <label className="input input-bordered input-sm flex items-center gap-2 hidden md:flex">
          <FiSearch className="opacity-50" />
          <input type="text" placeholder="Search resources…" className="w-48" />
        </label>

        {/* Notification bell */}
        <div className="indicator">
          <span className="indicator-item badge badge-error badge-xs"></span>
          <button className="btn btn-ghost btn-sm btn-circle">
            <FiBell className="h-5 w-5" />
          </button>
        </div>

        {/* Avatar dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {user?.photoURL ? (
              /* Shows the real Google profile photo */
              <div className="w-9 rounded-full overflow-hidden">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              /* Fallback initial if no photo */
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-9">
                  <span className="font-bold">{user?.displayName?.[0] ?? "U"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown menu */}
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56">
            {/* User info header */}
            <li className="px-3 py-2 border-b border-base-200 mb-1">
              <div className="flex items-center gap-2 hover:bg-transparent cursor-default">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
                    {user?.displayName?.[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm leading-none">{user?.displayName}</p>
                  <p className="text-xs text-base-content/50 mt-0.5">{user?.email}</p>
                </div>
              </div>
            </li>

            <li>
              <a className="flex items-center gap-2">
                <FiUser className="w-4 h-4" /> Profile
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2">
                <FiSettings className="w-4 h-4" /> Settings
              </a>
            </li>
            <li>
              <a onClick={handleLogout} className="flex items-center gap-2 text-error">
                <FiLogOut className="w-4 h-4" /> Logout
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Navbar;