import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { ROUTES } from "../config/routes";
import {
  FiHome, FiBook, FiClipboard, FiLifeBuoy,
  FiBookOpen, FiBriefcase, FiSettings, FiLogOut, FiMenu, FiX
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard",          icon: <FiHome />,      route: ROUTES.DASHBOARD },
  { label: "Academic Materials", icon: <FiBook />,      route: ROUTES.ACADEMIC },
  { label: "Administration",     icon: <FiClipboard />, route: ROUTES.ADMIN },
  { label: "Support Services",   icon: <FiLifeBuoy />,  route: ROUTES.SUPPORT },
  { label: "Library Access",     icon: <FiBookOpen />,  route: ROUTES.LIBRARY },
  { label: "Alumni & Career",    icon: <FiBriefcase />, route: ROUTES.CAREER },
];

function SidebarContent({ user, navigate, location, handleLogout, onClose }) {
  return (
    <div className="flex flex-col h-full py-6 px-3 gap-1">
      <div className="flex items-center justify-between px-3 mb-4 lg:hidden">
        <span className="text-lg font-black text-primary">UniHub</span>
        <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <p className="text-xs font-semibold text-base-content/40 px-3 mb-2 uppercase tracking-widest">Menu</p>

      {navItems.map((item) => {
        const isActive = location.pathname === item.route;
        return (
          <button
            key={item.route}
            onClick={() => { navigate(item.route); onClose?.(); }}
            className={`btn btn-ghost justify-start gap-3 font-normal text-sm ${isActive ? "btn-active text-primary font-semibold" : ""}`}
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
      <button onClick={handleLogout} className="btn btn-ghost justify-start gap-3 font-normal text-sm text-error">
        <FiLogOut className="w-4 h-4" /> Logout
      </button>

      <div className="mt-auto mx-2">
        <div className="bg-base-200 rounded-2xl p-3 flex items-center gap-3">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full shrink-0" referrerPolicy="no-referrer" />
          ) : (
            <div className="avatar placeholder shrink-0">
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
    </div>
  );
}

function Sidebar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate(ROUTES.HOME);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed bottom-6 left-4 z-40 btn btn-primary btn-circle shadow-lg"
      >
        <FiMenu className="w-5 h-5" />
      </button>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setDrawerOpen(false)}></div>
          <div className="relative w-72 bg-base-100 shadow-xl h-full overflow-y-auto">
            <SidebarContent
              user={user}
              navigate={navigate}
              location={location}
              handleLogout={handleLogout}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="w-64 bg-base-100 shadow-sm min-h-full hidden lg:flex flex-col">
        <SidebarContent
          user={user}
          navigate={navigate}
          location={location}
          handleLogout={handleLogout}
        />
      </aside>
    </>
  );
}

export default Sidebar;