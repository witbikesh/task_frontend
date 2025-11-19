import { useAuthContext } from "../../context/auth/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuthContext();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-semibold">Welcome {user?.email}</h1>
        <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
