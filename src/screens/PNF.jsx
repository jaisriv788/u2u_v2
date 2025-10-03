import { useNavigate } from "react-router";

function PNF() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">Oops! Page not found.</p>
      <p className="mt-2 text-sm text-gray-500">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 cursor-pointer inline-block px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}

export default PNF;
