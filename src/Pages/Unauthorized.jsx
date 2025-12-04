import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react"; // Optional icon library (npm i lucide-react)

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4 animate-fadeIn">
      <div className="border border-green-600 rounded-2xl shadow-md p-10 max-w-md w-full text-center">
        <ShieldAlert className="mx-auto text-green-600 mb-4" size={90} />
        <h1 className="text-3xl font-semibold mb-2">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          You don’t have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 border border-green-600 text-black rounded-md hover:bg-green-500 hover:text-white cursor-pointer transition-all"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
