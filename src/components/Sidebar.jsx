import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { ROUTES } from "../config/Routes";
import {
  FiHome, FiBook, FiClipboard, FiLifeBuoy,
  FiBookOpen, FiBriefcase, FiSettings, FiLogOut
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard",          icon: <FiHome />,      route: ROUTES.DASHBOARD },
  { label: "Academic Materials", icon: <FiBook />,      route: ROUTES.ACADEMIC },
  { label: "Administration",     icon: <FiClipboard />, route: ROUTES.ADMIN },
  { label: "Support Services",   icon: <FiLifeBuoy />,  route: ROUTES.SUPPORT },
  { label: "Library Access",     icon: <FiBookOpen />,  route: ROUTES.LIBRARY },
  { label: "Alumni & Career",    icon: <FiBriefcase />, route: ROUTES.CAREER },
];

function Sidebar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate(ROUTES.HOME);
  };

  return (
    <aside className="w-64 bg-base-100 shadow-sm min-h-full hidden lg:flex flex-col py-6 px-3 gap-1">
      <p className="text-xs font-semibold text-base-content/40 px-3 mb-2 uppercase tracking-widest">
        Menu
      </p>

      {navItems.map((item) => {
        const isActive = location.pathname === item.route;
        return (
          <button
            key={item.route}
            onClick={() => navigate(item.route)}
            className={`btn btn-ghost justify-start gap-3 font-normal text-sm ${
              isActive ? "btn-active text-primary font-semibold" : ""
            }`}
          >
            <span className={isActive ? "text-primary" : ""}>{item.icon}</span>
            {item.label}
          </button>
        );
      })}

      <div className="divider my-2"></div>

      <button className="btn btn-ghost justify-start gap-3 font-normal text-sm">
        <FiSettings className="w-4 h-4" /> Settings
      </button>
      <button
        onClick={handleLogout}
        className="btn btn-ghost justify-start gap-3 font-normal text-sm text-error"
      >
        <FiLogOut className="w-4 h-4" /> Logout
      </button>

      {/* User card at bottom */}
      <div className="mt-auto mx-2">
        <div className="bg-base-200 rounded-2xl p-3 flex items-center gap-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt=""
              className="w-9 h-9 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-9">
                <span className="font-bold text-sm">{user?.displayName?.[0]}</span>
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
  );
}

export default Sidebar;