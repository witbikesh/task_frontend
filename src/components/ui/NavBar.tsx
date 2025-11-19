import { Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getInitials } from "../../helpers/string";

const NavBar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { logout } = useAuthContext();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">TaskTracker</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors hover:cursor-pointer"
              >
                <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(user?.name)}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* Profile Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      Premium User
                    </span>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 pt-2">
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-medium hover:cursor-pointer"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
