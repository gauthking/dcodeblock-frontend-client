import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  Edit,
  LogOut,
  Plus,
  Settings,
  Trash2,
  Users,
} from "lucide-react";
import { UserInfo } from "../@types";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserMgmt: React.FC = () => {
  const [role, setRole] = useState<string>("admin");
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] =
    useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    setUserInfo(user);

    const handleStorageChange = () => {
      const token = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("user");

      if (!token || !user) {
        console.log("Session storage cleared, redirecting to login...");
        navigate("/");
      }
    };

    handleStorageChange();
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800">
            User Management
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white shadow-md">
              <Bell className="h-5 w-5" />
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-white rounded-md shadow-md px-3 py-2"
              >
                <span className="text-sm md:text-lg font-mono">
                  {userInfo?.userName}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <p className="px-4 py-2 text-sm text-gray-700 font-semibold">
                      My Account
                    </p>
                    <hr />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <hr />
                    <a
                      onClick={onLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {role === "admin" && (
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="inline-block mr-2 h-4 w-4" /> Add User
          </button>
        )}

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              {role === "admin" && (
                <th className="px-4 py-2 text-left">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2 text-sm md:text-[17px]">
                  {user.name}
                </td>
                <td className="px-4 py-2 text-sm md:text-[17px]">
                  {user.email}
                </td>
                <td className="px-4 py-2 text-sm md:text-[17px]">
                  {user.role}
                </td>
                {role === "admin" && (
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setIsEditUserModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
                      >
                        <Edit className="inline-block mr-1 h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => {}}
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                      >
                        <Trash2 className="inline-block mr-1 h-4 w-4" /> Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault(); /* Add user logic */
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditUserModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault(); /* Edit user logic */
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="edit-name"
                  name="name"
                  type="text"
                  defaultValue={editingUser.name}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="edit-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="edit-email"
                  name="email"
                  type="email"
                  defaultValue={editingUser.email}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="edit-role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role
                </label>
                <select
                  id="edit-role"
                  name="role"
                  defaultValue={editingUser.role}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMgmt;
