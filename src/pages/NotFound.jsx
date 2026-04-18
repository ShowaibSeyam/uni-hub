import { Link } from "react-router-dom";
import { ROUTES } from "../config/Routes";

function NotFound() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-6xl font-bold text-error">404</h1>
          <p className="py-4 text-lg">Oops — page not found.</p>
          <Link to={ROUTES.HOME} className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;