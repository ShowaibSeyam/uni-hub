import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Academic from "./pages/Academic";
import AdminPage from "./pages/AdminPage";
import Support from "./pages/Support";
import Library from "./pages/Library";
import Career from "./pages/Career";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROUTES } from "./config/Routes";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const protect = (Component) => (
    <ProtectedRoute user={user}>
      <Component user={user} />
    </ProtectedRoute>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME}      element={<Home user={user} />} />
        <Route path={ROUTES.DASHBOARD} element={protect(Dashboard)} />
        <Route path={ROUTES.ACADEMIC}  element={protect(Academic)} />
        <Route path={ROUTES.ADMIN}     element={protect(AdminPage)} />
        <Route path={ROUTES.SUPPORT}   element={protect(Support)} />
        <Route path={ROUTES.LIBRARY}   element={protect(Library)} />
        <Route path={ROUTES.CAREER}    element={protect(Career)} />
        <Route path="*"                element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;